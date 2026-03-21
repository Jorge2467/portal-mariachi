import { cookies } from 'next/headers';
import { dictionaries, Language } from './dictionaries';

export async function getDictionaryServer() {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('portal_lang')?.value as Language;
  
  // Validar si es un idioma soportado, sino Español por defecto
  const lang = (langCookie && dictionaries[langCookie]) ? langCookie : 'es';
  
  return {
    lang,
    t: (key: string) => dictionaries[lang][key] || key
  };
}
