"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MIN_VISIBLE_MS = 800; // ensures logo is always seen briefly

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const readyRef = useRef(false);
  const mountTimeRef = useRef(Date.now());

  useEffect(() => {
    function dismiss() {
      if (readyRef.current) return;
      readyRef.current = true;

      const elapsed = Date.now() - mountTimeRef.current;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

      setTimeout(() => {
        setIsVisible(false);
      }, remaining);
    }

    // Fire when all resources (images, fonts, iframes) are ready
    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    return () => window.removeEventListener("load", dismiss);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: "var(--bg, #ffffff)" }}
          className="
            fixed inset-0 z-[9999]
            bg-white dark:bg-black
            flex items-center justify-center
            pointer-events-none select-none
          "
          aria-hidden="true"
        >
          {/* Centre lockup */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            {/* AM monogram — drawn with SVG paths */}
            <svg
              width="48"
              height="32"
              viewBox="0 0 48 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black dark:text-white"
            >
              {/* A */}
              <path
                d="M1 31 L8.5 3 L16 31"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 21.5 H13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* M */}
              <path
                d="M22 31 L22 3 L31 18 L40 3 L40 31"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Wordmark */}
            <p className="text-[9px] font-semibold uppercase tracking-[0.5em] text-neutral-400 dark:text-neutral-600">
              Anmol&nbsp;Madan
            </p>
          </motion.div>

          {/* Bottom progress shimmer */}
          <div className="absolute bottom-0 inset-x-0 h-[1.5px] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            <motion.span
              className="
                absolute inset-y-0 w-32
                bg-gradient-to-r
                from-transparent
                via-neutral-500 dark:via-neutral-400
                to-transparent
              "
              initial={{ left: "-8rem" }}
              animate={{ left: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: "easeInOut",
                repeatDelay: 0.2,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
