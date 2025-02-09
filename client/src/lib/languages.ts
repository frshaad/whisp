import { franc } from 'franc';

const rtlLanguages = new Set([
  'ara', // Arabic
  'fas', // Persian (Farsi)
  'urd', // Urdu
  'heb', // Hebrew
  'ydd', // Yiddish
  'pes', // Iranian Persian
  'prs', // Dari (Afghanistan)
  'azj', // South Azerbaijani
  'uig', // Uyghur
  'kur', // Kurdish
  'syr', // Syriac
  'pus', // Pashto
  'ksw', // S'gaw Karen
  'mls', // Masalit
]);

const detectLanguage = (text: string) => franc(text, { minLength: 3 });

export const getLangDirection = (text: string): 'rtl' | 'ltr' => {
  const langCode = detectLanguage(text);
  return rtlLanguages.has(langCode) ? 'rtl' : 'ltr';
};
