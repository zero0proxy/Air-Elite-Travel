import { supabase } from '../../../lib/supabase'
import { getDictionary, Locale } from '../../../dictionaries/getDictionary'

// Отключаем кэширование, чтобы всегда видеть актуальные туры из базы
export const dynamic = 'force-dynamic';

// Описываем структуру тура
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
}

export default async function ToursPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  
  // Загружаем словарь, чтобы перевести статический текст (например, заголовок страницы)
  const dict = await getDictionary(lang);

  // Получаем туры из базы
  const { data: tours, error } = await supabase
    .from('tours')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="text-red-500 text-center py-10">Ошибка загрузки туров: {error.message}</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Шапка страницы с кнопкой "Назад" */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{dict.navigation?.tours}</h1>
          <a href={`/${lang}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            ← Назад на главную
          </a>
        </div>

        {/* Вывод сетки туров */}
        {!tours || tours.length === 0 ? (
          <p className="text-xl text-gray-500 text-center">Туров пока нет.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour: Tour) => {
              // Выбираем нужный язык (если перевода нет - показываем русский)
              const title = tour[`title_${lang}` as keyof Tour] || tour.title_ru
              const description = tour[`description_${lang}` as keyof Tour] || tour.description_ru

              return (
                <div key={tour.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{description}</p>
                  
                  {/* Подвал карточки с ценой и длительностью */}
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                      ⏱ {tour.duration_days} дн.
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      ${tour.price}
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