import { getHero } from "@/services/hero/hero.service";
import HeroForm from "@/components/hero/HeroForm";

export default async function HeroPage() {
  const hero = await getHero();

  return <HeroForm hero={hero} />;
}