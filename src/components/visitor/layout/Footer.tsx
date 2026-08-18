"use client";

const scrollToSection = (id: string) => {
  const section = document.querySelector(id);

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-6 text-xl font-bold tracking-[0.25em]">
              ANMOL
            </h3>

            <div className="space-y-3 text-sm leading-7 text-neutral-600">
              <p>Cybersecurity Trainer</p>
              <p>Motivational Speaker</p>
              <p>Based in Chandigarh, India</p>
              <p>Available Pan-India & Online</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
  <h4 className="mb-6 text-sm font-semibold uppercase tracking-[0.25em]">
    Quick Links
  </h4>

  <div className="flex flex-col gap-3 text-sm text-neutral-600">
    <button
      onClick={() => scrollToSection("#hero")}
      className="text-left transition hover:text-black"
    >
      Home
    </button>

    <button
      onClick={() => scrollToSection("#about")}
      className="text-left transition hover:text-black"
    >
      About
    </button>

    <button
      onClick={() => scrollToSection("#services")}
      className="text-left transition hover:text-black"
    >
      Services
    </button>

    <button
      onClick={() => scrollToSection("#timeline")}
      className="text-left transition hover:text-black"
    >
      Timeline
    </button>

    <button
      onClick={() => scrollToSection("#projects")}
      className="text-left transition hover:text-black"
    >
      Projects
    </button>

    <button
      onClick={() => scrollToSection("#testimonials")}
      className="text-left transition hover:text-black"
    >
      Testimonials
    </button>

    <button
      onClick={() => scrollToSection("#companies")}
      className="text-left transition hover:text-black"
    >
      Companies
    </button>

    <button
      onClick={() => scrollToSection("#gallery")}
      className="text-left transition hover:text-black"
    >
      Gallery
    </button>

    <button
      onClick={() => scrollToSection("#contact")}
      className="text-left transition hover:text-black"
    >
      Contact
    </button>
  </div>
</div>
          {/* Services */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-[0.25em]">
              Services
            </h4>

            <ul className="space-y-3 text-sm text-neutral-600">
              <li>Corporate Training</li>
              <li>Motivational Speaking</li>
              <li>Soft Skills Training</li>
              <li>Career Counselling</li>
              <li>Online Mentorship</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-[0.25em]">
              Connect
            </h4>

            <div className="space-y-3 text-sm text-neutral-600">
              <p>Instagram: @yourhandle</p>
              <p>LinkedIn: linkedin.com/in/yourprofile</p>
              <p>Email: your@email.com</p>
              <p>WhatsApp: +91 XXXXXXXXXX</p>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-black/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-neutral-500 md:flex-row">
            <p>© 2026 Anmol Madan. All Rights Reserved.</p>

            <div className="flex flex-wrap items-center gap-3">
              <span>anmolmadan.in</span>
              <span className="hidden md:block">•</span>
              <span>Chandigarh, India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}