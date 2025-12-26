import { extractTool, searchTool } from "@parallel-web/ai-sdk-tools";
import type { UIMessage } from "ai";
import { generateObject, generateText, streamText } from "ai";
import { z } from "zod";
import { myProvider } from "@/lib/ai/providers";
import { ChatSDKError } from "@/lib/errors";

export const maxDuration = 120; // Extended for multi-step research

const MAX_ITERATIONS = 5;
const QUERIES_PER_ITERATION = 4;

// Schema for orchestrator's query plan
const QueryPlanSchema = z.object({
  reasoning: z
    .string()
    .describe("Brief reasoning about what information is needed"),
  expectedInformation: z
    .array(z.string())
    .describe("What specific information do we expect to find?"),
  queries: z
    .array(
      z.object({
        query: z.string().describe("The search query"),
        purpose: z.string().describe("Why this query is needed"),
      })
    )
    .max(QUERIES_PER_ITERATION)
    .describe("Search queries to execute"),
  isComplete: z
    .boolean()
    .describe(
      "Do we have enough information to provide a comprehensive answer?"
    ),
  completionRationale: z
    .string()
    .optional()
    .describe("If complete, why. If not, what gaps remain."),
});

// Schema for sub-agent aggregation
const AggregatedResultSchema = z.object({
  keyFindings: z.array(
    z.object({
      fact: z.string().describe("A key fact or finding"),
      source: z.string().describe("The source URL or description"),
      relevanceScore: z
        .number()
        .min(1)
        .max(10)
        .describe("How relevant is this to the query (1-10)"),
    })
  ),
  summary: z.string().describe("A brief summary of what was found"),
  gaps: z
    .array(z.string())
    .describe("What information is still missing or unclear?"),
});

type QueryPlan = z.infer<typeof QueryPlanSchema>;
type AggregatedResult = z.infer<typeof AggregatedResultSchema>;

// Extract user's query from messages
function extractUserQuery(messages: UIMessage[]): string {
  const lastUserMessage = messages.filter((m) => m.role === "user").at(-1);
  if (!lastUserMessage) {
    return "";
  }

  const textParts = lastUserMessage.parts?.filter(
    (part): part is { type: "text"; text: string } => part.type === "text"
  );

  return textParts?.map((p) => p.text).join(" ") ?? "";
}

// Build orchestrator system prompt
function buildOrchestratorPrompt(
  userQuery: string,
  aggregatedKnowledge: AggregatedResult[],
  iteration: number
): string {
  const knowledgeSummary =
    aggregatedKnowledge.length > 0
      ? aggregatedKnowledge
          .map(
            (k, i) =>
              `\n--- Iteration ${i + 1} Findings ---\n${k.summary}\nKey facts: ${k.keyFindings.map((f) => f.fact).join("; ")}\nRemaining gaps: ${k.gaps.join(", ")}`
          )
          .join("\n")
      : "No previous knowledge gathered yet.";

  return `You are a Deep Research Orchestrator. Your goal is to plan comprehensive research to answer the user's question.

USER'S QUESTION: "${userQuery}"

CURRENT ITERATION: ${iteration + 1} of ${MAX_ITERATIONS}

KNOWLEDGE GATHERED SO FAR:
${knowledgeSummary}

INSTRUCTIONS:
1. Analyze what information is needed to comprehensively answer the question
2. Consider multiple perspectives and sources
3. Generate ${QUERIES_PER_ITERATION} diverse search queries that will fill knowledge gaps
4. REFLECTION: Before marking as complete, ask yourself:
   - Do I have information from multiple authoritative sources?
   - Have I covered different aspects of the topic?
   - Are there any contradicting viewpoints I should investigate?
   - Would the user find this answer comprehensive?

If this is iteration ${MAX_ITERATIONS}, you MUST set isComplete to true and work with available information.

Generate a query plan to continue or complete the research.`;
}

// Build sub-agent aggregation prompt
function buildAggregationPrompt(
  userQuery: string,
  searchResults: string[]
): string {
  return `You are a Research Aggregator. Your job is to extract and organize key findings from search results.

ORIGINAL QUESTION: "${userQuery}"

SEARCH RESULTS:
${searchResults.map((r, i) => `\n--- Result ${i + 1} ---\n${r}`).join("\n")}

INSTRUCTIONS:
1. Extract the most relevant facts that help answer the question
2. Note the source for each fact
3. Rate relevance from 1-10
4. Identify what information is still missing
5. Provide a brief summary

Be thorough but concise. Focus on facts, not opinions (unless opinions are what's being asked about).`;
}

