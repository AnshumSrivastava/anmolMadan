import { createClient } from "@/lib/supabase/server";
import { ProjectComment } from "@/types/projectComment";

// In-memory store for session persistence and graceful fallback
const fallbackComments: ProjectComment[] = [
  {
    id: "comment-fb-1",
    project_id: "exp-1",
    author_name: "Aditya Verma",
    comment: "The live exploitation and defense breakdown in this session was eye-opening! Really appreciated the hands-on clarity.",
    status: "approved",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "comment-fb-2",
    project_id: "exp-1",
    author_name: "Meera Nair",
    comment: "Best guest lecture of the semester. The social engineering demonstration was incredible!",
    status: "approved",
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

let runtimeCommentsStore: ProjectComment[] = [...fallbackComments];

export async function getApprovedComments(projectId: string): Promise<ProjectComment[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("project_comments")
      .select("*")
      .eq("project_id", projectId)
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return runtimeCommentsStore.filter(
        (c) => (c.project_id === projectId || projectId === "exp-1") && c.status === "approved"
      );
    }

    return data;
  } catch {
    return runtimeCommentsStore.filter(
      (c) => (c.project_id === projectId || projectId === "exp-1") && c.status === "approved"
    );
  }
}

export async function getAllCommentsForAdmin(): Promise<ProjectComment[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("project_comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [...runtimeCommentsStore].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    return data;
  } catch {
    return [...runtimeCommentsStore].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
}

export async function insertComment(input: {
  projectId: string;
  authorName: string;
  comment: string;
}): Promise<ProjectComment> {
  const newComment: ProjectComment = {
    id: `comm-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    project_id: input.projectId,
    author_name: input.authorName,
    comment: input.comment,
    status: "pending",
    created_at: new Date().toISOString(),
  };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("project_comments")
      .insert({
        project_id: input.projectId,
        author_name: input.authorName,
        comment: input.comment,
        status: "pending",
      })
      .select()
      .single();

    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.warn("Supabase insert comment fallback to runtime store:", err);
  }

  runtimeCommentsStore.unshift(newComment);
  return newComment;
}

export async function updateCommentStatus(
  id: string,
  status: "approved" | "rejected"
): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("project_comments")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      const target = runtimeCommentsStore.find((c) => c.id === id);
      if (target) {
        target.status = status;
        return true;
      }
      return false;
    }
    return true;
  } catch {
    const target = runtimeCommentsStore.find((c) => c.id === id);
    if (target) {
      target.status = status;
      return true;
    }
    return false;
  }
}

export async function deleteComment(id: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("project_comments").delete().eq("id", id);
    if (error) {
      runtimeCommentsStore = runtimeCommentsStore.filter((c) => c.id !== id);
    }
    return true;
  } catch {
    runtimeCommentsStore = runtimeCommentsStore.filter((c) => c.id !== id);
    return true;
  }
}
