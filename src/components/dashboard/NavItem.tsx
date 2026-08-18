"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
  href: string;
  label: string;
};

export default function NavItem({
  href,
  label,
}: NavItemProps) {
  const pathname = usePathname();

  const active =
    pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`group relative flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
        active
          ? "bg-white text-black shadow-lg"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      {label}

      {active && (
        <span className="absolute left-0 top-2 h-8 w-1 rounded-r-full bg-black" />
      )}
    </Link>
  );
}