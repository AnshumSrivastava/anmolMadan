import { createClient } from "@/lib/supabase/server";
import { Note } from "@/types/note";

const DEFAULT_NOTE: Note = {
  id: "default-note",
  eyebrow: "Personal Philosophy",
  heading: "A Note from Anmol",
  quote: "Technology changes every day, but human curiosity and vigilance remain our greatest defense.",
  body:
    "When I first started in cybersecurity, I noticed something concerning: training was often treated as a compliance checklist—dry, intimidating, and easily forgotten. I believed there had to be a better way.\n\nMy mission has always been simple: demystify security, make it deeply engaging, and turn complex cyber concepts into practical instincts that anyone can apply. Whether speaking to hundreds in an auditorium or advising executive teams, I strive to inspire genuine care and digital confidence in every room I enter.",
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
