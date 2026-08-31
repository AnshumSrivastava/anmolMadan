"use server";

import { revalidatePath } from "next/cache";
import { updateNote } from "@/services/note/note.service";
import { Note } from "@/types/note";

export async function updateNoteAction(data: Partial<Note>) {
  try {
    await updateNote(data);

    revalidatePath("/dashboard/note");
    revalidatePath("/");

    return {
      success: true,
      message: "Note section updated successfully.",
    };
  } catch (error: any) {
    console.error("Failed to update Note:", error);
    return {
      success: false,
      message: error?.message || "Failed to update Note section.",
    };
  }
}
