"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Instrument_Sans } from "next/font/google";

/* =========================================================
   FONT
========================================================= */

const navbarFont = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* =========================================================
   NAVIGATION
========================================================= */

const navItems = [
  { label: "About", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
];

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* =======================================================
     SCROLL DETECTION
  ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  const scrollToSection = (id: string) => {
    const section = document.querySelector(id);

    if (!section) {
      setOpen(false);
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setOpen(false);
  };

  return (
    <>
      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          ${navbarFont.className}

          fixed
          inset-x-0
          top-0
          z-[100]

          w-full

          border-none
          outline-none
          shadow-none
        `}
      >
        <div
          className={`
            grid
            w-full
            grid-cols-3
            items-center

            px-6
            sm:px-8
            lg:px-10
            xl:px-12

            transition-all
            duration-500
            ease-out

            ${
              scrolled
                ? `
                  h-[68px]
                  bg-white/70
                  backdrop-blur-xl
                  backdrop-saturate-150
                `
                : `
                  h-[82px]
                  bg-transparent
                  backdrop-blur-0
                `
            }
          `}
        >
          {/* =================================================
              LEFT — LOGO
          ================================================= */}

          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => scrollToSection("#hero")}
              aria-label="Go to homepage"
              className="
                relative
                z-[110]
                shrink-0

                border-none
                bg-transparent
                p-0

                text-left
                outline-none

                group
              "
            >
              <h1
                className="
                  text-[24px]
                  font-semibold
                  leading-none
                  tracking-[0.24em]
                  text-black

                  transition-opacity
                  duration-300
                  group-hover:opacity-70

                  sm:text-[27px]
                "
              >
                ANMOL
              </h1>

              <p
                className="
                  mt-[5px]

                  text-[8px]
                  font-medium
                  leading-none

                  tracking-[0.48em]

                  text-neutral-500

                  sm:text-[9px]
                "
              >
                MADAN
              </p>
            </button>
          </div>

          {/* =================================================
              CENTER — DESKTOP NAVIGATION
          ================================================= */}

          <div
            className="
              hidden
              items-center
              justify-center

              gap-7
              xl:gap-9

              lg:flex
            "
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="
                  group
                  relative

                  whitespace-nowrap

                  border-none
                  bg-transparent
                  p-0

                  text-[10px]
                  font-medium
                  uppercase

                  tracking-[0.18em]

                  text-neutral-600

                  outline-none

                  transition-colors
                  duration-300

                  hover:text-black
                "
              >
                {item.label}

                {/* Underline */}

                <span
                  className="
                    absolute

                    -bottom-[7px]
                    left-0

                    h-px
                    w-0

                    bg-black

                    transition-all
                    duration-300
                    ease-out

                    group-hover:w-full
                  "
                />
              </button>
            ))}
          </div>

          {/* =================================================
              RIGHT — CONTACT
          ================================================= */}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="
                relative
                z-[110]

                hidden
                shrink-0

                min-w-[132px]

                rounded-full

                border-none
                bg-black

                px-6
                py-[11px]

                text-[11px]
                font-medium

                tracking-[-0.01em]

                text-white

                outline-none

                transition-all
                duration-300

                hover:scale-[1.035]
                hover:bg-neutral-800

                active:scale-[0.98]

                lg:block
              "
            >
              Contact Now →
            </button>
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="
              relative
              z-[110]

              justify-self-end

              border-none
              bg-transparent
              p-1

              text-black

              outline-none

              lg:hidden
            "
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {open ? (
                <motion.div
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -45,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 45,
                    scale: 0.8,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <X
                    size={25}
                    strokeWidth={1.7}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 45,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -45,
                    scale: 0.8,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Menu
                    size={25}
                    strokeWidth={1.7}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <>
            {/* Background overlay */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={() => setOpen(false)}
              className="
                fixed
                inset-0
                z-[80]

                bg-black/20
                backdrop-blur-sm

                lg:hidden
              "
            />

            {/* Menu panel */}

            <motion.div
              initial={{
                opacity: 0,
                x: "100%",
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: "100%",
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`
                ${navbarFont.className}

                fixed
                inset-y-0
                right-0

                z-[90]

                w-[88%]
                max-w-[420px]

                bg-white

                pt-28

                shadow-[-30px_0_80px_rgba(0,0,0,0.12)]

                lg:hidden
              `}
            >
              <div className="flex h-full flex-col px-8">
                {/* Small label */}

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.1,
                  }}
                  className="
                    mb-8

                    text-[9px]
                    font-semibold
                    uppercase

                    tracking-[0.32em]

                    text-neutral-400
                  "
                >
                  Navigation
                </motion.p>

                {/* Navigation */}

                <div className="flex flex-col">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      type="button"
                      onClick={() =>
                        scrollToSection(item.href)
                      }
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          0.08 +
                          index * 0.045,
                        duration: 0.35,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="
                        group

                        flex
                        items-center
                        justify-between

                        border-none
                        border-b
                        border-neutral-100

                        bg-transparent

                        py-4

                        text-left

                        text-lg
                        font-medium

                        tracking-[0.05em]

                        text-black

                        outline-none
                      "
                    >
                      <span>
                        {item.label}
                      </span>

                      <span
                        className="
                          text-neutral-300

                          transition-all
                          duration-300

                          group-hover:translate-x-1
                          group-hover:text-black
                        "
                      >
                        →
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Contact */}

                <motion.button
                  type="button"
                  onClick={() =>
                    scrollToSection("#contact")
                  }
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      0.08 +
                      navItems.length * 0.045 +
                      0.1,
                  }}
                  className="
                    mt-10

                    w-full

                    rounded-full

                    border-none
                    bg-black

                    px-8
                    py-4

                    text-sm
                    font-medium

                    text-white

                    outline-none

                    transition-transform
                    duration-300

                    active:scale-[0.98]
                  "
                >
                  Contact Now →
                </motion.button>

                {/* Bottom detail */}

                <div className="mt-auto pb-8">
                  <div
                    className="
                      h-px
                      w-full
                      bg-neutral-100
                    "
                  />

                  <p
                    className="
                      mt-5

                      text-[9px]
                      font-medium
                      uppercase

                      tracking-[0.3em]

                      text-neutral-400
                    "
                  >
                    ANMOL MADAN
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}