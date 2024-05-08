import { dir } from 'i18next';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import { LanguageProvider } from '@/i18n/client';

const inter = Inter({ subsets: ["latin"] });

const GA_TAG_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  title: "icons karuta",
  description: "Play karuta with famous service logos.",
  keywords: ["simple-icons", "icon", "karuta"],
  category: "game",
  openGraph: {
    title: "icons karuta"
  }
};

export default function RootLayout({
  children,
  params: { lang }
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={lang} dir={dir(lang)}>
      <GoogleAnalytics gaId={GA_TAG_ID} />
      <body className={inter.className}>
        <LanguageProvider initialLanguage={lang} >
          <Header />
        </LanguageProvider>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
