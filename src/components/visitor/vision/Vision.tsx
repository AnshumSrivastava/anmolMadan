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

/* =========================================================
   VISION
========================================================= */

export default async function Vision() {
  const vision = await getVision();

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
          className={`grid items-center gap-16 ${vision.image_url ? "lg:grid-cols-2" : ""}`}
        >
          {/* ===================================================
              LEFT — IMAGE (only if exists)
          =================================================== */}

          <VisionImage vision={vision} />

          {/* ===================================================
              RIGHT — CONTENT
          =================================================== */}

          <Reveal delay={0.15}>
            <VisionContent vision={vision} />
          </Reveal>
        </div>

        {/* =====================================================
            USP
        ===================================================== */}

        <Reveal delay={0.25}>
          <USP
            vision={vision}
          />
        </Reveal>
      </div>
    </section>
  );
}