// Execute parallel searches using Parallel tools
async function executeParallelSearch(
  queries: QueryPlan["queries"]
): Promise<string[]> {
  const results = await Promise.all(
    queries.map(async ({ query, purpose }) => {
      try {
        console.log(`[Research] Searching: "${query}" (${purpose})`);

        const { text, steps } = await generateText({
          model: myProvider.languageModel("chat-model"), // Gemini Lite for tool execution
          system:
            "You are a research assistant. Search the web and extract relevant information for the query. Be thorough and cite sources.",
          prompt: `Search the web for: ${query}\n\nObjective: ${purpose}`,
          tools: {
            webSearch: searchTool,
            webExtract: extractTool,
          },
        });

        // Extract results from tool outputs
        const toolOutputs: string[] = [];

        for (const step of steps) {
          if (step.toolCalls && step.toolResults) {
            for (const toolCall of step.toolCalls) {
              const toolResult = step.toolResults.find(
                (tr) => tr.toolCallId === toolCall.toolCallId
              );

              if (toolResult && "output" in toolResult) {
                // Access the tool output - Parallel tools return { searchParams, answer }
                const toolOutput = toolResult.output as {
                  answer?: {
                    results?: Array<{
                      content?: Array<{ text?: string }>;
                      source?: { url?: string; title?: string };
                    }>;
                  };
                };

                const answer = toolOutput?.answer;

                if (answer?.results && answer.results.length > 0) {
                  console.log(
                    `[Research] Found ${answer.results.length} results from ${toolCall.toolName}`
                  );

                  for (const searchResult of answer.results) {
                    const contentText =
                      searchResult.content
                        ?.map((chunk) => chunk.text ?? "")
                        .join("\n")
                        .trim() ?? "";

                    const sourceUrl = searchResult.source?.url ?? "";
                    const sourceTitle = searchResult.source?.title ?? "";
                    const source = sourceUrl || sourceTitle || "Unknown source";

                    if (contentText) {
                      toolOutputs.push(`[${source}]\n${contentText}`);
                    } else {
                      console.log(
                        `[Research] Empty content for result from ${source}`
                      );
                    }
                  }
                } else {
                  console.log(
                    `[Research] No results found in tool output for ${toolCall.toolName}`
                  );
                }
              } else {
                console.log(
                  `[Research] Tool result missing output for ${toolCall.toolName}`
                );
              }
            }
          }
        }

        const combinedResults =
          toolOutputs.length > 0
            ? toolOutputs.join("\n\n---\n\n")
            : text || `No results found for: ${query}`;

        console.log(`[Research] Completed search for: "${query}"`, {
          steps: steps.length,
          toolResultsCount: toolOutputs.length,
          textLength: combinedResults.length,
        });

        return combinedResults;
      } catch (error) {
        console.error(`[Research] Search failed for "${query}":`, error);
        return `Search failed for: ${query}`;
      }
    })
  );

  return results;
}

// Aggregate results using sub-agent
async function aggregateResults(
  searchResults: string[],
  userQuery: string
): Promise<AggregatedResult> {
  try {
    const { object } = await generateObject({
      model: myProvider.languageModel("chat-model"), // Gemini Lite
      schema: AggregatedResultSchema,
      prompt: buildAggregationPrompt(userQuery, searchResults),
    });

    console.log("[Research] Aggregated findings:", {
      keyFindingsCount: object.keyFindings.length,
      gapsCount: object.gaps.length,
    });

    return object;
  } catch (error) {
    console.error("[Research] Aggregation failed:", error);
    return {
      keyFindings: [],
      summary: "Failed to aggregate results",
      gaps: ["Aggregation error occurred"],
    };
  }
}

// Generate query plan from orchestrator
async function generateQueryPlan(
  userQuery: string,
  aggregatedKnowledge: AggregatedResult[],
  iteration: number
): Promise<QueryPlan> {
  const { object } = await generateObject({
    model: myProvider.languageModel("chat-model-reasoning"), // Reasoning model
    schema: QueryPlanSchema,
    system: buildOrchestratorPrompt(userQuery, aggregatedKnowledge, iteration),
    prompt: `Generate a research plan for iteration ${iteration + 1}.`,
  });

  console.log("[Research] Query plan generated:", {
    iteration: iteration + 1,
    queriesCount: object.queries.length,
    isComplete: object.isComplete,
    reasoning: object.reasoning,
  });

  return object;
}

