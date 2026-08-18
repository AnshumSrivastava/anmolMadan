import { getFAQs } from "@/services/faq/faq.service";
import FAQ from "@/components/faq";

export default async function FAQPage() {
  const faqs = await getFAQs();

  return <FAQ faqs={faqs} />;
}