import { getGallery } from "@/services/gallery/gallery.service";
import GalleryTable from "./GalleryTable";

export default async function GalleryPage() {
  const images = await getGallery();

  return (
    <div className="space-y-6">
      <GalleryTable images={images} />
    </div>
  );
}