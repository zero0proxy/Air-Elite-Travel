import { supabase } from '../../lib/supabase'
import { getDictionary, Locale } from '../../dictionaries/getDictionary'
import BookingButton from './BookingButton'

export const dynamic = 'force-dynamic';

type Car = {
  id: string
  brand: string
  model: string
  year: number
  price_per_day: number
  transmission: string
  seats: number
  image_url: string | null
}

export default async function HotCars({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)

  // Берем только 3 автомобиля для витрины главной страницы
  const { data: cars, error } = await supabase
    .from('cars')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (error || !cars || cars.length === 0) {
    return null; // Если авто нет или ошибка, просто не показываем блок
  }

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
              Премиум Автопарк
            </h2>
            <p className="text-gray-500">Автомобили для любого маршрута</p>
          </div>
          <a href={`/${lang}/cars`} className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-2 transition-colors">
            Все авто <span>→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cars.map((car: Car) => {
            const fullName = `${car.brand} ${car.model}`

            return (
              <div key={car.id} className="bg-gray-50 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                
                <a href={`/${lang}/cars`} className="block">
                  <div className="h-52 w-full relative overflow-hidden bg-gray-200 cursor-pointer">
                    {car.image_url ? (
                      <img 
                        src={car.image_url} 
                        alt={fullName} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Нет фото</div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-blue-600/90 backdrop-blur-md text-white font-bold text-sm px-4 py-1.5 rounded-xl shadow-sm">
                      ${car.price_per_day} / день
                    </div>
                  </div>
                </a>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{fullName}</h3>
                    <span className="text-sm text-gray-400 font-medium">{car.year} г.</span>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-200 flex flex-col gap-3">
                    <div className="flex gap-2">
                      <span className="text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
                        ⚙️ {car.transmission}
                      </span>
                      <span className="text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
                        👤 {car.seats} мест
                      </span>
                    </div>

                    <BookingButton 
                      serviceType="car" 
                      serviceTitle={fullName} 
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