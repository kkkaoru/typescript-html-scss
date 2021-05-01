import type { SupportedLocale } from '@/types/locale';

export async function findSupportedDayjsLocale(locale: SupportedLocale = 'ja'): Promise<ILocale> {
  switch (locale) {
    case 'en':
      return (await import('dayjs/locale/en')).default;
    case 'ja':
    default:
      return (await import('dayjs/locale/ja')).default;
  }
}

export function findSupportedLocaleCodeByLangCode(navigatorLanguageCode: string): SupportedLocale {
  if (/^en-?/i.test(navigatorLanguageCode)) {
    return 'en';
  }
  return 'ja';
}
