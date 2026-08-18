"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signIn(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("USER:", data.user);
  console.log("ERROR:", error);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  redirect("/dashboard");
}