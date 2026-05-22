import { supabase } from '../../../lib/supabase'
import { getDictionary, Locale } from '../../../dictionaries/getDictionary'
import BookingButton from '../../components/BookingButton'

export const dynamic = 'force-dynamic';

type Tour = {
  id: string
  price: number
  duration_days: number
  title_ru: string
  title_en: string | null
  title_ka: string | null
  title_uz: string | null
  description_ru: string | null
  description_en: string | null
  description_ka: string | null
  description_uz: string | null
  image_url: string | null
}

export default async function ToursPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  
  const dict = await getDictionary(lang);

  const { data: tours, error } = await supabase
    .from('tours')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="text-red-500 text-center py-10">Ошибка загрузки туров: {error.message}</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{dict.navigation?.tours}</h1>
          <a href={`/${lang}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            ← Назад на главную
          </a>
        </div>

        {!tours || tours.length === 0 ? (
          <p className="text-xl text-gray-500 text-center">Туров пока нет.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour: Tour) => {
              const title = (tour[`title_${lang}` as keyof Tour] as string) || tour.title_ru
              const description = tour[`description_${lang}` as keyof Tour] || tour.description_ru

              return (
                <div key={tour.id} className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                  
                  {/* Изображение тура */}
                  <div className="h-52 w-full relative overflow-hidden bg-gray-100">
                    {tour.image_url ? (
                      <img 
                        src={tour.image_url} 
                        alt={title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Нет фото</div>
                    )}
                    
                    {/* Цена поверх фото (Glassmorphism) */}
                    <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md text-gray-900 font-bold text-lg px-4 py-1.5 rounded-xl shadow-sm">
                      ${tour.price}
                    </div>
                  </div>

                  {/* Контент */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">{description}</p>
                    
                    {/* Подвал карточки с кнопкой бронирования */}
                    <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-2">
                      <div className="inline-block self-start text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg mb-2">
                        ⏱ {tour.duration_days} дн.
                      </div>
                      
                      <BookingButton 
                        serviceType="tour" 
                        serviceTitle={title} 
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