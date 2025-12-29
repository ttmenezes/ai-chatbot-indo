import { NextResponse } from "next/server";
import { deleteChatLogById } from "@/lib/supabase";

/**
 * DELETE /api/data/delete
 * Deletes chat logs for a guest user session
 * Used for Indonesia PDP Law compliance - "Right to be Forgotten"
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("chatId");

    if (!chatId) {
      return NextResponse.json(
        { error: "chatId is required" },
        { status: 400 }
      );
    }

    // Delete chat log from Supabase logs table
    await deleteChatLogById(chatId);

    return NextResponse.json({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete chat log:", error);
    return NextResponse.json(
      { error: "Failed to delete data" },
      { status: 500 }
    );
  }
}
