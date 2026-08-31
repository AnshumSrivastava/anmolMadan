import Image from "next/image";
import Reveal from "@/components/shared/Reveal";

import { Vision } from "@/types/vision";

type Props = {
  vision: Vision;
};

export default function VisionImage({
  vision,
}: Props) {
  if (!vision.image_url) return null;

  return (
    <Reveal delay={0.15}>
      <div
        className="
          relative
          aspect-[4/3]
          w-full
          overflow-hidden
          rounded-3xl
          border
          border-neutral-200/80 dark:border-neutral-800
          bg-neutral-100 dark:bg-neutral-800
        "
      >
        <Image
          src={vision.image_url}
          alt={vision.main_heading || "Vision"}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </Reveal>
  );
}