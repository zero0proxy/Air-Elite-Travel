import { getDictionary, Locale } from '../../dictionaries/getDictionary'

export default async function AboutSection({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)

  const stats = [
    { label: 'Довольных клиентов', value: '500+' },
    { label: 'Авто в парке', value: '50+' },
    { label: 'Маршрутов', value: '25+' },
    { label: 'Поддержка', value: '24/7' },
  ]

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* ВЕРХНЯЯ ЧАСТЬ: О компании + Статистика */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-6 uppercase">
              О компании <span className="text-blue-600">Air Elite</span>
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6 font-medium">
              Мы — премиальный туристический агрегатор в Грузии. Наша миссия — предоставить сервис бескомпромиссного качества для тех, кто ценит комфорт, безопасность и свое время.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              От аренды эксклюзивных автомобилей до организации авторских туров и VIP-трансферов. Мы контролируем каждый этап вашего путешествия.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-lg p-8 rounded-[2rem] border border-white text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.1)] transition-all">
                <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* НИЖНЯЯ ЧАСТЬ: Мега-крутые карточки преимуществ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Декоративное свечение на фоне карточек (Ambient Glow) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-400/10 blur-[100px] rounded-full z-0 pointer-events-none"></div>

          {/* Карточка 1: Автопарк */}
          <div className="group relative z-10 bg-white/40 backdrop-blur-2xl border border-white/60 p-10 rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            {/* Анимированный декоративный угол */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent opacity-50 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-700"></div>
            
            {/* Строгая SVG Иконка (Молния/Динамика) */}
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-500 border border-blue-50">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Премиальный автопарк</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Только новые модели 2023-2024 годов. Идеальное техническое состояние, максимальные комплектации и полная страховка без скрытых условий.
            </p>
          </div>

          {/* Карточка 2: Отзывы */}
          <div className="group relative z-10 bg-white/40 backdrop-blur-2xl border border-white/60 p-10 rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent opacity-50 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-700"></div>
            
            {/* Строгая SVG Иконка (Щит с галочкой/Надежность) */}
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-500 border border-blue-50">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Честные Отзывы</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Наша репутация — наш главный актив. Мы гордимся сотнями реальных отзывов от клиентов, которые доверили нам свой отдых в Грузии и остались в восторге.
            </p>
          </div>

          {/* Карточка 3: Поддержка */}
          <div className="group relative z-10 bg-white/40 backdrop-blur-2xl border border-white/60 p-10 rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent opacity-50 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-700"></div>
            
            {/* Строгая SVG Иконка (Радар/Круглосуточность) */}
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-500 border border-blue-50">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Поддержка 24/7</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Личный консьерж на связи в любое время дня и ночи. Мы решаем любые вопросы от изменения маршрута до бронирования столика в лучшем ресторане.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}