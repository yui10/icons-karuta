import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LanguageProvider } from '@/i18n/client';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const GA_TAG_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const metadata: Metadata = {
    title: 'icons karuta',
    description: 'Play karuta with famous service logos.',
    keywords: ['simple-icons', 'icon', 'karuta'],
    category: 'game',
    openGraph: {
        title: 'icons karuta',
    },
};

export default function RootLayout({
    children,
    params: { lang },
}: Readonly<{
    children: React.ReactNode;
    params: { lang: string };
}>) {
    return (
        <html lang={lang} dir={dir(lang)}>
            <head>
                <GoogleAnalytics gaId={GA_TAG_ID} />
            </head>
            <body className={inter.className}>
                <LanguageProvider initialLanguage={lang}>
                    <Header />
                    {children}
                    <Footer />
                </LanguageProvider>
                <Analytics />
            </body>
        </html>
    );
}
