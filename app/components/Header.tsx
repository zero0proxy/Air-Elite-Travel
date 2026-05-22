'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header({ lang, navDict }: { lang: string, navDict: any }) {
  const pathname = usePathname()
  const isHomePage = pathname === `/${lang}`

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Логика стилей: если главная страница и не проскроллили - прозрачная. Иначе - белая.
  const headerClasses = isHomePage 
    ? `fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-gradient-to-b from-black/70 to-transparent py-6'}`
    : "sticky top-0 w-full z-50 bg-white shadow-sm py-4"

  const textClasses = isHomePage && !isScrolled ? "text-white drop-shadow-md" : "text-gray-900"
  const logoAccent = isHomePage && !isScrolled ? "text-blue-400" : "text-blue-600"

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Строгий текстовый логотип */}
        <a href={`/${lang}`} className={`text-2xl font-black tracking-tighter transition-colors ${textClasses}`}>
          AIR ELITE <span className={`font-light ${logoAccent}`}>TRAVEL</span>
        </a>

        {/* Навигация */}
        <nav className="hidden md:flex gap-8">
          <a href={`/${lang}/tours`} className={`font-medium text-sm uppercase tracking-wider transition-colors hover:text-blue-500 ${textClasses}`}>
            {navDict?.tours}
          </a>
          <a href={`/${lang}/cars`} className={`font-medium text-sm uppercase tracking-wider transition-colors hover:text-blue-500 ${textClasses}`}>
            {navDict?.cars}
          </a>
          <a href={`/${lang}/transfers`} className={`font-medium text-sm uppercase tracking-wider transition-colors hover:text-blue-500 ${textClasses}`}>
            {navDict?.transfers}
          </a>
        </nav>
      </div>
    </header>
  )
}