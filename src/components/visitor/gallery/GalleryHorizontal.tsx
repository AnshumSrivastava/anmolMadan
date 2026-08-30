"use client";

import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Gallery } from "@/types/gallery";
import GalleryCard from "./GalleryCard";

interface GalleryHorizontalProps {
  items: Gallery[];
}

export default function GalleryHorizontal({ items }: GalleryHorizontalProps) {
  const normalizedItems = useMemo(
    () => [...items].sort((a, b) => a.sort_order - b.sort_order),
    [items]
  );

  const total = normalizedItems.length;

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [unmuted, setUnmuted] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);

  const angleRef = useRef<number>(0);
  const targetAngleRef = useRef<number | null>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const animFrameIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const nudgeDeltaRef = useRef<number>(0);

  const angleStep = 360 / Math.max(total, 1);
  const radius = Math.min(Math.max(total * 95, 380), 580);

  // Speed: ~12 degrees per second (smooth continuous orbital glide)
  const orbitSpeed = 11.5;

  /* =========================================================
     CONTINUOUS ORBITAL ANIMATION LOOP (Planetary 3D Revolution)
  ========================================================= */

  useEffect(() => {
    let isRunning = true;

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const isFocused = focusedIndex !== null;
      const isPaused = isManualPaused || isFocused;

      if (!isPaused) {
        if (nudgeDeltaRef.current !== 0) {
          angleRef.current += nudgeDeltaRef.current;
          nudgeDeltaRef.current = 0;
        }
        // Continuous smooth planetary revolution
        angleRef.current = (angleRef.current - orbitSpeed * deltaTime) % 360000;
        if (cylinderRef.current) {
          cylinderRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
        }
      } else if (targetAngleRef.current !== null) {
        // Smoothly interpolate to target focused angle
        const diff = targetAngleRef.current - angleRef.current;
        if (Math.abs(diff) > 0.1) {
          angleRef.current += diff * Math.min(deltaTime * 8, 0.25);
          if (cylinderRef.current) {
            cylinderRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
          }
        } else {
          angleRef.current = targetAngleRef.current;
          if (cylinderRef.current) {
            cylinderRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
          }
          targetAngleRef.current = null;
        }
      }

      if (isRunning) {
        animFrameIdRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [focusedIndex, isManualPaused, orbitSpeed]);

  /* =========================================================
     FOCUS & NUDGE CONTROLS
  ========================================================= */

  const handleCardClick = (index: number) => {
    if (focusedIndex === index) {
      // Toggle off focus -> resume continuous orbit
      setFocusedIndex(null);
      targetAngleRef.current = null;
    } else {
      // Lock onto this card at front (0 deg)
      setFocusedIndex(index);
      const target = -index * angleStep;
      // Find shortest angular path to target
      const current = angleRef.current;
      const delta = ((((target - current) % 360) + 540) % 360) - 180;
      targetAngleRef.current = current + delta;
    }
  };

  const handleNudge = (direction: "left" | "right") => {
    const delta = direction === "right" ? -angleStep : angleStep;
    if (focusedIndex !== null) {
      const nextIndex =
        direction === "right"
          ? (focusedIndex + 1) % total
          : (focusedIndex - 1 + total) % total;
      setFocusedIndex(nextIndex);
      targetAngleRef.current = -nextIndex * angleStep;
    } else {
      nudgeDeltaRef.current += delta;
    }
  };

  if (!normalizedItems.length) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden py-6 select-none">
      {/* TOP CONTROLS */}
      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-end px-6 lg:px-10">
        {/* Audio & Manual Nudge Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setUnmuted((prev) => !prev)}
            aria-label={unmuted ? "Mute video audio" : "Unmute video audio"}
            className={`flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold uppercase tracking-wider transition-all ${
              unmuted
                ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                : "border-neutral-200 bg-white/90 text-neutral-700 hover:bg-neutral-50 shadow-sm"
            }`}
          >
            {unmuted ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span className="text-[10px] hidden sm:inline">
              {unmuted ? "Audio Active" : "Muted"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsManualPaused((prev) => !prev)}
            aria-label={isManualPaused ? "Play orbit" : "Pause orbit"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-700 shadow-sm transition hover:bg-neutral-50"
          >
            {isManualPaused ? <Play size={13} /> : <Pause size={13} />}
          </button>

          {total > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleNudge("left")}
                aria-label="Rotate left"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-all hover:scale-105 hover:bg-neutral-800 active:scale-95 shadow-sm"
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={() => handleNudge("right")}
                aria-label="Rotate right"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-all hover:scale-105 hover:bg-neutral-800 active:scale-95 shadow-sm"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3D PLANETARY CYLINDER STAGE */}
      <div
        className="relative mx-auto mt-4 flex min-h-[520px] sm:min-h-[620px] w-full max-w-[1700px] items-center justify-center overflow-visible px-4"
        style={{
          perspective: "1400px",
          perspectiveOrigin: "center 48%",
        }}
      >
        {/* Revolving Cylinder Center Pivot */}
        <div
          ref={cylinderRef}
          className="relative flex h-full w-full items-center justify-center will-change-transform"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {normalizedItems.map((item, index) => {
            const itemAngle = index * angleStep;
            const isFocused = focusedIndex === index;

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(index)}
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate(-50%, -50%) rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                }}
                className={`
                  absolute
                  top-1/2
                  left-1/2
                  cursor-pointer
                  transition-all
                  duration-500
                  ${
                    isFocused
                      ? "w-[88vw] sm:w-[70vw] lg:w-[48vw] max-w-[720px] z-50 scale-[1.04]"
                      : "w-[75vw] sm:w-[50vw] lg:w-[35vw] max-w-[500px] hover:brightness-105"
                  }
                `}
              >
                <GalleryCard
                  item={item}
                  isActive={isFocused || focusedIndex === null}
                  unmuted={isFocused && unmuted}
                  onEnded={() => handleNudge("right")}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}