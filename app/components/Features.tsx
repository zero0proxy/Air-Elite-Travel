import { getDictionary, Locale } from '../../dictionaries/getDictionary'

export default async function Features({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)

  const features = [
    { icon: '🚗', title: dict.features?.f1_title, desc: dict.features?.f1_desc },
    { icon: '👨‍💻', title: dict.features?.f2_title, desc: dict.features?.f2_desc },
    { icon: '💎', title: dict.features?.f3_title, desc: dict.features?.f3_desc },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center tracking-tight">
          {dict.features?.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className="text-center p-8 rounded-3xl bg-gray-50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl mb-6">{f.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}