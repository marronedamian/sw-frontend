import type { Metadata } from 'next';
import { MandalorianFont } from '@/lib/fonts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthProvider from '@/providers/session.provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Star Wars API Explorer',
  description: 'Explore the Star Wars universe',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={MandalorianFont.className}>
      <body className="bg-black text-stone-300 bg-stars-pattern">
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
