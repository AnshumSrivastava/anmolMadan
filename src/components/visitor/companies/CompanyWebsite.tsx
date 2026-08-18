import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CompanyWebsiteProps = {
  website: string | null;
};

export default function CompanyWebsite({
  website,
}: CompanyWebsiteProps) {
  if (!website) return null;

  return (
    <Link
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors duration-300 hover:text-white"
    >
      <span>Visit Website</span>
      <ArrowUpRight size={16} />
    </Link>
  );
}