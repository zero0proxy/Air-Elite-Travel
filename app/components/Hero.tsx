import { getDictionary, Locale } from '../../dictionaries/getDictionary'

export default async function Hero({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)
  
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
      {/* Фоновое видео */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="hero.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      
      {/* Темный градиент-оверлей для читаемости текста */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/40 to-gray-50"></div>
      
      {/* Текстовый контент */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-16">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
          {dict.hero?.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl drop-shadow-md leading-relaxed">
          {dict.hero?.subtitle}
        </p>
        <a 
          href={`/${lang}/tours`}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
        >
          {dict.hero?.cta}
        </a>
      </div>
    </section>
  )
}