import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/shared/Reveal";

export default function CTA() {
  return (
    <Reveal delay={0.3}>
      <div className="flex justify-center pt-8">
        <Link
          href="#services"
          className="group inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-all duration-500 hover:-translate-y-1 hover:bg-zinc-900 hover:shadow-2xl"
        >
          <span>See What I Offer</span>

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Reveal>
  );
}