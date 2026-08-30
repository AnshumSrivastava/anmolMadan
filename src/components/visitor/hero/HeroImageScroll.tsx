"use client";

import {
  motion,
  useMotionValue,
} from "framer-motion";
import React, {
  ReactElement,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactElement<any>;
};

export default function HeroImageScroll({ children }: Props) {
  const pathname = usePathname();
  const isHeroPage = pathname === "/";

  /* ==========================================================
     MOTION VALUES (Compositor-only: opacity, scale, y)
  ========================================================== */

  const opacity = useMotionValue(1);
  const blurOpacity = useMotionValue(0);
  const scale = useMotionValue(1);
  const y = useMotionValue(0);

  /* ==========================================================
     HELPERS
  ========================================================== */

  const clamp = (value: number, min = 0, max = 1) => {
    return Math.max(min, Math.min(max, value));
  };

  const smoothstep = (value: number) => {
    const x = clamp(value);
    return x * x * (3 - 2 * x);
  };

  /* ==========================================================
     RESET
  ========================================================== */

  const reset = () => {
    opacity.set(1);
    blurOpacity.set(0);
    scale.set(1);
    y.set(0);
  };

  /* ==========================================================
     SCROLL EFFECT
  ========================================================== */

  useEffect(() => {
    if (!isHeroPage) {
      reset();
      return;
    }

    const hero = document.getElementById("hero");
    if (!hero) {
      reset();
      return;
    }

    let frame = 0;

    const update = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const transitionDistance = Math.max(window.innerHeight * 0.9, 500);
      const progress = clamp(scrollY / transitionDistance);

      /* 1. BLUR OVERLAY OPACITY (smooth 0 -> 1) */
      const blurP = smoothstep((progress - 0.05) / 0.45);
      const nextBlurOpacity = clamp(Math.pow(blurP, 1.2), 0, 1);

      /* 2. SCALE & Y TRANSLATION */
      const depthP = smoothstep((progress - 0.08) / 0.65);
      const nextY = -depthP * 32;
      const nextScale = 1 - depthP * 0.06;

      /* 3. OVERALL FADE OUT (as card pulls over) */
      const fadeP = smoothstep((progress - 0.4) / 0.55);
      const nextOpacity = clamp(1 - fadeP, 0, 1);

      /* APPLY (All pure compositor properties) */
      blurOpacity.set(nextBlurOpacity);
      opacity.set(nextOpacity);
      scale.set(nextScale);
      y.set(nextY);

      frame = 0;
    };

    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const handleResize = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const handlePageShow = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    reset();
    update();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pageshow", handlePageShow);
      if (frame) cancelAnimationFrame(frame);
      reset();
    };
  }, [isHeroPage, blurOpacity, opacity, scale, y]);

  return (
    <motion.div
      className="
        relative
        h-full
        w-full
        overflow-visible
        will-change-transform
      "
      style={{
        opacity,
        scale,
        y,
        transformOrigin: "center bottom",
      }}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<any>, { blurOpacity })
        : children}
    </motion.div>
  );
}