import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}