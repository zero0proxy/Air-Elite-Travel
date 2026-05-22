import { supabase } from '../../../lib/supabase'
import { getDictionary, Locale } from '../../../dictionaries/getDictionary'

// Отключаем кэш, чтобы клиент всегда видел свежие цены и маршруты
export const dynamic = 'force-dynamic';

type Transfer = {
  id: string
  route_ru: string
  route_en: string | null
  route_ka: string | null
  route_uz: string | null
  car_class: string
  passengers_limit: number
  price: number
  description_ru: string | null
  description_en: string | null
  description_ka: string | null
  description_uz: string | null
}

export default async function TransfersPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  
  const dict = await getDictionary(lang);

  const { data: transfers, error } = await supabase
    .from('transfers')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="text-red-500 text-center py-10">Ошибка загрузки трансферов: {error.message}</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{dict.navigation?.transfers}</h1>
          <a href={`/${lang}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            ← Назад на главную
          </a>
        </div>

        {!transfers || transfers.length === 0 ? (
          <p className="text-xl text-gray-500 text-center">Трансферов пока нет.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transfers.map((transfer: Transfer) => {
              const route = transfer[`route_${lang}` as keyof Transfer] || transfer.route_ru
              const description = transfer[`description_${lang}` as keyof Transfer] || transfer.description_ru

              return (
                <div key={transfer.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  
                  {/* Заголовок карточки с ценой */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight pr-4">{route}</h3>
                    <div className="bg-green-50 text-green-700 font-bold px-3 py-1 rounded-lg whitespace-nowrap">
                      ${transfer.price}
                    </div>
                  </div>
                  
                  {/* Описание */}
                  <p className="text-gray-600 mb-6 flex-grow">{description}</p>
                  
                  {/* Подвал с характеристиками */}
                  <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-md flex items-center">
                      🚗 {transfer.car_class}
                    </span>
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-md flex items-center">
                      👥 до {transfer.passengers_limit} чел.
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}