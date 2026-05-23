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
    // Добавили bg-slate-50 и relative для позиционирования фоновых элементов
    <main className="relative min-h-screen flex flex-col bg-[#f8fafc] overflow-hidden">
      
      {/* 🔮 ПРЕМИАЛЬНЫЙ ФОН: Ambient Glow (Размытые сферы) */}
      <div className="absolute top-[100vh] left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-300/20 blur-[120px]"></div>
        <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-300/15 blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-sky-200/20 blur-[150px]"></div>
      </div>

      {/* Контент сайта поверх фона (z-10) */}
      <div className="relative z-10 flex flex-col">
        <Hero lang={lang} />
        
        {/* Мы уберем жесткие белые фоны внутри самих компонентов или они будут смотреться как стильные карточки поверх этого фона */}
        <HotTours lang={lang} />
        <HotCars lang={lang} />
        <PromoFeed lang={lang} />
        <AboutSection lang={lang} />
        
        <div className="bg-white/50 backdrop-blur-md border-t border-gray-200">
          <Testimonials lang={lang} />
        </div>
      </div>
    </main>
  );
}