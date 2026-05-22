import { Locale } from "../../dictionaries/getDictionary";
import PromoFeed from "../components/PromoFeed";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Hero lang={lang} />
      
      <Features lang={lang} />
      
      <div className="py-24 bg-gray-50">
        <PromoFeed lang={lang} />
      </div>
      
      <Testimonials lang={lang} />
    </main>
  );
}