import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAbbreviation(name: string): string {
  if (!name) return '';

  const parts = name.split(' ').filter(Boolean);
  const abbreviation = parts.map((part) => part[0].toUpperCase()).join('');

  return abbreviation.substring(0, 2);
}

export function sleep(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}
