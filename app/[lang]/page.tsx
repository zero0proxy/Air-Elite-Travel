import { Locale } from "../../dictionaries/getDictionary";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HotCars from "../components/HotCars";
import PromoFeed from "../components/PromoFeed";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* 1. Эмоция: Видео на весь экран */}
      <Hero lang={lang} />
      
      {/* 2. Умный блок преимуществ (теперь он висит поверх видео и не занимает лишний скролл) */}
      <Features lang={lang} />

      {/* 3. Главный конверсионный блок сразу на втором экране */}
      <HotCars lang={lang} />
      
      {/* 4. Горящие предложения */}
      <PromoFeed lang={lang} />
      
      {/* 5. Доверие и социальные доказательства */}
      <Stats /> 
      <div className="bg-gray-50 border-t border-gray-100">
        <Testimonials lang={lang} />
      </div>
    </main>
  );
}