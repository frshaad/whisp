import './globals.css';

import type { Metadata } from 'next';

import ThemeProvider from '@/context/theme-provider';
import { inter } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Whisp',
  description:
    'Whisp is a fast, real-time social media platform where users can share short, impactful messages, connect with others, and stay updated on trends. Join conversations, follow topics, and interact with a community in a dynamic and engaging way."',
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
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
