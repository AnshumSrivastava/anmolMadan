import { createClient } from "@/lib/supabase/server";
import { Note } from "@/types/note";

const DEFAULT_NOTE: Note = {
  id: "default-note",
  eyebrow: "Personal Philosophy",
  heading: "A Note From Me to You",
  quote:
    "Technology moves fast, but the greatest defense will always be the instincts you and I build together.",
  body:
    "When I first stepped into cybersecurity, I noticed how detached and intimidating it felt. Most guidance treated you like a liability—burying real awareness under dry checklists that were easy to ignore. I knew you deserved something much better.\n\nMy goal with you is simple: cut through the jargon, remove the fear, and turn security into practical instincts you can trust every day. Whether we're in an auditorium together or having a one-on-one conversation, I'm here to build genuine confidence with you so you always feel in control of your digital world.",
  author_name: "Anmol Madan",
  author_title: "Cybersecurity Specialist & Motivational Speaker",
  is_visible: true,
};

export async function getNote(): Promise<Note> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return DEFAULT_NOTE;
    }

    return {
      ...DEFAULT_NOTE,
      ...data,
    };
  } catch (err) {
    return DEFAULT_NOTE;
  }
}

export async function updateNote(note: Partial<Note>): Promise<void> {
  try {
    const supabase = await createClient();
    const { data: existing } = await supabase
      .from("notes")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (existing?.id) {
      const { error } = await supabase
        .from("notes")
        .update({
          ...note,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("notes")
        .insert({
          ...note,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
    }
  } catch (err) {
    console.error("Failed to update note in Supabase:", err);
    throw err;
  }
}
