import { Locale } from "../../dictionaries/getDictionary";
import Hero from "../components/Hero";
import HotCars from "../components/HotCars";
import PromoFeed from "../components/PromoFeed";
import AboutSection from "../components/AboutSection";
import Testimonials from "../components/Testimonials";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* 1. Эмоциональный захват: Чистое видео без лишних блоков */}
      <Hero lang={lang} />
      
      {/* 2. Сразу показываем товар лицом */}
      <HotCars lang={lang} />
      
      {/* 3. Горящие акции от партнеров */}
      <PromoFeed lang={lang} />
      
      {/* 4. Массивный блок доверия: О нас + Статистика + Преимущества */}
      <AboutSection lang={lang} />
      
      {/* 5. Отзывы */}
      <div className="bg-gray-50 border-t border-gray-100">
        <Testimonials lang={lang} />
      </div>
    </main>
  );
}