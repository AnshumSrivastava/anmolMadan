"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import type { ContactContent, ContactLink } from "@/types/contact";
import { renderContactIcon } from "@/components/shared/ContactIcons";
import CalButton from "@/components/shared/CalButton";

interface ConnectButtonProps {
  content: ContactContent | null;
  links?: ContactLink[];
}

export default function ConnectButton({
  content,
  links = [],
}: ConnectButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* =========================================================
     CLOSE WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
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

  /* =========================================================
     FALLBACK LINKS
  ========================================================= */

  const defaultLinks = content
    ? [
        {
          id: "email",
          label: content.email,
          iconName: "Mail",
          href: content.email
            ? `mailto:${content.email}`
            : undefined,
          show: !!content.email,
        },

        {
          id: "whatsapp",
          label: content.whatsapp,
          iconName: "MessageCircle",
          href: content.whatsapp
            ? `https://wa.me/${content.whatsapp.replace(/\D/g, "")}`
            : undefined,
          show: !!content.whatsapp,
        },

        {
          id: "phone",
          label: content.phone,
          iconName: "Phone",
          href: content.phone
            ? `tel:${content.phone}`
            : undefined,
          show: !!content.phone,
        },

        {
          id: "booking",
          label: "Book a call",
          iconName: "Calendar",
          href: content.booking_link,
          show: !!content.booking_link,
        },

        {
          id: "linkedin",
          label: "LinkedIn",
          iconName: "Linkedin",
          href: content.linkedin,
          show: !!content.linkedin,
        },

        {
          id: "instagram",
          label: "Instagram",
          iconName: "Instagram",
          href: content.instagram || "https://www.instagram.com/anmolxmadan/",
          show: true,
        },
      ].filter((link) => link.show)
    : [];

  /* =========================================================
     DISPLAY LINKS
  ========================================================= */

  const customLinks =
    links.length > 0
      ? links.map((link) => ({
          id: link.id,
          label:
            link.icon_name?.toLowerCase() === "linkedin"
              ? "LinkedIn"
              : link.label,
          href: link.url,
          iconName: link.icon_name,
        }))
      : [];

  const hasInstagram = customLinks.some(
    (link) =>
      link.id?.toLowerCase() === "instagram" ||
      link.iconName?.toLowerCase() === "instagram"
  );

  const displayLinks =
    links.length > 0
      ? [
          ...customLinks,
          ...(!hasInstagram
            ? [
                {
                  id: "instagram",
                  label: "Instagram",
                  href:
                    content?.instagram ||
                    "https://www.instagram.com/anmolxmadan/",
                  iconName: "Instagram",
                },
              ]
            : []),
        ]
      : defaultLinks;

  /* =========================================================
     CHECK BOOKING LINK
  ========================================================= */

  const isBookingLink = (link: {
    id: string;
    label?: string | null;
    href?: string;
    iconName?: string;
  }) => {
    const id = link.id?.toLowerCase() || "";
    const label = link.label?.toLowerCase() || "";
    const icon = link.iconName?.toLowerCase() || "";
    const href = link.href?.toLowerCase() || "";

    return (
      id === "booking" ||
      id.includes("booking") ||
      label.includes("book a call") ||
      label.includes("book a meet") ||
      label.includes("booking") ||
      icon === "calendar" ||
      href.includes("cal.com")
    );
  };

  return (
    <>
      {/* =====================================================
          CONNECT BUTTON + MENU
      ===================================================== */}

      <div
        ref={menuRef}
        className="
          fixed
          bottom-8
          right-8
          z-[140]
          flex
          items-center
          gap-4
          font-sans
        "
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 10,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="
                absolute
                bottom-16
                right-0
                mb-2
                w-64
                rounded-2xl
                bg-white
                p-2
                shadow-[0_10px_40px_rgba(0,0,0,0.15)]
                ring-1
                ring-black/5
                dark:bg-black
                dark:ring-white/10
              "
            >
              <div className="flex flex-col gap-1">
                {displayLinks.map((link) => {
                  const booking = isBookingLink(link);

                  /* =================================================
                     BOOK A CALL

                     DO NOT CLOSE CONNECT MENU HERE.
                     CalButton needs to remain mounted.
                  ================================================= */

                    if (booking) {
                    return (
                      <CalButton
                        key={link.id}
                        onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.stopPropagation()}
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => event.stopPropagation()}
                        className="
                          flex
                          w-full
                          items-center
                          gap-3
                          rounded-xl
                          px-3
                          py-2.5
                          text-left
                          text-sm
                          font-medium
                          text-neutral-700
                          transition-colors
                          hover:bg-neutral-100
                          hover:text-black
                          dark:text-neutral-300
                          dark:hover:bg-neutral-800
                          dark:hover:text-white
                        "
                      >
                        <span
                          className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-neutral-100
                            text-black
                            dark:bg-neutral-800
                            dark:text-white
                          "
                        >
                          {renderContactIcon("Calendar", {
                            size: 16,
                          })}
                        </span>

                        <span className="truncate">
                          Book a call
                        </span>
                      </CalButton>
                    );
                  }

                  /* =================================================
                     NORMAL CONTACT LINK
                  ================================================= */

                  const isSpecialLink =
                    link.href?.startsWith("mailto:") ||
                    link.href?.startsWith("tel:");

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target={
                        isSpecialLink ? undefined : "_blank"
                      }
                      rel={
                        isSpecialLink
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        font-medium
                        text-neutral-700
                        transition-colors
                        hover:bg-neutral-100
                        hover:text-black
                        dark:text-neutral-300
                        dark:hover:bg-neutral-800
                        dark:hover:text-white
                      "
                    >
                      <span
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-neutral-100
                          text-black
                          dark:bg-neutral-800
                          dark:text-white
                        "
                      >
                        {renderContactIcon(link.iconName, {
                          size: 16,
                        })}
                      </span>

                      <span className="truncate">
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================
            CONNECT BUTTON
        ===================================================== */}

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            flex
            h-14
            min-w-[56px]
            cursor-pointer
            items-center
            justify-center
            rounded-full
            bg-black
            text-white
            shadow-lg
            outline-none
            transition-shadow
            hover:shadow-xl
          "
          aria-label={
            isOpen
              ? "Close connect options"
              : "Open connect options"
          }
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{
                  rotate: -90,
                  opacity: 0,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                }}
                exit={{
                  rotate: 90,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{
                  rotate: 90,
                  opacity: 0,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                }}
                exit={{
                  rotate: -90,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  flex
                  items-center
                  justify-center
                  px-6
                "
              >
                <span className="text-sm font-semibold tracking-wider">
                  Connect
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}