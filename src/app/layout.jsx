
import { Silkscreen } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Toaster } from '@/components/ui/toaster';

const silkscreen = Silkscreen({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-silkscreen',
  display: 'swap',
});

export const metadata = {
  title: 'FocusFlow',
  description: 'Your pixelated study timer companion.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${silkscreen.variable} font-sans`}>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
