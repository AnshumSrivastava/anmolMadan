"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Timeline", href: "#timeline" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Companies", href: "#companies" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.querySelector(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="w-full">
          <div
            className={`
              flex
              items-center
              justify-between

              transition-all
              duration-500
              ease-out

              ${
                scrolled
                  ? `
                    h-16

                    bg-white/70
                    backdrop-blur-2xl

                    border-b
                    border-black/10

                    shadow-[0_10px_40px_rgba(0,0,0,.08)]

                    px-10
                  `
                  : `
                    h-20

                    bg-white

                    border-b
                    border-black/5

                    px-10
                  `
              }
            `}
          >
            {/* Logo */}

            <button
              type="button"
              onClick={() => scrollToSection("#hero")}
              className="text-left"
            >
              <h1 className="text-3xl font-bold tracking-[0.28em] text-black">
                ANMOL
              </h1>

              <p className="-mt-1 text-[10px] tracking-[0.45em] text-neutral-500">
                MADAN
              </p>
            </button>

            {/* Desktop */}

            <div className="hidden items-center gap-10 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="
                    relative

                    text-[11px]
                    font-semibold

                    uppercase
                    tracking-[0.22em]

                    text-neutral-700

                    transition-all
                    duration-300

                    hover:text-black

                    after:absolute
                    after:left-0
                    after:-bottom-2
                    after:h-px
                    after:w-0
                    after:bg-black
                    after:transition-all
                    after:duration-300

                    hover:after:w-full
                  "
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => scrollToSection("#contact")}
                className="
                  rounded-full

                  bg-black

                  px-7
                  py-3

                  text-xs
                  font-semibold

                  text-white

                  transition-all
                  duration-300

                  hover:scale-105
                  hover:bg-neutral-800
                "
              >
                Contact →
              </button>
            </div>

            {/* Mobile */}

            <button
              onClick={() => setOpen(!open)}
              className="text-black lg:hidden"
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="
              fixed
              inset-0
              z-40

              bg-white/90
              backdrop-blur-3xl

              pt-28
            "
          >
            <div className="flex flex-col px-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="
                    border-b
                    border-black/10

                    py-6

                    text-left
                    text-xl

                    tracking-[0.2em]

                    text-black
                  "
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => scrollToSection("#contact")}
                className="
                  mt-8

                  rounded-full

                  bg-black

                  px-6
                  py-4

                  font-semibold

                  text-white
                "
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}