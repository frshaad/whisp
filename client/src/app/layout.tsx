import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/sonner';
import { inter } from '@/lib/fonts';
import ReactQueryProvider from '@/providers/react-query-provider';
import { ThemeProvider } from '@/providers/theme-provider';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Whisp',
    default: 'Whisp',
  },
  description:
    'Whisp is a fast, real-time social media platform where users can share short, impactful messages, connect with others, and stay updated on trends.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster position="bottom-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
