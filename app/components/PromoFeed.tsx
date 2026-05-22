import { supabase } from '../../lib/supabase'
import { Locale } from '../../dictionaries/getDictionary'

export const dynamic = 'force-dynamic';

type Promotion = {
  id: string
  partner_name: string
  type: string
  title_ru: string
  title_en: string | null
  title_ka: string | null
  title_uz: string | null
  discount_value: string | null
  available_slots: number | null
  image_url: string | null // <-- Добавили новое поле из базы
}

export default async function PromoFeed({ lang }: { lang: Locale }) {
  const { data: promotions, error } = await supabase
    .from('promotions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="text-red-500 text-center py-10">Ошибка БД: {error.message}</div>
  }

  if (!promotions || promotions.length === 0) return null

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 tracking-tight">
        Горящие предложения
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo: Promotion) => {
          const title = (promo[`title_${lang}` as keyof Promotion] as string) || promo.title_ru

          return (
            <div 
              key={promo.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Блок с фотографией */}
              <div className="h-60 w-full relative overflow-hidden bg-gray-100">
                {promo.image_url ? (
                  <img 
                    src={promo.image_url} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">Нет фото</div>
                )}
                
                {/* Бейджик со скидкой (Glassmorphism) */}
                {promo.discount_value && (
                  <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-md text-white text-sm font-bold px-4 py-2 rounded-2xl shadow-lg">
                    {promo.discount_value}
                  </div>
                )}
              </div>
              
              {/* Текстовый контент */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-sm text-blue-600 font-bold tracking-wider uppercase mb-3">
                  {promo.partner_name}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                  {title}
                </h3>
                
                {promo.type === 'event' && promo.available_slots && (
                  <div className="mt-auto inline-flex items-center text-sm font-medium text-orange-700 bg-orange-50 px-4 py-2 rounded-xl">
                    🔥 Осталось мест: {promo.available_slots}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}