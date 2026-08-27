"use client";

import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import {
  ReactNode,
  useEffect,
} from "react";

import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
};

export default function HeroImageScroll({
  children,
}: Props) {
  /* ==========================================================
     ROUTE
  ========================================================== */

  const pathname = usePathname();

  const isHeroPage = pathname === "/";


  /* ==========================================================
     MOTION
  ========================================================== */

  const opacity = useMotionValue(1);

  const blur = useMotionValue(0);

  const scale = useMotionValue(1);

  const y = useMotionValue(0);

  const imageFilter = useTransform(
    blur,
    (value) => `blur(${value}px)`
  );


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


  const smoothstep = (
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

  const reset = () => {
    opacity.set(1);

    blur.set(0);

    scale.set(1);

    y.set(0);
  };


  /* ==========================================================
     SCROLL EFFECT
  ========================================================== */

  useEffect(() => {

    /*
     * ========================================================
     * NOT HERO PAGE
     *
     * Absolutely no animation/listener on other pages.
     * ========================================================
     */

    if (!isHeroPage) {
      reset();
      return;
    }


    const hero =
      document.getElementById("hero");


    if (!hero) {
      reset();
      return;
    }


    let frame = 0;


    /* ========================================================
       UPDATE
    ======================================================== */

    const update = () => {

      const heroRect =
        hero.getBoundingClientRect();


      /*
       * ======================================================
       * HERO SCROLL PROGRESS
       *
       * When hero top:
       *
       *     0px → progress 0
       *
       * When hero has moved:
       *
       *     80% viewport → progress 1
       *
       * This means the image is COMPLETELY GONE
       * before About becomes the main visible section.
       * ======================================================
       */

      const transitionDistance =
        window.innerHeight * 0.82;


      const moved =
        Math.max(
          0,
          -heroRect.top
        );


      const progress =
        clamp(
          moved /
            transitionDistance
        );


      /* ======================================================
         1. BLUR
         
         Sharp initially.
         
         Blur begins gently.
      ====================================================== */

      const blurProgress =
        smoothstep(
          (progress - 0.12) /
            0.38
        );


      const nextBlur =
        Math.pow(
          blurProgress,
          1.15
        ) * 5;


      /* ======================================================
         2. SUBTLE DEPTH
      ====================================================== */

      const depthProgress =
        smoothstep(
          (progress - 0.18) /
            0.50
        );


      const nextY =
        -depthProgress * 14;


      const nextScale =
        1 -
        depthProgress * 0.035;


      /* ======================================================
         3. FADE
         
         IMPORTANT:
         
         Fade begins AFTER blur.
         
         The image is fully gone BEFORE About.
      ====================================================== */

      const fadeProgress =
        smoothstep(
          (progress - 0.48) /
            0.40
        );


      const nextOpacity =
        1 -
        fadeProgress;


      /* ======================================================
         APPLY
      ====================================================== */

      blur.set(
        clamp(
          nextBlur,
          0,
          5
        )
      );


      opacity.set(
        clamp(
          nextOpacity,
          0,
          1
        )
      );


      scale.set(
        clamp(
          nextScale,
          0.965,
          1
        )
      );


      y.set(nextY);


      frame = 0;
    };


    /* ========================================================
       SCROLL
    ======================================================== */

    const handleScroll = () => {

      if (frame) return;

      frame =
        requestAnimationFrame(
          update
        );
    };


    /* ========================================================
       RESIZE
    ======================================================== */

    const handleResize = () => {

      if (frame) return;

      frame =
        requestAnimationFrame(
          update
        );
    };


    /* ========================================================
       PAGE SHOW
       
       Handles:
       - browser back
       - browser forward
       - scroll restoration
       - reload
    ======================================================== */

    const handlePageShow = () => {

      if (frame) return;

      frame =
        requestAnimationFrame(
          update
        );
    };


    /* ========================================================
       INITIAL
    ======================================================== */

    reset();

    update();


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


      reset();
    };

  }, [isHeroPage]);


  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <motion.div
      className="
        relative
        h-full
        w-full
        overflow-visible
      "
      style={{
        opacity,

        filter: imageFilter,

        scale,

        y,

        transformOrigin:
          "center center",

        willChange:
          "transform, opacity, filter",
      }}
    >
      {children}
    </motion.div>
  );
}