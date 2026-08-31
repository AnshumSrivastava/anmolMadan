"use client";

import { useState } from "react";
import { Instrument_Sans } from "next/font/google";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import ContactModal from "@/components/visitor/layout/ContactModal";

/* =========================================================
   FONT
========================================================= */

const footerFont = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* =========================================================
   ICONS (INLINE SVG FOR CONSISTENCY)
========================================================= */

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63a1.63 1.63 0 0 0 1.63-1.63c0-.9-.73-1.62-1.63-1.62Z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

/* =========================================================
   SMOOTH SCROLL
========================================================= */

const scrollToSection = (id: string) => {
  const section = document.querySelector(id);

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

import type { ContactLink } from "@/types/contact";
import { renderContactIcon } from "@/components/shared/ContactIcons";

/* =========================================================
   FOOTER
========================================================= */

export default function Footer({ links = [] }: { links?: ContactLink[] }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <footer
      className={`
        ${footerFont.className}
        border-t
        border-black/[0.08]
        bg-white dark:bg-black
        text-black dark:text-white
      `}
    >
      {/* =====================================================
          PRE-FOOTER CTA BANNER
      ===================================================== */}
      <div className="border-b border-black/[0.06] bg-neutral-900 text-white">
        <div className="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-8 px-6 py-16 sm:px-8 lg:flex-row lg:items-center lg:px-12 xl:px-16">
          <div className="max-w-2xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Work Together
            </span>
            <h3 className="mt-3 text-3xl font-medium tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              Ready to create an unforgettable session?
            </h3>
            <p className="mt-4 text-sm sm:text-base text-neutral-400">
              Available for corporate cybersecurity training, college workshops, and keynote speaking across India & online.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white dark:bg-black
                px-8
                py-4
                text-xs
                font-semibold
                uppercase
                tracking-[0.1em]
                text-black dark:text-white
                transition-all
                duration-300
                hover:scale-105
                hover:bg-neutral-100 dark:bg-neutral-800
                active:scale-95
                cursor-pointer
              "
            >
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="
          mx-auto
          max-w-[1500px]
          px-6
          py-20
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        {/* =====================================================
            MAIN FOOTER GRID
        ===================================================== */}

        <div
          className="
            grid
            gap-16
            sm:grid-cols-2
            lg:grid-cols-[1.3fr_0.7fr_0.8fr_1fr]
            lg:gap-12
            xl:gap-20
          "
        >
          {/* ===================================================
              BRAND
          =================================================== */}

          <div>
            {/* Logo */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="
                group
                border-none
                bg-transparent
                p-0
                text-left
                outline-none
                cursor-pointer
              "
            >
              <h3
                className="
                  text-[26px]
                  font-semibold
                  leading-none
                  tracking-[0.25em]
                  text-black dark:text-white
                  transition-opacity
                  duration-300
                  group-hover:opacity-60
                "
              >
                ANMOL
              </h3>

              <p
                className="
                  mt-1.5
                  text-[8px]
                  font-medium
                  leading-none
                  tracking-[0.48em]
                  text-neutral-400
                "
              >
                MADAN
              </p>
            </button>

            {/* Description */}
            <div
              className="
                mt-8
                max-w-[290px]
                space-y-2
                text-[14px]
                leading-6
                text-neutral-500 dark:text-neutral-400
              "
            >
              <p className="font-medium text-neutral-800 dark:text-neutral-200">
                Cybersecurity Trainer & Motivational Speaker
              </p>
              <p>Based in Chandigarh, India</p>
              <p>Delivering sessions Pan-India & Online</p>
            </div>
          </div>

          {/* ===================================================
              EXPLORE
          =================================================== */}

          <div>
            <h4
              className="
                mb-7
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-neutral-400
              "
            >
              Explore
            </h4>

            <div
              className="
                flex
                flex-col
                gap-3.5
                text-[14px]
                text-neutral-600 dark:text-neutral-400
              "
            >
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-fit border-none bg-transparent p-0 text-left transition-colors duration-300 hover:text-black dark:hover:text-white cursor-pointer"
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("#about")}
                className="w-fit border-none bg-transparent p-0 text-left transition-colors duration-300 hover:text-black dark:hover:text-white cursor-pointer"
              >
                About
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("#vision")}
                className="w-fit border-none bg-transparent p-0 text-left transition-colors duration-300 hover:text-black dark:hover:text-white cursor-pointer"
              >
                Vision
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("#experience")}
                className="w-fit border-none bg-transparent p-0 text-left transition-colors duration-300 hover:text-black dark:hover:text-white cursor-pointer"
              >
                Experience
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("#testimonials")}
                className="w-fit border-none bg-transparent p-0 text-left transition-colors duration-300 hover:text-black dark:hover:text-white cursor-pointer"
              >
                Testimonials
              </button>
            </div>
          </div>

          {/* ===================================================
              FOCUS AREAS
          =================================================== */}

          <div>
            <h4
              className="
                mb-7
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-neutral-400
              "
            >
              Key Expertise
            </h4>

            <ul
              className="
                space-y-3.5
                text-[14px]
                leading-6
                text-neutral-600 dark:text-neutral-400
              "
            >
              <li>Corporate Cybersecurity</li>
              <li>Ethical Hacking Workshops</li>
              <li>Motivational Keynotes</li>
              <li>Executive Threat Defense</li>
              <li>Student Mentorship</li>
            </ul>
          </div>

          {/* ===================================================
              CONNECT
          =================================================== */}

          <div>
            <h4
              className="
                mb-7
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-neutral-400
              "
            >
              Connect Directly
            </h4>

            <div className="flex flex-col gap-4">
              {links.length > 0 ? (
                links.map((link) => {
                  const isExternal = !link.url?.startsWith("mailto:") && !link.url?.startsWith("tel:");
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 transition-colors duration-300 hover:text-black dark:hover:text-white"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                        {renderContactIcon(link.icon_name, { size: 14 })}
                      </div>
                      <span className="truncate">{link.label}</span>
                    </a>
                  );
                })
              ) : (
                <>
                  <a
                    href="https://linkedin.com/in/anmol-madan"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 transition-colors duration-300 hover:text-black dark:hover:text-white"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 hover:border-black dark:border-white hover:bg-black hover:text-white">
                      <LinkedInIcon className="h-3.5 w-3.5" />
                    </div>
                    <span>LinkedIn Profile</span>
                  </a>

                  <a
                    href="mailto:anmolmadan.official@gmail.com"
                    className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 transition-colors duration-300 hover:text-black dark:hover:text-white"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 hover:border-black dark:border-white hover:bg-black hover:text-white">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <span>anmolmadan.official@gmail.com</span>
                  </a>

                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 transition-colors duration-300 hover:text-black dark:hover:text-white"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 hover:border-black dark:border-white hover:bg-black hover:text-white">
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <span>+91 98765 43210</span>
                  </a>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 transition-colors duration-300 hover:text-black dark:hover:text-white"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 hover:border-black dark:border-white hover:bg-black hover:text-white">
                      <InstagramIcon className="h-3.5 w-3.5" />
                    </div>
                    <span>Instagram Updates</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div
          className="
            mt-20
            border-t
            border-black/[0.08]
            pt-7
          "
        >
          <div
            className="
              flex
              flex-col
              items-start
              justify-between
              gap-5
              text-[11px]
              text-neutral-400
              sm:flex-row
              sm:items-center
            "
          >
            {/* Copyright */}
            <p>© 2026 Anmol Madan. All Rights Reserved.</p>

            {/* Meta */}
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <span>anmolmadan.in</span>
              <span className="text-neutral-200">•</span>
              <span>Chandigarh, India</span>
            </div>
          </div>
        </div>
      </div>
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </footer>
  );
}