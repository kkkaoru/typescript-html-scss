import {
  findSupportedDayjsLocale,
  findSupportedLocaleCodeByLangCode,
  generateDateTimeText,
} from '@/typescript/locale/dayjs';
import { SupportedLocale } from '@/types/locale';
import { insertDateTimeText } from './element';

export function animateUpdateDateTimeText(
  elements: NodeListOf<HTMLElement>,
  localeCode: SupportedLocale,
  dayjsLocale: ILocale,
): void {
  const text = generateDateTimeText(localeCode, dayjsLocale);
  insertDateTimeText(elements, text);
  requestAnimationFrame(() => {
    animateUpdateDateTimeText(elements, localeCode, dayjsLocale);
  });
}

export async function updateDateTimeTextByAnimation(
  dateTimeElements: NodeListOf<HTMLElement>,
  navigatorLanguageCode = 'ja',
  animationFunction: (elements: NodeListOf<HTMLElement>, localeCode: SupportedLocale, dayjsLocale: ILocale) => void,
): Promise<void> {
  const supportedLocaleCode = findSupportedLocaleCodeByLangCode(navigatorLanguageCode);
  const dayjsLocale = await findSupportedDayjsLocale(supportedLocaleCode);
  animationFunction(dateTimeElements, supportedLocaleCode, dayjsLocale);
}

updateDateTimeTextByAnimation(
  document.querySelectorAll('.datetime'),
  window.navigator.language,
  animateUpdateDateTimeText,
);
