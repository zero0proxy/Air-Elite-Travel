import { Locale } from "../../dictionaries/getDictionary";
import PromoFeed from "../components/PromoFeed";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Добро пожаловать</h1>
        <p className="text-xl text-gray-600">
          Язык системы: <span className="font-semibold uppercase">{lang}</span>
        </p>
      </div>

      <PromoFeed lang={lang} />
    </main>
  );
}