// Build final synthesis prompt
function buildSynthesisPrompt(
  userQuery: string,
  aggregatedKnowledge: AggregatedResult[],
  languagePreference?: string
): string {
  const allFindings = aggregatedKnowledge.flatMap((k) => k.keyFindings);
  const allSummaries = aggregatedKnowledge.map((k) => k.summary);

  const languageInstruction =
    languagePreference && languagePreference !== "auto"
      ? `\n\nIMPORTANT: Respond in ${languagePreference} language.`
      : "";

  return `You are a research report writer. Based on the gathered research, write a comprehensive answer to the user's question.

USER'S QUESTION: "${userQuery}"

RESEARCH SUMMARIES:
${allSummaries.map((s, i) => `${i + 1}. ${s}`).join("\n")}

KEY FINDINGS:
${allFindings
  .sort((a, b) => b.relevanceScore - a.relevanceScore)
  .map(
    (f) =>
      `- ${f.fact} (Source: ${f.source}, Relevance: ${f.relevanceScore}/10)`
  )
  .join("\n")}

INSTRUCTIONS:
1. Write a comprehensive, well-structured response
2. Cite sources where appropriate using markdown links
3. If there are conflicting findings, present both perspectives
4. Be thorough but accessible
5. Use headers and bullet points for readability
6. End with a brief conclusion or summary${languageInstruction}`;
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const {
      messages,
      languagePreference,
    }: {
      messages: UIMessage[];
      languagePreference?: string;
    } = json;

    if (!messages || !Array.isArray(messages)) {
      return new ChatSDKError("bad_request:api").toResponse();
    }

    const userQuery = extractUserQuery(messages);

    if (!userQuery) {
      return new ChatSDKError("bad_request:api").toResponse();
    }

    console.log("[Research] Starting deep research for:", userQuery);

    const aggregatedKnowledge: AggregatedResult[] = [];
    const allSources: Array<{ url: string; title: string }> = [];

    // Main research loop
    for (let iteration = 0; iteration < MAX_ITERATIONS; iteration++) {
      console.log(
        `[Research] === Iteration ${iteration + 1}/${MAX_ITERATIONS} ===`
      );

      // 1. ORCHESTRATOR: Plan queries with reasoning
      const queryPlan = await generateQueryPlan(
        userQuery,
        aggregatedKnowledge,
        iteration
      );

      // Check if we have enough information
      if (queryPlan.isComplete && iteration > 0) {
        console.log(
          "[Research] Orchestrator determined research is complete:",
          queryPlan.completionRationale
        );
        break;
      }

      // 2. PARALLEL SEARCH: Execute queries concurrently
      if (queryPlan.queries.length > 0) {
        const searchResults = await executeParallelSearch(queryPlan.queries);

        // 3. SUB-AGENT: Aggregate results
        const aggregated = await aggregateResults(searchResults, userQuery);
        aggregatedKnowledge.push(aggregated);

        // Extract sources (simplified - in production, parse from tool results)
        for (const finding of aggregated.keyFindings) {
          if (finding.source.startsWith("http")) {
            allSources.push({
              url: finding.source,
              title: finding.fact.slice(0, 50),
            });
          }
        }
      }

      // Force completion on last iteration
      if (iteration === MAX_ITERATIONS - 1) {
        console.log(
          "[Research] Reached max iterations, synthesizing with available info"
        );
        break;
      }
    }

    // 4. FINAL SYNTHESIS: Stream comprehensive report
    console.log("[Research] Synthesizing final report...");

    const result = streamText({
      model: myProvider.languageModel("chat-model-flash"), // Use Flash for quality synthesis
      system: buildSynthesisPrompt(
        userQuery,
        aggregatedKnowledge,
        languagePreference
      ),
      prompt: "Write the comprehensive research report now.",
      experimental_telemetry: {
        isEnabled: true,
        functionId: "deep-research",
      },
    });

    return result.toUIMessageStreamResponse({
      sendReasoning: true,
      sendSources: true,
    });
  } catch (error) {
    console.error("[Research] Unhandled error:", error);

    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }

    return new ChatSDKError("offline:chat").toResponse();
  }
}
