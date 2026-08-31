"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="max-w-4xl"
    >
      <span className="inline-flex rounded-full border border-zinc-300 dark:border-neutral-700 bg-zinc-100 dark:bg-neutral-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-700 dark:text-neutral-300">
        Section 06 • Contact & Booking
      </span>

      <h2 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-black dark:text-white md:text-6xl">
        Let's Make Your Next
        <br />
        Session Unforgettable.
      </h2>

      <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-neutral-400">
        Whether you're looking for a corporate cybersecurity session,
        a college motivational talk, or a one-on-one consultation,
        I'd love to hear about your goals and explore how we can work
        together.
      </p>
    </motion.div>
  );
}