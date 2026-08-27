"use client";

import { Hero } from "@/types/hero";
import { ArrowRight } from "lucide-react";

import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import {
  useEffect,
  useRef,
} from "react";

type Props = {
  hero: Hero;
};

export default function HeroContent({
  hero,
}: Props) {
  /* ==========================================================
     MOTION VALUES
  ========================================================== */

  const opacity = useMotionValue(1);
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const blur = useMotionValue(0);

  const filter = useTransform(
    blur,
    (value) => `blur(${value}px)`
  );

  /* ==========================================================
     ELEMENT REFERENCE
  ========================================================== */

  const contentRef =
    useRef<HTMLDivElement | null>(null);

  /* ==========================================================
     HELPERS
  ========================================================== */

  const clamp = (
    value: number,
    min = 0,
    max = 1
  ) => {
    return Math.max(
      min,
      Math.min(max, value)
    );
  };

  const smooth = (
    value: number
  ) => {
    const x = clamp(value);

    return (
      x *
      x *
      (3 - 2 * x)
    );
  };

  /* ==========================================================
     RESET
  ========================================================== */

  const resetAnimation = () => {
    opacity.set(1);
    y.set(0);
    x.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    blur.set(0);
  };

  /* ==========================================================
     SCROLL ANIMATION
  ========================================================== */

  useEffect(() => {
    const element =
      contentRef.current;

    if (!element) return;

    let frame = 0;

    /* ========================================================
       DOCUMENT POSITION
    ======================================================== */

    const getDocumentTop = () => {
      return (
        element.getBoundingClientRect().top +
        window.scrollY
      );
    };

    /* ========================================================
       INITIAL POSITION
    ======================================================== */

    let initialTop =
      getDocumentTop();

    /* ========================================================
       UPDATE ANIMATION
    ======================================================== */

    const updateAnimation = () => {
      const currentTop =
        getDocumentTop();

      /*
       * Distance this Hero content has travelled upward.
       */

      const moved =
        initialTop - currentTop;

      /*
       * Convert movement into progress.
       */

      const progress =
        clamp(
          moved /
            Math.max(
              initialTop,
              1
            )
        );

      /* ======================================================
         TEXT DELAY

         First 30% stays mostly static.
      ====================================================== */

      const TEXT_START = 0.30;

      const textProgress =
        clamp(
          (progress - TEXT_START) /
            (1 - TEXT_START)
        );

      const eased =
        smooth(textProgress);

      /* ======================================================
         3D MOVEMENT
      ====================================================== */

      const nextY =
        -eased * 70;

      const nextX =
        eased * -14;

      const nextScale =
        1 -
        eased * 0.085;

      const nextRotateX =
        eased * 8;

      const nextRotateY =
        eased * -3;

      /* ======================================================
         FADE
      ====================================================== */

      const fadeProgress =
        smooth(
          clamp(
            (textProgress - 0.78) /
              0.22
          )
        );

      const nextOpacity =
        1 -
        Math.pow(
          fadeProgress,
          1.15
        );

      /* ======================================================
         BLUR
      ====================================================== */

      const blurProgress =
        smooth(
          clamp(
            (textProgress - 0.82) /
              0.18
          )
        );

      const nextBlur =
        blurProgress * 3;

      /* ======================================================
         APPLY
      ====================================================== */

      opacity.set(
        clamp(nextOpacity)
      );

      y.set(nextY);

      x.set(nextX);

      scale.set(
        clamp(
          nextScale,
          0.975,
          1
        )
      );

      rotateX.set(nextRotateX);

      rotateY.set(nextRotateY);

      blur.set(
        clamp(
          nextBlur,
          0,
          3
        )
      );

      frame = 0;
    };

    /* ========================================================
       SCROLL
    ======================================================== */

    const handleScroll = () => {
      if (frame) return;

      frame =
        requestAnimationFrame(
          updateAnimation
        );
    };

    /* ========================================================
       RESIZE
    ======================================================== */

    const handleResize = () => {
      initialTop =
        getDocumentTop();

      resetAnimation();

      if (frame) return;

      frame =
        requestAnimationFrame(
          updateAnimation
        );
    };

    /* ========================================================
       PAGE SHOW

       Handles reload / browser back-forward cache.
    ======================================================== */

    const handlePageShow = () => {
      requestAnimationFrame(() => {
        initialTop =
          getDocumentTop();

        updateAnimation();
      });
    };

    /* ========================================================
       INITIAL
    ======================================================== */

    initialTop =
      getDocumentTop();

    resetAnimation();

    frame =
      requestAnimationFrame(
        updateAnimation
      );

    /* ========================================================
       EVENTS
    ======================================================== */

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    window.addEventListener(
      "pageshow",
      handlePageShow
    );

    /* ========================================================
       CLEANUP
    ======================================================== */

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "pageshow",
        handlePageShow
      );

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [
    opacity,
    y,
    x,
    scale,
    rotateX,
    rotateY,
    blur,
  ]);

  /* ==========================================================
     CONTENT
  ========================================================== */

  return (
    <motion.div
      ref={contentRef}
      className="
        w-full
        max-w-[430px]

        will-change-transform

        [transform-style:preserve-3d]
      "
      style={{
        opacity,

        x,

        y,

        scale,

        rotateX,

        rotateY,

        filter,

        transformPerspective: 1000,

        transformOrigin:
          "center center",
      }}
    >
      {/* ======================================================
          DESCRIPTION
      ====================================================== */}

      <p
        className="
          mt-0

          text-[clamp(15px,1.05vw,19px)]

          leading-[1.65]

          text-neutral-600
        "
      >
        {hero.description}
      </p>

      {/* ======================================================
          BUTTONS
      ====================================================== */}

      <div
        className="
          mt-[clamp(24px,3vh,34px)]

          flex
          flex-wrap

          items-center

          gap-3
        "
      >
        {/* BOOK A CALL */}

        <a
          href="#contact"
          className="
            inline-flex

            shrink-0

            items-center
            justify-center

            gap-3

            rounded-full

            bg-black

            px-[clamp(22px,1.8vw,32px)]

            py-[clamp(13px,1vw,17px)]

            text-[clamp(11px,0.7vw,14px)]

            font-semibold

            uppercase

            tracking-[0.08em]

            text-white

            transition-all

            duration-300

            hover:-translate-y-1
          "
        >
          BOOK A CALL

          <ArrowRight
            className="h-4 w-4"
          />
        </a>

        {/* LEARN MORE */}

        <a
          href="#about"
          className="
            inline-flex

            shrink-0

            items-center
            justify-center

            rounded-full

            border
            border-black/20

            bg-white

            px-[clamp(22px,1.8vw,32px)]

            py-[clamp(13px,1vw,17px)]

            text-[clamp(11px,0.7vw,14px)]

            font-semibold

            uppercase

            tracking-[0.08em]

            text-black

            transition-all

            duration-300

            hover:-translate-y-1

            hover:border-black

            hover:bg-black

            hover:text-white
          "
        >
          LEARN MORE
        </a>
      </div>

      {/* ======================================================
          DIVIDER
      ====================================================== */}

      <div
        className="
          mt-[clamp(28px,4vh,48px)]

          h-px

          w-[clamp(70px,7vw,120px)]

          bg-neutral-300
        "
      />
    </motion.div>
  );
}