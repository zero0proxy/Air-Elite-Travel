import { getDictionary, Locale } from '../../dictionaries/getDictionary'

export default async function Testimonials({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)

  const reviews = [
    { name: "Анна С.", text: "Брали двухдневный тур в Казбеги. Организация на высшем уровне, гид просто супер! Обязательно вернемся.", rating: "⭐⭐⭐⭐⭐" },
    { name: "Михаил В.", text: "Арендовали авто для поездки по Грузии. Машина в идеальном состоянии, никаких проблем с оформлением.", rating: "⭐⭐⭐⭐⭐" },
    { name: "Елена и Максим", text: "Заказывали трансфер из аэропорта. Водитель встретил с табличкой, помог с багажом. Очень комфортно и безопасно.", rating: "⭐⭐⭐⭐⭐" }
  ]

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center tracking-tight">
          {dict.testimonials?.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-3xl flex flex-col h-full">
              <div className="text-sm mb-6">{r.rating}</div>
              <p className="text-gray-700 italic mb-8 flex-grow leading-relaxed">«{r.text}»</p>
              <div className="font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  {r.name.charAt(0)}
                </div>
                {r.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}