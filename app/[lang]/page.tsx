import { Locale } from "../../dictionaries/getDictionary";
import Hero from "../components/Hero";
import HotTours from "../components/HotTours";
import HotCars from "../components/HotCars";
import PromoFeed from "../components/PromoFeed";
import AboutSection from "../components/AboutSection";
import Testimonials from "../components/Testimonials";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Hero lang={lang} />
      
      {/* 1. Эмоция: Туры сразу после видео */}
      <HotTours lang={lang} />

      {/* 2. Логистика: Автопарк (на сером фоне для визуального разрыва) */}
      <HotCars lang={lang} />
      
      {/* 3. Выгода: Акции */}
      <PromoFeed lang={lang} />
      
      {/* 4. Доверие: О компании и статистика */}
      <AboutSection lang={lang} />
      
      {/* 5. Отзывы */}
      <div className="bg-gray-50 border-t border-gray-100">
        <Testimonials lang={lang} />
      </div>
    </main>
  );
}