"use client";

import Cal from "@calcom/embed-react";
import { ArrowLeft, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type CalButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const EVENTS = {
  "15": {
    title: "15 min meeting",
    description: "Quick consultation",
    calLink: "anmolmadan/15min",
  },
  "30": {
    title: "30 min meeting",
    description: "Detailed consultation",
    calLink: "anmolmadan/30min",
  },
} as const;

type EventType = keyof typeof EVENTS;

export default function CalButton({
  children = "Book a Call",
  className = "",
  onClick,
  onMouseDown,
}: CalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] =
    useState<EventType | null>(null);
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  /* --------------------------------------------------
     MOUNT
  -------------------------------------------------- */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* --------------------------------------------------
     BODY LOCK + ESCAPE
  -------------------------------------------------- */

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSelectedEvent(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  /* --------------------------------------------------
     OPEN / CLOSE
  -------------------------------------------------- */

  const openModal = () => {
    setSelectedEvent(null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };

  const goBack = () => {
    setSelectedEvent(null);
  };

  /* --------------------------------------------------
     MODAL
  -------------------------------------------------- */

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* ==================================================
          BACKDROP
      ================================================== */}

      <button
        type="button"
        aria-label="Close booking modal"
        onClick={closeModal}
        className="
          absolute
          inset-0
          cursor-default
          border-0
          bg-black/30
          p-0
          backdrop-blur-md
          dark:bg-black/50
        "
      />

      {/* ==================================================
          MODAL
      ================================================== */}

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book a call"
        onClick={(event) => event.stopPropagation()}
        className="
          relative
          z-10
          flex
          h-[min(760px,calc(100dvh-32px))]
          w-full
          max-w-[960px]
          flex-col
          overflow-hidden
          rounded-[24px]
          border
          border-black/10
          bg-white
          text-black
          shadow-[0_25px_80px_rgba(0,0,0,0.25)]
          dark:border-white/10
          dark:bg-black
          dark:text-white
          dark:shadow-[0_25px_80px_rgba(0,0,0,0.65)]
        "
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-black/10
            px-5
            py-4
            dark:border-white/10
            sm:px-6
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            {/* BACK BUTTON */}

            {selectedEvent && (
              <button
                type="button"
                onClick={goBack}
                aria-label="Back"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-neutral-100
                  text-neutral-600
                  transition
                  hover:bg-neutral-200
                  hover:text-black
                  dark:bg-neutral-900
                  dark:text-neutral-300
                  dark:hover:bg-neutral-800
                  dark:hover:text-white
                "
              >
                <ArrowLeft size={15} />
              </button>
            )}

            <div className="min-w-0">
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-neutral-400
                  dark:text-neutral-500
                "
              >
                Booking & Consultation
              </p>

              <h2
                className="
                  mt-0.5
                  truncate
                  text-lg
                  font-semibold
                  tracking-[-0.02em]
                "
              >
                {selectedEvent
                  ? EVENTS[selectedEvent].title
                  : "Let's Connect"}
              </h2>
            </div>
          </div>

          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-neutral-100
              text-neutral-600
              transition
              hover:bg-neutral-200
              hover:text-black
              dark:bg-neutral-900
              dark:text-neutral-300
              dark:hover:bg-neutral-800
              dark:hover:text-white
            "
          >
            <X size={16} />
          </button>
        </div>

        {/* ==================================================
            EVENT SELECTION
        ================================================== */}

        {!selectedEvent && (
          <div
            className="
              flex
              flex-1
              items-center
              justify-center
              overflow-y-auto
              p-6
              sm:p-10
            "
          >
            <div className="w-full max-w-[560px]">
              {/* PROFILE */}

              <div className="mb-8 text-center">
                <div
                  className="
                    mx-auto
                    mb-4
                    h-20
                    w-20
                    overflow-hidden
                    rounded-full
                    border
                    border-black/10
                    bg-neutral-100
                    dark:border-white/10
                    dark:bg-neutral-900
                  "
                >
                  <img
                    src="/anmol_logo.png"
                    alt="Anmol Madan"
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3
                  className="
                    text-2xl
                    font-semibold
                    tracking-[-0.03em]
                  "
                >
                  Anmol Madan
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-neutral-500
                    dark:text-neutral-400
                  "
                >
                  Choose a meeting duration to continue.
                </p>
              </div>

              {/* EVENTS */}

              <div className="space-y-3">
                {(Object.keys(EVENTS) as EventType[]).map((event) => (
                  <button
                    key={event}
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className="
                      group
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-black/10
                      bg-white
                      px-5
                      py-5
                      text-left
                      transition
                      hover:border-black/25
                      hover:bg-neutral-50
                      dark:border-white/10
                      dark:bg-neutral-950
                      dark:hover:border-white/25
                      dark:hover:bg-neutral-900
                    "
                  >
                    <div>
                      <h4 className="text-base font-semibold">
                        {EVENTS[event].title}
                      </h4>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-neutral-500
                          dark:text-neutral-400
                        "
                      >
                        {EVENTS[event].description}
                      </p>
                    </div>

                    <span
                      className="
                        ml-4
                        text-lg
                        text-neutral-400
                        transition
                        group-hover:translate-x-1
                        group-hover:text-black
                        dark:group-hover:text-white
                      "
                    >
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================
            CALENDAR
        ================================================== */}

        {/* ==================================================
    CALENDAR
================================================== */}

{selectedEvent && (
  <div
    className={`
      relative
      min-h-0
      flex-1
      overflow-hidden
      ${isDark ? "bg-black" : "bg-white"}
    `}
  >
    {/* CAL.COM EMBED */}
    <div
      className={`
        absolute
        inset-0
        overflow-hidden
        ${isDark ? "bg-black" : "bg-white"}
      `}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          width: "100%",
          height: "calc(100% + 24px)",
          transform: "translateY(-1px)",
        }}
      >
        <Cal
          key={`${selectedEvent}-${isDark ? "dark" : "light"}`}
          calLink={EVENTS[selectedEvent].calLink}
          style={{
            width: "100%",
            height: "100%",
            minHeight: "100%",
            background: isDark ? "#000000" : "#ffffff",
          }}
          config={{
            theme: isDark ? "dark" : "light",
            layout: "month_view",
          }}
        />
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );

  /* ==================================================
      BUTTON + PORTAL
  ================================================== */

  return (
    <>
      <button
        type="button"
        onMouseDown={onMouseDown}
        onClick={(e) => {
          onClick?.(e);
          openModal();
        }}
        className={className}
      >
        {children}
      </button>

      {mounted &&
        isOpen &&
        createPortal(modal, document.body)}
    </>
  );
}