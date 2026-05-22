import { supabase } from '../../../lib/supabase'
import { getDictionary, Locale } from '../../../dictionaries/getDictionary'

// Отключаем кэш для получения свежих данных из базы
export const dynamic = 'force-dynamic';

type Car = {
  id: string
  brand: string
  model: string
  year: number
  price_per_day: number
  transmission: string
  seats: number
  description_ru: string | null
  description_en: string | null
  description_ka: string | null
  description_uz: string | null
}

export default async function CarsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  
  const dict = await getDictionary(lang);

  const { data: cars, error } = await supabase
    .from('cars')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="text-red-500 text-center py-10">Ошибка загрузки авто: {error.message}</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{dict.navigation?.cars}</h1>
          <a href={`/${lang}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            ← Назад на главную
          </a>
        </div>

        {!cars || cars.length === 0 ? (
          <p className="text-xl text-gray-500 text-center">Автомобилей пока нет.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car: Car) => {
              const description = car[`description_${lang}` as keyof Car] || car.description_ru

              return (
                <div key={car.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  {/* Заголовок карточки с ценой */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{car.brand} {car.model}</h3>
                      <p className="text-gray-500 font-medium">{car.year} год</p>
                    </div>
                    <div className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-lg">
                      ${car.price_per_day} / день
                    </div>
                  </div>
                  
                  {/* Описание */}
                  <p className="text-gray-600 mb-6 flex-grow">{description}</p>
                  
                  {/* Подвал с характеристиками */}
                  <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                      ⚙️ {car.transmission}
                    </span>
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                      👤 {car.seats} мест
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