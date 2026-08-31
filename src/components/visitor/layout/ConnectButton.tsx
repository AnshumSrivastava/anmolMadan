"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { ContactContent, ContactLink } from "@/types/contact";
import { renderContactIcon } from "@/components/shared/ContactIcons";

interface ConnectButtonProps {
  content: ContactContent | null;
  links?: ContactLink[];
}

export default function ConnectButton({ content, links = [] }: ConnectButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!content && links.length === 0) return null;

  // Fallback links if no database links exist
  const defaultLinks = content ? [
    {
      id: "email",
      label: content.email,
      iconName: "Mail",
      href: `mailto:${content.email}`,
      show: !!content.email,
    },
    {
      id: "whatsapp",
      label: content.whatsapp,
      iconName: "MessageCircle",
      href: `https://wa.me/${content.whatsapp?.replace(/\D/g, "")}`,
      show: !!content.whatsapp,
    },
    {
      id: "phone",
      label: content.phone,
      iconName: "Phone",
      href: content.phone ? `tel:${content.phone}` : undefined,
      show: !!content.phone,
    },
    {
      id: "booking",
      label: (() => {
        if (!content.booking_link) return "Book a meet";
        try {
          return new URL(content.booking_link).hostname.replace("www.", "");
        } catch {
          return content.booking_link.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0] || "Book a meet";
        }
      })(),
      iconName: "Calendar",
      href: content.booking_link,
      show: !!content.booking_link,
    },
    {
      id: "linkedin",
      label: content.linkedin?.replace("https://linkedin.com/in/", "").replace("https://www.linkedin.com/in/", "").replace(/\/$/, "") || "LinkedIn",
      iconName: "Linkedin",
      href: content.linkedin,
      show: !!content.linkedin,
    },
    {
      id: "instagram",
      label: content.instagram?.replace("https://instagram.com/", "").replace("https://www.instagram.com/", "").replace(/\/$/, "") || "Instagram",
      iconName: "Instagram",
      href: content.instagram || undefined,
      show: !!content.instagram,
    },
  ].filter(link => link.show) : [];

  const displayLinks = links.length > 0
    ? links.map((link) => ({
        id: link.id,
        label: link.label,
        href: link.url,
        iconName: link.icon_name,
      }))
    : defaultLinks;

  return (
    <div className="fixed bottom-8 right-8 z-[140] font-sans flex items-center gap-4" ref={menuRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-16 right-0 mb-2 w-64 rounded-2xl bg-white dark:bg-black p-2 shadow-[0_10px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/5 dark:ring-white/10"
          >
            <div className="flex flex-col gap-1">
              {displayLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.href?.startsWith("mailto:") || link.href?.startsWith("tel:") ? undefined : "_blank"}
                  rel={link.href?.startsWith("mailto:") || link.href?.startsWith("tel:") ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors hover:bg-neutral-100 dark:bg-neutral-800 hover:text-black dark:text-white"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white">
                    {renderContactIcon(link.iconName, { size: 16 })}
                  </span>
                  <span className="truncate">{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 min-w-[56px] items-center justify-center rounded-full bg-black text-white shadow-lg outline-none transition-shadow hover:shadow-xl cursor-pointer"
        aria-label="Connect options"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center px-6"
            >
              <span className="text-sm font-semibold tracking-wider">Connect</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
