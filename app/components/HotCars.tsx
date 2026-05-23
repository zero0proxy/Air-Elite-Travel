import { supabase } from '../../lib/supabase'
import { getDictionary, Locale } from '../../dictionaries/getDictionary'
import BookingButton from './BookingButton'

export const dynamic = 'force-dynamic';

export default async function HotCars({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)

  const { data: cars, error } = await supabase
    .from('cars')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(4)

  if (error || !cars || cars.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="flex justify-between items-end mb-14">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase">
              Премиум Автопарк
            </h2>
            <div className="w-24 h-1.5 bg-gray-900 rounded-full"></div>
          </div>
          <a href={`/${lang}/cars`} className="hidden md:flex group text-gray-900 font-bold items-center gap-2 text-lg">
            Смотреть все <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => {
            const fullName = `${car.brand} ${car.model}`

            return (
              <div key={car.id} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-gray-100 group flex flex-col">
                <a href={`/${lang}/cars`} className="block">
                  <div className="h-56 w-full relative overflow-hidden bg-gray-100 cursor-pointer">
                    {car.image_url ? (
                      <img src={car.image_url} alt={fullName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Нет фото</div>
                    )}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white font-bold text-sm px-4 py-1.5 rounded-full shadow-sm">
                      ${car.price_per_day} / день
                    </div>
                  </div>
                </a>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{fullName}</h3>
                    <span className="text-sm text-gray-400 font-medium ml-2 shrink-0">{car.year}</span>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50 flex flex-col gap-3">
                    <div className="flex gap-2 mb-2">
                      <span className="text-xs font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">⚙️ {car.transmission}</span>
                      <span className="text-xs font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">👤 {car.seats}</span>
                    </div>

                    {/* ПЕРЕДАЕМ БАЗОВУЮ ЦЕНУ */}
                    <BookingButton 
                      serviceType="car" 
                      serviceTitle={fullName} 
                      basePrice={car.price_per_day}
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