import { Silkscreen } from 'next/font/google'; // import silkscreen google font
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Toaster } from '@/components/ui/toaster';

// load silkscreen font with desired weights and assign a css variable
const silkscreen = Silkscreen({
  subsets: ['latin'],
  weight: ['400', '700'], // load regular and bold weights
  variable: '--font-silkscreen', // css variable for the font
  display: 'swap',
});


export const metadata = {
  title: 'FocusFlow', // updated title
  description: 'Your pixelated study timer companion.', // updated description
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* apply the font variable to the body */}
      <body className={`${silkscreen.variable} font-sans`}> {/* apply variable and set font-sans as default */}
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
