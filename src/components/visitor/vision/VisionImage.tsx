import Image from "next/image";
import Reveal from "@/components/shared/Reveal";

import { Vision } from "@/types/vision";

type Props = {
  vision: Vision;
};

export default function VisionImage({
  vision,
}: Props) {
  return (
    <Reveal delay={0.15}>
      <div
        className="
          relative
          aspect-[4/3]
          w-full
          overflow-hidden
          rounded-3xl
          bg-neutral-100
        "
      >
        {vision.image_url ? (
          <Image
            src={vision.image_url}
            alt={
              vision.main_heading ||
              "Vision"
            }
            fill
            sizes="
              (max-width: 1024px) 100vw,
              50vw
            "
            className="
              object-cover
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-sm
              text-neutral-400
            "
          >
            No Vision Image
          </div>
        )}
      </div>
    </Reveal>
  );
}