import { createClient } from "@/lib/supabase/server";
import { ProjectComment } from "@/types/projectComment";


export async function getApprovedComments(projectId: string): Promise<ProjectComment[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("project_comments")
      .select("*")
      .eq("project_id", projectId)
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getAllCommentsForAdmin(): Promise<ProjectComment[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("project_comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error(err);
    return [];
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
    throw error || new Error("Failed to insert comment");
  } catch (err) {
    console.error("Supabase insert comment error:", err);
    throw err;
  }
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
      console.error(error);
      return false;
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function deleteComment(id: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("project_comments").delete().eq("id", id);
    if (error) {
      console.error(error);
      return false;
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
