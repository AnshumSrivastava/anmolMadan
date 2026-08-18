"use client";

import { useState } from "react";
import { signIn } from "@/actions/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await signIn(email, password);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="flex w-[380px] flex-col gap-4 rounded-xl border p-8"
      >
        <h1 className="text-3xl font-bold">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="rounded-lg bg-black p-3 text-white"
        >
          Login
        </button>
      </form>

    </main>
  );
}