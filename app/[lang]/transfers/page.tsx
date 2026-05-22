import { supabase } from '../../../lib/supabase'
import { getDictionary, Locale } from '../../../dictionaries/getDictionary'
import BookingButton from '../../components/BookingButton'

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
  image_url: string | null
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
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{dict.navigation?.transfers}</h1>
          <a href={`/${lang}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            ← Назад на главную
          </a>
        </div>

        {!transfers || transfers.length === 0 ? (
          <p className="text-xl text-gray-500 text-center">Трансферов пока нет.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transfers.map((transfer: Transfer) => {
              const route = (transfer[`route_${lang}` as keyof Transfer] as string) || transfer.route_ru
              const description = transfer[`description_${lang}` as keyof Transfer] || transfer.description_ru

              return (
                <div key={transfer.id} className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                  
                  {/* Изображение маршрута */}
                  <div className="h-52 w-full relative overflow-hidden bg-gray-100">
                    {transfer.image_url ? (
                      <img 
                        src={transfer.image_url} 
                        alt={route} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Нет фото</div>
                    )}
                    
                    {/* Цена */}
                    <div className="absolute bottom-4 right-4 bg-green-600/90 backdrop-blur-md text-white font-bold text-sm px-4 py-1.5 rounded-xl shadow-sm">
                      ${transfer.price}
                    </div>
                  </div>

                  {/* Контент */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{route}</h3>
                    <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">{description}</p>
                    
                    {/* Подвал с характеристиками и кнопкой */}
                    <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-3">
                      <div className="flex gap-2">
                        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg flex items-center">
                          🚗 {transfer.car_class}
                        </span>
                        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg flex items-center">
                          👥 до {transfer.passengers_limit} чел.
                        </span>
                      </div>

                      <BookingButton 
                        serviceType="transfer" 
                        serviceTitle={route} 
                      />
                    </div>
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