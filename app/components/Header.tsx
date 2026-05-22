import { getDictionary, Locale } from '../../dictionaries/getDictionary'

export default async function Header({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)
  
  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href={`/${lang}`} className="text-2xl font-bold text-blue-600">
          Air Elite Travel
        </a>
        <nav className="flex gap-6 text-gray-600 font-medium">
          <a href={`/${lang}/tours`} className="hover:text-blue-600 hover:underline">{dict.navigation?.tours}</a>
          <a href={`/${lang}/cars`} className="hover:text-blue-600 hover:underline">{dict.navigation?.cars}</a>
          <a href={`/${lang}/transfers`} className="hover:text-blue-600 hover:underline">{dict.navigation?.transfers}</a>
        </nav>
      </div>
    </header>
  )
}