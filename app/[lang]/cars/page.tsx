import { supabase } from '../../../lib/supabase'
import { getDictionary, Locale } from '../../../dictionaries/getDictionary'

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
  image_url: string | null // <-- Добавили поле
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
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{dict.navigation?.cars}</h1>
          <a href={`/${lang}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            ← Назад на главную
          </a>
        </div>

        {!cars || cars.length === 0 ? (
          <p className="text-xl text-gray-500 text-center">Automobiles пока нет.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car: Car) => {
              const description = car[`description_${lang}` as keyof Car] || car.description_ru

              return (
                <div key={car.id} className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                  
                  {/* Изображение авто */}
                  <div className="h-52 w-full relative overflow-hidden bg-gray-100">
                    {car.image_url ? (
                      <img 
                        src={car.image_url} 
                        alt={`${car.brand} ${car.model}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Нет фото</div>
                    )}
                    
                    {/* Цена (Glassmorphism) */}
                    <div className="absolute bottom-4 right-4 bg-blue-600/90 backdrop-blur-md text-white font-bold text-sm px-4 py-1.5 rounded-xl shadow-sm">
                      ${car.price_per_day} / день
                    </div>
                  </div>

                  {/* Контент */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{car.brand} {car.model}</h3>
                      <span className="text-sm text-gray-400 font-medium">{car.year} г.</span>
                    </div>
                    
                    <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">{description}</p>
                    
                    {/* Характеристики */}
                    <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                        ⚙️ {car.transmission}
                      </span>
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                        👤 {car.seats} мест
                      </span>
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