import { Locale } from "../../dictionaries/getDictionary";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HotCars from "../components/HotCars";
import PromoFeed from "../components/PromoFeed";
import Testimonials from "../components/Testimonials";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* 1. Главный экран (Видео на весь экран) */}
      <Hero lang={lang} />
      
      {/* 2. Блок преимуществ (Белый фон) */}
      <Features lang={lang} />

      {/* 3. Премиум Автопарк (Серый фон, чтобы отбить от белых блоков) */}
      <HotCars lang={lang} />
      
      {/* 4. Акции партнеров (Снова белый фон) */}
      <PromoFeed lang={lang} />
      
      {/* 5. Отзывы (Серый фон) */}
      <div className="bg-gray-50">
        <Testimonials lang={lang} />
      </div>
    </main>
  );
}