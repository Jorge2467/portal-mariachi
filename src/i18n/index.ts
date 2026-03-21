import { cookies } from 'next/headers';

const dictionaries = {
  es: () => import('./es.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
  pt: () => import('./pt.json').then((module) => module.default),
};

export const getDictionary = async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('portal_locale')?.value as keyof typeof dictionaries || 'es';
  
  if (dictionaries[locale]) {
    return dictionaries[locale]();
  }
  return dictionaries.es();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
