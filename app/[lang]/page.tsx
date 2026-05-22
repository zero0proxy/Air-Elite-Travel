import { Locale } from "../../dictionaries/getDictionary";
import PromoFeed from "../components/PromoFeed";
import Hero from "../components/Hero";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Наш новый главный экран */}
      <Hero lang={lang} />
      
      {/* Блок с акциями (немного сдвинем его вниз для "воздуха") */}
      <div className="py-12 relative z-20">
        <PromoFeed lang={lang} />
      </div>
    </main>
  );
}