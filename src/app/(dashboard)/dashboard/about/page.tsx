import { getAbout } from "@/services/about/about.service";
import { AboutForm } from "@/components/about";

export default async function AboutPage() {
  const about = await getAbout();

  if (!about) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
        <h2 className="text-lg font-semibold text-red-500">
          Failed to load About section
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Please make sure the About record exists in your database.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">About</h1>
        <p className="mt-2 text-zinc-400">
          Manage your About section content.
        </p>
      </div>

      {/* Form */}
      <AboutForm about={about} />
    </div>
  );
}