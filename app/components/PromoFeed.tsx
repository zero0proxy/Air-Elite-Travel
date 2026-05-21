import { supabase } from '../../lib/supabase'
import { Locale } from '../../dictionaries/getDictionary'

// Описываем, как выглядит строка из нашей базы данных
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
}

export default async function PromoFeed({ lang }: { lang: Locale }) {
  // Запрашиваем только активные акции, дата окончания которых еще не наступила
  const { data: promotions, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('is_active', true)
    .gt('end_date', new Date().toISOString())
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Ошибка загрузки акций:', error)
    return null
  }

  if (!promotions || promotions.length === 0) return null

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Горящие предложения</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo: Promotion) => {
          // Динамически выбираем заголовок в зависимости от языка (с фолбеком на русский)
          const title = promo[`title_${lang}` as keyof Promotion] || promo.title_ru

          return (
            <div key={promo.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              {/* Бейджик со скидкой, если она есть */}
              {promo.discount_value && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {promo.discount_value}
                </div>
              )}
              
              <div className="text-sm text-blue-600 font-medium mb-2">{promo.partner_name}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
              
              {/* Бейджик с местами (для туров) */}
              {promo.type === 'event' && promo.available_slots && (
                <div className="inline-flex items-center text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">
                  🔥 Осталось мест: {promo.available_slots}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}