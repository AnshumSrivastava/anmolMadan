import { getNote } from "@/services/note/note.service";
import NoteForm from "./NoteForm";

export default async function NotePage() {
  const note = await getNote();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Note from Anmol
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Edit your personal philosophy letter, quote, and author credentials shown on the homepage.
        </p>
      </div>

      <NoteForm note={note} />
    </div>
  );
}
