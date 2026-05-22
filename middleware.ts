import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Наши 4 языка
const locales = ['ru', 'en', 'ka', 'uz']
const defaultLocale = 'ru'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Проверяем, есть ли уже язык в URL (например, /en/tours)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return // Если язык есть, ничего не делаем, пропускаем

  // Если языка в URL нет (например, клиент зашел просто на airelitetravel.com), 
  // перенаправляем его на дефолтный русский: airelitetravel.com/ru
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Игнорируем системные файлы, картинки и видео .mp4
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.mp4$).*)'
  ]
}