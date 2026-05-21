export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Air Elite Travel</h1>
        <p className="text-xl text-gray-600">
          Текущий язык: <span className="font-semibold text-blue-600 uppercase">{resolvedParams.lang}</span>
        </p>
      </div>
    </main>
  );
}