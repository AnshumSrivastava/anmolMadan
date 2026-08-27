import { getGallery } from "@/services/gallery/gallery.service";
import GalleryTable from "@/components/gallery/GalleryTable";

export default async function GalleryPage() {
  const gallery = await getGallery();

  return (
    <main
      className="
        min-h-screen
        bg-[#0a0a0a]
        px-6
        py-10
        text-white
        lg:px-10
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
        "
      >
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-10">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-neutral-500
            "
          >
            Content Management
          </p>

          <h1
            className="
              mt-2
              text-4xl
              font-semibold
              tracking-[-0.04em]
              text-white
            "
          >
            Gallery
          </h1>

          <p
            className="
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-neutral-500
            "
          >
            Manage the videos displayed in
            the visitor gallery.
          </p>
        </div>

        {/* =====================================================
            GALLERY
        ===================================================== */}

        <GalleryTable gallery={gallery} />
      </div>
    </main>
  );
}