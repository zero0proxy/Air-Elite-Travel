import type { Metadata, Viewport } from "next";
import { Locale } from "../../dictionaries/getDictionary";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Air Elite Travel",
  description: "Бронирование туров, аренда авто и трансферы",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  
  return (
    <html lang={lang}>
      <body className="antialiased flex flex-col min-h-screen">
        <Header lang={lang} />
        
        <div className="flex-grow">
          {children}
        </div>

        <Footer lang={lang} />
      </body>
    </html>
  );
}