"use client";

import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Instrument_Sans } from "next/font/google";
import Image from "next/image";
import ContactModal from "./ContactModal";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "next-themes";

type NavItem = {
  label: string;
  href: string;
  id: string;
};

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

const navItems: NavItem[] = [
  {
    label: "About",
    href: "#about",
    id: "about",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
    id: "testimonials",
  },
  {
    label: "Services",
    href: "#services",
    id: "services",
  },
  {
    label: "Vision",
    href: "#vision",
    id: "vision",
  },
  {
    label: "Note",
    href: "#note",
    id: "note",
  },
];

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollY } = useScroll();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* =======================================================
     RESPONSIVE BREAKPOINT

     Desktop/tablet:
       >= 1024px

     Mobile:
       < 1024px
  ======================================================= */

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const updateMobileState = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateMobileState();

    mediaQuery.addEventListener("change", updateMobileState);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  /* =======================================================
     DESKTOP SCROLL ANIMATION

     Preserved from the original design.
  ======================================================= */

  const desktopTopOffset = useTransform(
    scrollY,
    [0, 300],
    [0, 14]
  );

  const desktopSideMargin = useTransform(
    scrollY,
    [0, 300],
    [0, 260]
  );

  const desktopContainerHeight = useTransform(
    scrollY,
    [0, 300],
    [80, 54]
  );

  const desktopContainerRadius = useTransform(
    scrollY,
    [0, 300],
    [0, 9999]
  );

  const desktopContainerPaddingX = useTransform(
    scrollY,
    [0, 300],
    [48, 24]
  );

  /* =======================================================
     MOBILE SCROLL ANIMATION

     IMPORTANT:
     Mobile never gets the desktop 260px side margin.

     Instead:

       top     → nearly full width
       scroll  → small 8px side margin

     This keeps the navbar proportional on phones.
  ======================================================= */

  const mobileTopOffset = useTransform(
    scrollY,
    [0, 300],
    [0, 8]
  );

  const mobileSideMargin = useTransform(
    scrollY,
    [0, 300],
    [0, 8]
  );

  const mobileContainerHeight = useTransform(
    scrollY,
    [0, 300],
    [64, 56]
  );

  const mobileContainerRadius = useTransform(
    scrollY,
    [0, 300],
    [0, 9999]
  );

  const mobileContainerPaddingX = useTransform(
    scrollY,
    [0, 300],
    [18, 16]
  );

  /* =======================================================
     COMMON VISUAL ANIMATION
  ======================================================= */

  const bgOpacity = useTransform(
    scrollY,
    [0, 300],
    [0.55, 0.9]
  );

  const blurAmount = useTransform(
    scrollY,
    [0, 300],
    [12, 28]
  );

  const backdropFilter =
    useMotionTemplate`blur(${blurAmount}px)`;

  const bgColorStr = isDark
    ? "0, 0, 0"
    : "255, 255, 255";

  const backgroundColor =
    useMotionTemplate`rgba(${bgColorStr}, ${bgOpacity})`;

  const borderAlpha = useTransform(
    scrollY,
    [0, 300],
    [0.06, 0.1]
  );

  const borderColorStr = isDark
    ? "255, 255, 255"
    : "0, 0, 0";

  const border =
    useMotionTemplate`1px solid rgba(${borderColorStr}, ${borderAlpha})`;

  const shadowAlpha = useTransform(
    scrollY,
    [0, 300],
    [0, isDark ? 0.3 : 0.12]
  );

  const boxShadow =
    useMotionTemplate`0 12px 40px rgba(0, 0, 0, ${shadowAlpha})`;

  /* =======================================================
     LOGO / CONTACT SCALE
  ======================================================= */

  const logoScale = useTransform(
    scrollY,
    [0, 300],
    [1, 0.88]
  );

  const contactBtnScale = useTransform(
    scrollY,
    [0, 300],
    [1, 0.92]
  );

  /* =======================================================
     ACTIVE SECTION DETECTION
  ======================================================= */

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(
          "section[id], div[id='hero']"
        )
      ).filter((section) =>
        navItems.some(
          (item) => item.id === section.id
        )
      );

      if (sections.length === 0) return;

      /*
        Mobile uses a slightly lower activation point
        because the navbar is shorter.
      */

      const activationPoint = isMobile ? 90 : 140;

      let closestSection = "";
      let closestDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.bottom < activationPoint) return;

        const distance = Math.abs(
          rect.top - activationPoint
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = section.id;
        }
      });

      if (closestSection) {
        setActiveSection(closestSection);
      }
    };

    updateActiveSection();

    window.addEventListener(
      "scroll",
      updateActiveSection,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateActiveSection
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateActiveSection
      );

      window.removeEventListener(
        "resize",
        updateActiveSection
      );
    };
  }, [isMobile]);

  /* =======================================================
     CLOSE MOBILE MENU ON ESCAPE
  ======================================================= */

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  /* =======================================================
     PREVENT BODY SCROLL WHILE MOBILE MENU IS OPEN
  ======================================================= */

  useEffect(() => {
    if (!open || !isMobile) return;

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        originalOverflow;
    };
  }, [open, isMobile]);

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

  /* =======================================================
     HOME
  ======================================================= */

  const goHome = () => {
    setOpen(false);
    setActiveSection("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <motion.nav
        initial={{
          y: -70,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          top: isMobile
            ? mobileTopOffset
            : desktopTopOffset,
        }}
        className={`
          ${navbarFont.className}
          fixed
          inset-x-0
          z-[100]
          pointer-events-none
        `}
      >
        <motion.div
          style={{
            marginLeft: isMobile
              ? mobileSideMargin
              : desktopSideMargin,

            marginRight: isMobile
              ? mobileSideMargin
              : desktopSideMargin,

            height: isMobile
              ? mobileContainerHeight
              : desktopContainerHeight,

            borderRadius: isMobile
              ? mobileContainerRadius
              : desktopContainerRadius,

            paddingLeft: isMobile
              ? mobileContainerPaddingX
              : desktopContainerPaddingX,

            paddingRight: isMobile
              ? mobileContainerPaddingX
              : desktopContainerPaddingX,

            backgroundColor,
            backdropFilter,
            WebkitBackdropFilter:
              backdropFilter,
            border,
            boxShadow,
          }}
          className="
            pointer-events-auto
            flex
            items-center
            justify-between
            will-change-transform
            overflow-hidden
          "
        >
          {/* =================================================
              LEFT — LOGO
          ================================================= */}

          <motion.div
            style={{
              scale: logoScale,
              transformOrigin: "left center",
            }}
            className="
              flex
              shrink-0
              items-center
              justify-start
            "
          >
            <button
              type="button"
              onClick={goHome}
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
                cursor-pointer
              "
            >
              <Image
                src="/anmol_logo.png"
                alt="Anmol Madan"
                width={120}
                height={44}
                priority
                className="
                  h-7
                  w-auto
                  transition-opacity
                  duration-300
                  group-hover:opacity-70

                  sm:h-8
                  lg:h-[44px]
                "
              />
            </button>
          </motion.div>

          {/* =================================================
              CENTER — DESKTOP NAVIGATION
          ================================================= */}

          <div
            className="
              hidden
              items-center
              justify-center
              gap-7
              lg:flex
              xl:gap-8
            "
          >
            {navItems.map((item) => {
              const isActive =
                activeSection === item.id;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    scrollToSection(item.href)
                  }
                  className={`
                    group
                    relative
                    whitespace-nowrap
                    border-none
                    bg-transparent
                    p-0
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    outline-none
                    transition-colors
                    duration-300
                    cursor-pointer

                    ${
                      isActive
                        ? "text-black dark:text-white"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                    }
                  `}
                >
                  {item.label}

                  <span
                    className={`
                      absolute
                      -bottom-[5px]
                      left-0
                      h-[1.5px]
                      bg-black
                      dark:bg-white
                      transition-all
                      duration-300
                      ease-out

                      ${
                        isActive
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </button>
              );
            })}
          </div>

          {/* =================================================
              RIGHT — DESKTOP CONTACT
          ================================================= */}

          <motion.div
            style={{
              scale: contactBtnScale,
              transformOrigin: "right center",
            }}
            className="
              flex
              shrink-0
              items-center
              justify-end
            "
          >
            {/* DESKTOP THEME */}

            <div className="mr-4 hidden lg:block">
              <ThemeToggle />
            </div>

            {/* DESKTOP CONTACT */}

            <button
              type="button"
              onClick={() =>
                setIsContactModalOpen(true)
              }
              className="
                relative
                z-[110]
                hidden
                shrink-0
                rounded-full
                border-none
                bg-black
                px-5
                py-2.5
                text-[10.5px]
                font-semibold
                uppercase
                tracking-[0.1em]
                text-white
                outline-none
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:bg-neutral-800
                dark:bg-white
                dark:text-black
                dark:hover:bg-neutral-200
                active:scale-[0.98]
                cursor-pointer
                shadow-sm
                lg:block
              "
            >
              Contact Now →
            </button>
          </motion.div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setOpen((prev) => !prev)
            }
            aria-label={
              open
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={open}
            className="
              relative
              z-[110]
              flex
              shrink-0
              items-center
              justify-center
              border-none
              bg-transparent
              p-1.5
              text-black
              dark:text-white
              outline-none
              cursor-pointer
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
                    size={22}
                    strokeWidth={1.8}
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
                    size={22}
                    strokeWidth={1.8}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
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
              onClick={() =>
                setOpen(false)
              }
              className="
                fixed
                inset-0
                z-[80]
                bg-black/30
                backdrop-blur-sm
                lg:hidden
              "
            />

            {/* =================================================
                MOBILE MENU PANEL
            ================================================= */}

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
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`
                ${navbarFont.className}
                fixed
                inset-y-0
                right-0
                z-[90]

                w-[88vw]
                max-w-[400px]

                bg-white
                dark:bg-black

                pt-24

                shadow-[-25px_0_70px_rgba(0,0,0,0.14)]

                lg:hidden
              `}
            >
              <div
                className="
                  flex
                  h-full
                  flex-col
                  px-6
                  sm:px-8
                "
              >
                <p
                  className="
                    mb-6
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.32em]
                    text-neutral-400
                  "
                >
                  Navigation
                </p>

                {/* NAV ITEMS */}

                <div className="flex flex-col">
                  {navItems.map(
                    (item, index) => (
                      <motion.button
                        key={item.label}
                        type="button"
                        onClick={() =>
                          scrollToSection(
                            item.href
                          )
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
                            0.06 +
                            index * 0.04,
                          duration: 0.35,
                        }}
                        className="
                          group
                          flex
                          items-center
                          justify-between
                          border-none
                          border-b
                          border-neutral-100
                          dark:border-neutral-800
                          bg-transparent
                          py-4
                          text-left
                          text-lg
                          font-medium
                          tracking-[0.04em]
                          text-black
                          dark:text-white
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
                            dark:group-hover:text-white
                          "
                        >
                          →
                        </span>
                      </motion.button>
                    )
                  )}
                </div>

                {/* CONTACT */}

                <motion.button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setIsContactModalOpen(
                      true
                    );
                  }}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.3,
                  }}
                  className="
                    mt-8
                    w-full
                    rounded-full
                    border-none
                    bg-black
                    px-8
                    py-3.5
                    text-sm
                    font-medium
                    text-white
                    outline-none
                    shadow-md

                    dark:bg-white
                    dark:text-black
                  "
                >
                  Contact Now →
                </motion.button>

                {/* MOBILE THEME */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.35,
                  }}
                  className="
                    mt-6
                    flex
                    justify-center
                  "
                >
                  <ThemeToggle />
                </motion.div>

                {/* FOOTER */}

                <div
                  className="
                    mt-auto
                    pb-8
                  "
                >
                  <div
                    className="
                      h-px
                      w-full
                      bg-neutral-100
                      dark:bg-neutral-800
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
                    ANMOL MADAN · PORTFOLIO
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================
          CONTACT MODAL
      ===================================================== */}

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() =>
          setIsContactModalOpen(false)
        }
      />
    </>
  );
}