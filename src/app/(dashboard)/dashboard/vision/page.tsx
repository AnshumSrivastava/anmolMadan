import { getVision } from "@/services/vision/vision.service";
import { VisionForm } from "@/components/vision";

export default async function VisionPage() {
  const vision = await getVision();

  if (!vision) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h1 className="text-xl font-semibold text-white">
          Vision
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Vision content could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Vision / USP
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Manage the Vision section, unique selling points,
          and section image.
        </p>
      </div>

      <VisionForm vision={vision} />
    </div>
  );
}