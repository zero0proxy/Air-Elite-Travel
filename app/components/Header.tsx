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

  const headerClasses = isHomePage 
    ? `fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-gradient-to-b from-black/60 to-transparent py-6'}`
    : "sticky top-0 w-full z-50 bg-white shadow-sm py-4"

  const textClasses = isHomePage && !isScrolled ? "text-white" : "text-gray-900"
  const logoColor = isHomePage && !isScrolled ? "text-white" : "text-blue-600"

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href={`/${lang}`} className={`text-2xl font-black tracking-tighter transition-colors ${logoColor}`}>
          AIR ELITE <span className="font-light opacity-80">TRAVEL</span>
        </a>

        <nav className="hidden md:flex gap-10">
          {['tours', 'cars', 'transfers'].map((item) => (
            <a 
              key={item}
              href={`/${lang}/${item}`} 
              className={`font-bold text-[13px] uppercase tracking-[0.2em] transition-colors hover:text-blue-500 ${textClasses}`}
            >
              {navDict?.[item]}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}