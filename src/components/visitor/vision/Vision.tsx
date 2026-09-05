import { getVision } from "@/services/vision/vision.service";
import Reveal from "@/components/shared/Reveal";

import { Josefin_Sans } from "next/font/google";

import VisionContent from "./VisionContent";
import USP from "./USP";
import VisionImage from "./VisionImage";

/* =========================================================
   VISION DISPLAY FONT
========================================================= */

const visionFont = Josefin_Sans({
  subsets: ["latin"],
  weight: "400",
});

import { Vision as VisionType } from "@/types/vision";

interface VisionProps {
  vision?: VisionType | null;
}

export default async function Vision({ vision: initialVision }: VisionProps = {}) {
  const vision = initialVision !== undefined ? initialVision : await getVision();

  if (!vision) return null;

  return (
    <section
      id="vision"
      className={`
        ${visionFont.className}

        relative
        overflow-hidden

        bg-white dark:bg-black

        py-20 lg:py-24
        text-black dark:text-white
      `}
    >
      <div
        className="
          mx-auto
          max-w-7xl

          px-6
          lg:px-8
        "
      >
        {/* =====================================================
            MAIN VISION
        ===================================================== */}

        <div
          className={`
            grid
            items-center
            gap-16
            ${vision.image_url ? "lg:grid-cols-2" : ""}
          `}
        >
          {/* ===================================================
              LEFT — CONTENT
          =================================================== */}

          <Reveal
            delay={0.15}
            className="order-2 lg:order-1"
          >
            <VisionContent vision={vision} />
          </Reveal>

          {/* ===================================================
              RIGHT — IMAGE
          =================================================== */}

          <div className="order-1 lg:order-2">
            <VisionImage vision={vision} />
          </div>
        </div>

        {/* =====================================================
            USP
        ===================================================== */}

        <Reveal delay={0.25}>
          <USP vision={vision} />
        </Reveal>
      </div>
    </section>
  );
}