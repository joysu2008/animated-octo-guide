
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Toaster } from '@/components/ui/toaster';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata = {
  title: 'FocusFlow',
  description: 'Your pixelated study timer companion.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} font-sans`}>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
