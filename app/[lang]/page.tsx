import { getDictionary, Locale } from "../../dictionaries/getDictionary";
import PromoFeed from "../components/PromoFeed"; // <-- Эту строку нужно добавить!

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Air Elite Travel</div>
          <nav className="flex gap-6 text-gray-600 font-medium">
            <a href={`/${lang}/tours`} className="hover:text-blue-600">{dict.navigation?.tours}</a>
            <a href={`/${lang}/cars`} className="hover:text-blue-600">{dict.navigation?.cars}</a>
            <a href={`/${lang}/transfers`} className="hover:text-blue-600">{dict.navigation?.transfers}</a>
          </nav>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Добро пожаловать</h1>
        <p className="text-xl text-gray-600">
          Язык системы: <span className="font-semibold uppercase">{lang}</span>
        </p>
      </div>
{/* Выводим акции, передавая текущий язык */}
      <PromoFeed lang={lang} />
      
    </main>
  );
}