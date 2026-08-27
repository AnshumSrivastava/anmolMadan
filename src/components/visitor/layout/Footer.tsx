"use client";

import { Instrument_Sans } from "next/font/google";

/* =========================================================
   FONT
========================================================= */

const footerFont = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  return (
    <footer
      className={`
        ${footerFont.className}

        border-t
        border-black/[0.08]

        bg-white
        text-black
      `}
    >
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
            lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.9fr]
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
              onClick={() => scrollToSection("#hero")}
              className="
                group
                border-none
                bg-transparent
                p-0
                text-left
                outline-none
              "
            >
              <h3
                className="
                  text-[26px]
                  font-semibold
                  leading-none
                  tracking-[0.25em]
                  text-black
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
                text-neutral-500
              "
            >
              <p>Cybersecurity Trainer</p>

              <p>Motivational Speaker</p>

              <p>Based in Chandigarh, India</p>

              <p>Available Pan-India & Online</p>
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
                text-neutral-600
              "
            >
              {/* Home */}

              <button
                type="button"
                onClick={() =>
                  scrollToSection("#hero")
                }
                className="
                  w-fit
                  border-none
                  bg-transparent
                  p-0
                  text-left
                  transition-colors
                  duration-300
                  hover:text-black
                "
              >
                Home
              </button>

              {/* About */}

              <button
                type="button"
                onClick={() =>
                  scrollToSection("#about")
                }
                className="
                  w-fit
                  border-none
                  bg-transparent
                  p-0
                  text-left
                  transition-colors
                  duration-300
                  hover:text-black
                "
              >
                About
              </button>

              {/* Vision */}

              <button
                type="button"
                onClick={() =>
                  scrollToSection("#vision")
                }
                className="
                  w-fit
                  border-none
                  bg-transparent
                  p-0
                  text-left
                  transition-colors
                  duration-300
                  hover:text-black
                "
              >
                Vision
              </button>

              {/* Experience */}

              <button
                type="button"
                onClick={() =>
                  scrollToSection("#experience")
                }
                className="
                  w-fit
                  border-none
                  bg-transparent
                  p-0
                  text-left
                  transition-colors
                  duration-300
                  hover:text-black
                "
              >
                Experience
              </button>

              {/* Testimonials */}

              <button
                type="button"
                onClick={() =>
                  scrollToSection("#testimonials")
                }
                className="
                  w-fit
                  border-none
                  bg-transparent
                  p-0
                  text-left
                  transition-colors
                  duration-300
                  hover:text-black
                "
              >
                Testimonials
              </button>
            </div>
          </div>

          {/* ===================================================
              SERVICES
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
              Services
            </h4>

            <ul
              className="
                space-y-3.5
                text-[14px]
                leading-6
                text-neutral-600
              "
            >
              <li>Corporate Training</li>

              <li>Motivational Speaking</li>

              <li>Soft Skills Training</li>

              <li>Career Counselling</li>

              <li>Online Mentorship</li>
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
              Connect
            </h4>

            <div
              className="
                space-y-3.5
                text-[14px]
                leading-6
                text-neutral-600
              "
            >
              <p>Instagram: @yourhandle</p>

              <p>
                LinkedIn: linkedin.com/in/yourprofile
              </p>

              <p>Email: your@email.com</p>

              <p>WhatsApp: +91 XXXXXXXXXX</p>
            </div>

            {/* Contact button */}

            <button
              type="button"
              onClick={() =>
                scrollToSection("#contact")
              }
              className="
                mt-8
                rounded-full
                bg-black
                px-6
                py-3
                text-[11px]
                font-medium
                text-white
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:bg-neutral-800
                active:scale-[0.98]
              "
            >
              Get in touch →
            </button>
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

            <p>
              © 2026 Anmol Madan. All Rights Reserved.
            </p>

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

              <span className="text-neutral-200">
                •
              </span>

              <span>Chandigarh, India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}