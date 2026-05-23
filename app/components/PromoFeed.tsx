import { supabase } from '../../lib/supabase'
import { getDictionary, Locale } from '../../dictionaries/getDictionary'
import BookingButton from './BookingButton'

export const dynamic = 'force-dynamic';

export default async function PromoFeed({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)

  const { data: promos, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error || !promos || promos.length === 0) return null;

  return (
    // УБРАЛИ bg-white, чтобы работал глобальный фон
    <section className="py-24 bg-transparent relative z-10">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="mb-14 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase">
            Эксклюзивно <span className="text-red-500">Для вас</span>
          </h2>
          <div className="w-24 h-1.5 bg-red-500 rounded-full mb-4"></div>
          <p className="text-gray-500 text-lg max-w-2xl">
            Специальные предложения от наших партнеров: отели, рестораны и развлечения.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promos.map((promo) => {
            const title = promo[`title_${lang}`] || promo.title_ru
            const description = promo[`description_${lang}`] || promo.description_ru

            return (
              <div key={promo.id} className="group relative rounded-[2rem] overflow-hidden shadow-lg h-[400px] flex flex-col justify-end">
                {promo.image_url ? (
                  <img src={promo.image_url} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 z-0" />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 z-0">Нет фото</div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10"></div>

                {promo.discount_percentage && (
                  <div className="absolute top-6 left-6 bg-red-600 text-white font-black text-lg px-4 py-2 rounded-xl shadow-lg transform -rotate-2 z-20">
                    -{promo.discount_percentage}%
                  </div>
                )}

                {/* Контент и Кнопка */}
                <div className="relative z-20 p-8 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2 mb-6">{description}</p>
                  
                  {/* Новая кнопка активации акции */}
                  <div className="w-full">
                     <BookingButton 
                        serviceType="promo" 
                        serviceTitle={`Акция: ${title}`} 
                        buttonText="Забрать предложение" 
                     />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}