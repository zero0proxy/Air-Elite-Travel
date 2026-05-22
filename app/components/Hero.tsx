import { getDictionary, Locale } from '../../dictionaries/getDictionary'

export default async function Hero({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)
  
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center text-center px-4 overflow-hidden bg-gray-950">
      <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none">
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/20 to-transparent"></div>
      
      <div className="relative z-20 max-w-5xl mx-auto mt-20">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight drop-shadow-2xl">
          {dict.hero?.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-2xl mx-auto drop-shadow-lg font-medium opacity-90">
          {dict.hero?.subtitle}
        </p>
        <a href={`/${lang}/tours`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-5 px-14 rounded-full transition-all transform hover:scale-105 shadow-2xl inline-block">
          {dict.hero?.cta}
        </a>
      </div>
    </section>
  )
}