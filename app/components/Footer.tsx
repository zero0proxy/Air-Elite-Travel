import { getDictionary, Locale } from '../../dictionaries/getDictionary'

export default async function Footer({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Логотип и права */}
        <div className="text-center md:text-left">
          <div className="text-2xl font-bold text-white mb-2">Air Elite Travel</div>
          <div className="text-sm text-gray-500">
            &copy; {currentYear} Air Elite Travel. {dict.footer?.rights}
          </div>
        </div>

        {/* Контакты (позже добавим реальные ссылки) */}
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-white transition-colors">{dict.footer?.contacts}</a>
          <a href="mailto:info@airelitetravel.com" className="hover:text-white transition-colors">info@airelitetravel.com</a>
        </div>
        
      </div>
    </footer>
  )
}