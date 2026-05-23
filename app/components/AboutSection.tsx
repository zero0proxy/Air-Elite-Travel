import { getDictionary, Locale } from '../../dictionaries/getDictionary'

export default async function AboutSection({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)

  const features = [
    { icon: '🚗', title: dict.features?.f1_title, desc: dict.features?.f1_desc },
    { icon: '💎', title: dict.features?.f3_title, desc: dict.features?.f3_desc },
    { icon: '👨‍💻', title: dict.features?.f2_title, desc: dict.features?.f2_desc },
  ]

  const stats = [
    { label: 'Довольных клиентов', value: '500+' },
    { label: 'Авто в парке', value: '50+' },
    { label: 'Маршрутов', value: '25+' },
    { label: 'Поддержка', value: '24/7' },
  ]

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Верхняя часть: Текст О нас + Статистика */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
          
          {/* Левая колонка: О нас */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-6 uppercase">
              О компании <span className="text-blue-600">Air Elite</span>
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Мы — премиальный туристический агрегатор в Грузии. Наша миссия — предоставить сервис бескомпромиссного качества для тех, кто ценит комфорт, безопасность и свое время.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              От аренды эксклюзивных автомобилей до организации авторских туров и VIP-трансферов. Мы контролируем каждый этап вашего путешествия, чтобы вы могли просто расслабиться и наслаждаться отдыхом.
            </p>
          </div>
          
          {/* Правая колонка: Статистика 2x2 */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-500 font-bold uppercase tracking-wider text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Нижняя часть: Те самые 3 карточки преимуществ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white border border-gray-100 p-8 rounded-[2rem] hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}