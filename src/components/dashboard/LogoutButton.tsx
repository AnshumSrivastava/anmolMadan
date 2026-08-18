"use client";

import { signOut } from "@/actions/auth";

export default function LogoutButton() {
  return (
    <button
      onClick={async () => await signOut()}
      className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
    >
      Logout
    </button>
  );
}