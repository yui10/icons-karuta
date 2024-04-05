import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
