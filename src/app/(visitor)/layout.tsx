import Navbar from "@/components/visitor/layout/Navbar";
import Footer from "@/components/visitor/layout/Footer";
import ScrollProgress from "@/components/visitor/layout/ScrollProgress";

import "@/styles/visitor.css";

export default function VisitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="visitor-layout">
      <ScrollProgress />
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}