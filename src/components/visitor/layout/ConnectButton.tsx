"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Calendar, MessageCircle, X, Link as LinkIcon } from "lucide-react";
import type { ContactContent } from "@/types/contact";

interface ConnectButtonProps {
  content: ContactContent | null;
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export default function ConnectButton({ content }: ConnectButtonProps) {
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

  if (!content) return null;

  const links = [
    {
      id: "email",
      label: content.email,
      icon: <Mail size={18} />,
      href: `mailto:${content.email}`,
      show: !!content.email,
    },
    {
      id: "whatsapp",
      label: content.whatsapp,
      icon: <MessageCircle size={18} />,
      href: `https://wa.me/${content.whatsapp.replace(/\D/g, "")}`,
      show: !!content.whatsapp,
    },
    {
      id: "phone",
      label: content.phone,
      icon: <Phone size={18} />,
      href: content.phone ? `tel:${content.phone}` : undefined,
      show: !!content.phone,
    },
    {
      id: "booking",
      label: (() => {
        if (!content.booking_link) return "Book a meet";
        try {
          return new URL(content.booking_link).hostname.replace('www.', '');
        } catch {
          return content.booking_link.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0] || "Book a meet";
        }
      })(),
      icon: <Calendar size={18} />,
      href: content.booking_link,
      show: !!content.booking_link,
    },
    {
      id: "linkedin",
      label: content.linkedin.replace("https://linkedin.com/in/", "").replace("https://www.linkedin.com/in/", "").replace(/\/$/, ""),
      icon: <LinkedinIcon size={18} />,
      href: content.linkedin,
      show: !!content.linkedin,
    },
    {
      id: "instagram",
      label: content.instagram?.replace("https://instagram.com/", "").replace("https://www.instagram.com/", "").replace(/\/$/, ""),
      icon: <InstagramIcon size={18} />,
      href: content.instagram || undefined,
      show: !!content.instagram,
    },
  ].filter(link => link.show);

  return (
    <div className="fixed bottom-6 right-6 z-[140] font-sans" ref={menuRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-16 right-0 mb-2 w-64 rounded-2xl bg-white p-2 shadow-[0_10px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
          >
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-black">
                    {link.icon}
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
        className="flex h-14 min-w-[56px] items-center justify-center rounded-full bg-black text-white shadow-lg outline-none transition-shadow hover:shadow-xl"
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
