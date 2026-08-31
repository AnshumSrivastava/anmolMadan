"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { ServiceItem } from "@/types/service";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
};

export default function ServicesModal({ isOpen, onClose, services }: Props) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white dark:bg-black shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/[0.08] p-6 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white sm:text-3xl">
              What I Offer
            </h2>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.04] text-black dark:text-white transition-colors hover:bg-black/[0.08]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content Scroll */}
          <div className="max-h-[70vh] overflow-y-auto p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {services.map((service, idx) => (
                <div
                  key={service.id || idx}
                  className="flex flex-col rounded-2xl border border-black/[0.08] bg-zinc-50 dark:bg-zinc-900 p-6 transition-all hover:border-black/20 hover:bg-white dark:bg-black hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black dark:bg-white text-sm font-bold text-white dark:text-black">
                      0{service.service_number}
                    </span>
                    {service.badge && (
                      <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="mb-3 text-xl font-bold text-black dark:text-white">{service.title}</h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-neutral-400">
                    {service.description}
                  </p>
                  
                  <ul className="mb-6 space-y-2 text-sm text-zinc-700 dark:text-neutral-300">
                    {[service.point_1, service.point_2, service.point_3].map(
                      (point, i) =>
                        point ? (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-black dark:bg-white" />
                            <span>{point}</span>
                          </li>
                        ) : null
                    )}
                  </ul>
                  
                  {service.button_text && (
                    <button
                      onClick={onClose}
                      className="mt-auto w-full rounded-xl bg-black dark:bg-white py-3 text-sm font-semibold text-white dark:text-black transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
                    >
                      {service.button_text}
                    </button>
                  )}
                </div>
              ))}
            </div>
            {services.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-500 dark:text-neutral-400">
                <p>No services currently listed.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
