"use server";

import { revalidatePath } from "next/cache";
import {
  insertComment,
  updateCommentStatus,
  deleteComment,
  getApprovedComments,
} from "@/services/projectComments/projectComments.service";
import { sanitizeName, sanitizeComment } from "@/utils/sanitize";

export type SubmitCommentResult = {
  success: boolean;
  message: string;
};

export async function submitProjectCommentAction(
  formData: FormData
): Promise<SubmitCommentResult> {
  try {
    const rawProjectId = String(formData.get("project_id") ?? "");
    const rawAuthorName = String(formData.get("author_name") ?? "");
    const rawComment = String(formData.get("comment") ?? "");
    const honeypot = String(formData.get("website_url") ?? "");

    // 1. Honeypot check (bot trap)
    if (honeypot.trim().length > 0) {
      return {
        success: true,
        message: "Thank you for your comment! It has been submitted for review.",
      };
    }

    // 2. Strict sanitization
    const projectId = rawProjectId.trim();
    const authorName = sanitizeName(rawAuthorName);
    const comment = sanitizeComment(rawComment);

    if (!projectId) {
      return { success: false, message: "Invalid session or project ID." };
    }

    if (!authorName || authorName.length < 2) {
      return { success: false, message: "Please enter a valid name (at least 2 characters)." };
    }

    if (!comment || comment.length < 5) {
      return { success: false, message: "Please enter a meaningful comment (at least 5 characters)." };
    }

    // 3. Insert with pending status
    await insertComment({
      projectId,
      authorName,
      comment,
    });

    revalidatePath("/dashboard/projects");
    revalidatePath("/");

    return {
      success: true,
      message: "Thank you! Your comment has been submitted and is pending moderation approval.",
    };
  } catch (error) {
    console.error("Error submitting project comment:", error);
    return {
      success: false,
      message: "An unexpected error occurred while submitting your comment. Please try again.",
    };
  }
}

export async function fetchApprovedCommentsAction(projectId: string) {
  try {
    return await getApprovedComments(projectId);
  } catch (error) {
    console.error("Error fetching approved comments:", error);
    return [];
  }
}

export async function approveCommentAction(commentId: string) {
  try {
    await updateCommentStatus(commentId, "approved");
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function rejectCommentAction(commentId: string) {
  try {
    await updateCommentStatus(commentId, "rejected");
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function deleteCommentAction(commentId: string) {
  try {
    await deleteComment(commentId);
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false };
  }
}
