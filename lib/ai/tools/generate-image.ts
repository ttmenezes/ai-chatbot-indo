import { tool } from "ai";
import { z } from "zod";

export type ImageGenerationSuccess = {
  success: true;
  image: {
    uint8Array: Uint8Array;
    base64: string;
  };
  prompt: string;
  aspectRatio?: string;
};

export type ImageGenerationError = {
  success: false;
  error: string;
};

export type ImageGenerationOutput =
  | ImageGenerationSuccess
  | ImageGenerationError;

// Replicate API endpoint for predictions
const REPLICATE_API_URL = "https://api.replicate.com/v1/predictions";

async function callReplicateAPI(
  prompt: string,
  aspectRatio: string
): Promise<ImageGenerationOutput> {
  const apiToken = process.env.REPLICATE_API_TOKEN;

  if (!apiToken) {
    return {
      success: false,
      error: "REPLICATE_API_TOKEN environment variable is not set",
    };
  }

  try {
    // Map aspect ratio to dimensions
    const aspectRatioMap: Record<string, { width: number; height: number }> = {
      "1:1": { width: 1024, height: 1024 },
      "16:9": { width: 1024, height: 576 },
      "9:16": { width: 576, height: 1024 },
      "4:3": { width: 1024, height: 768 },
      "3:4": { width: 768, height: 1024 },
    };

    const dimensions = aspectRatioMap[aspectRatio] || aspectRatioMap["1:1"];

    // Start prediction
    const startResponse = await fetch(REPLICATE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Token ${apiToken}`,
        "Content-Type": "application/json",
        Prefer: "wait", // Wait for the prediction to complete
      },
      body: JSON.stringify({
        version: "prunaai/flux-fast", // Using the model you specified
        input: {
          prompt,
          width: dimensions.width,
          height: dimensions.height,
          output_format: "webp",
          output_quality: 90,
        },
      }),
    });

    if (!startResponse.ok) {
      const errorText = await startResponse.text();
      return {
        success: false,
        error: `Replicate API error: ${startResponse.status} ${startResponse.statusText} - ${errorText}`,
      };
    }

    const prediction = await startResponse.json();

    // If the prediction succeeded
    if (prediction.output) {
      // The output is typically a base64 data URL
      let base64: string;

      if (typeof prediction.output === "string") {
        // If it's already a data URL
        if (prediction.output.startsWith("data:")) {
          base64 = prediction.output.split(",")[1];
        } else {
          // It's a URL
          const imageResponse = await fetch(prediction.output);
          const imageBuffer = await imageResponse.arrayBuffer();
          base64 = Buffer.from(imageBuffer).toString("base64");
        }
      } else {
        return {
          success: false,
          error: "Unexpected response format from Replicate API",
        };
      }

      return {
        success: true,
        image: {
          uint8Array: new Uint8Array(Buffer.from(base64, "base64")),
          base64,
        },
        prompt,
        aspectRatio,
      };
    }

    return {
      success: false,
      error:
        prediction.status === "failed"
          ? `Prediction failed: ${prediction.error}`
          : "Failed to get image output from Replicate",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? `Failed to generate image: ${error.message}`
          : "Failed to generate image. Please try again.",
    };
  }
}

export const generateImageTool = tool({
  description:
    "Generate images using FLUX Fast AI. Use this when the user asks to create, draw, paint, or generate an image, photo, or picture. The prompt should be in English for best results. The model is fast and produces high-quality images.",
  parameters: z.object({
    prompt: z
      .string()
      .describe(
        "The image description in English. Be descriptive and specific for better results."
      ),
    aspectRatio: z
      .enum(["1:1", "16:9", "9:16", "4:3", "3:4"])
      .optional()
      .describe("The aspect ratio of the image. Default is 1:1 (square)."),
    style: z
      .string()
      .optional()
      .describe(
        "Optional style modifier (e.g., 'realistic', 'artistic', 'anime', 'cartoon', 'photorealistic')"
      ),
  }),
  execute: async ({
    prompt,
    aspectRatio = "1:1",
    style,
  }: {
    prompt: string;
    aspectRatio?: string;
    style?: string;
  }) => {
    // Build the full prompt with style if provided
    const fullPrompt = style ? `${style} style: ${prompt}` : prompt;

    // Call Replicate API directly
    return await callReplicateAPI(fullPrompt, aspectRatio);
  },
} as any);
