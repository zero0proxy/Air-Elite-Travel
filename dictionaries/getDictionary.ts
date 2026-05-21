const dictionaries = {
  ru: () => import('./ru.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
  ka: () => import('./ka.json').then((module) => module.default),
  uz: () => import('./uz.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.ru()
}