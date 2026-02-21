'use client';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Menu } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <nav className="bg-blue-600 p-4 text-white flex justify-between">
            <h1 className="text-xl font-bold">Fitness Tracker</h1>
            <Menu className="cursor-pointer" size={24} />
          </nav>
          <main className="p-4">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}