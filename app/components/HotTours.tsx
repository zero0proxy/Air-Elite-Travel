import { supabase } from '../../lib/supabase'
import { getDictionary, Locale } from '../../dictionaries/getDictionary'
import BookingButton from './BookingButton'

export const dynamic = 'force-dynamic';

export default async function HotTours({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)

  // Берем до 8 туров
  const { data: tours, error } = await supabase
    .from('tours')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8)

  if (error || !tours || tours.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="flex justify-between items-end mb-14">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase">
              Авторские <span className="text-blue-600">Туры</span>
            </h2>
            <div className="w-24 h-1.5 bg-blue-600 rounded-full"></div>
            <p className="mt-4 text-gray-500 font-medium max-w-xl">Погрузитесь в настоящую Грузию с нашими эксклюзивными маршрутами и профессиональными гидами.</p>
          </div>
          <a href={`/${lang}/tours`} className="hidden md:flex group text-blue-600 font-bold items-center gap-2 text-lg">
            Все туры <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => {
            const title = tour[`title_${lang}`] || tour.title_ru

            return (
              <div key={tour.id} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-gray-100 group flex flex-col">
                
                <a href={`/${lang}/tours`} className="block">
                  <div className="h-60 w-full relative overflow-hidden bg-gray-100 cursor-pointer">
                    {tour.image_url ? (
                      <img src={tour.image_url} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Нет фото</div>
                    )}
                    <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-md text-white font-bold text-sm px-4 py-1.5 rounded-full shadow-sm">
                      {tour.duration_days} дн.
                    </div>
                  </div>
                </a>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[56px]">{title}</h3>
                  <div className="text-sm font-black text-gray-500 mb-4">${tour.price} <span className="font-medium text-gray-400">/ чел.</span></div>
                  
                  <div className="mt-auto border-t border-gray-50 pt-4">
                    <BookingButton 
                      serviceType="tour" 
                      serviceTitle={title}
                      basePrice={tour.price} 
                      buttonText="Забронировать тур"
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