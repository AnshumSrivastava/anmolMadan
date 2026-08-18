import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header />

        <main className="p-8">

          {children}

        </main>

      </div>

    </div>
  );
}