import { Inter, Pacifico, Vazirmatn } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const vazir = Vazirmatn({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});
