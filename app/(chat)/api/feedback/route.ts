import { NextResponse } from "next/server";
import { saveFeedback } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, feedbackText } = body as {
      email?: string;
      feedbackText: string;
    };

    if (!feedbackText || typeof feedbackText !== "string") {
      return NextResponse.json(
        { error: "feedbackText is required" },
        { status: 400 }
      );
    }

    await saveFeedback({
      email: email || undefined,
      feedbackText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}
