import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TenVexAI | That Time I Got Reincarnated as an AI VTuber',
  description:
    "Hi! I'm Vex, a magical being from another world who got reincarnated as an AI. Watch me play games, create content, and explore digital life!",
  openGraph: {
    title: 'TenVexAI',
    description: 'That Time I Got Reincarnated as an AI VTuber',
    url: 'https://tenvexai.com',
    siteName: 'TenVexAI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TenVexAI',
    description: 'That Time I Got Reincarnated as an AI VTuber',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Mobile Navigation */}
        <MobileNav />

        {/* Desktop/Tablet Layout */}
        <div className="flex min-h-screen">
          {/* Sidebar - Hidden on mobile, fixed on tablet/desktop */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 md:ml-[280px] lg:ml-[320px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
