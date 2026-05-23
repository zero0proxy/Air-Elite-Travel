import { getDictionary, Locale } from '../../dictionaries/getDictionary'

export default async function Features({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)

  const features = [
    { icon: '🚗', title: dict.features?.f1_title, desc: dict.features?.f1_desc },
    { icon: '💎', title: dict.features?.f3_title, desc: dict.features?.f3_desc },
    { icon: '👨‍💻', title: dict.features?.f2_title, desc: dict.features?.f2_desc },
  ]

  return (
    // Отрицательный отступ (-mt-24) поднимает этот блок прямо поверх Hero-видео
    <section className="relative z-30 -mt-24 max-w-[1400px] mx-auto px-6 mb-20">
      <div className="bg-white/85 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-[2rem] p-8 md:p-12 border border-white/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-gray-200">
          {features.map((f, i) => (
            <div key={i} className={`flex items-start gap-5 ${i !== 0 ? 'md:pl-10' : ''} ${i !== 2 ? 'md:pr-10' : ''}`}>
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                {f.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}