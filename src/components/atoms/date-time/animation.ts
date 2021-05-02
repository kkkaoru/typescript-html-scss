import {
  findSupportedDayjsLocale,
  findSupportedLocaleCodeByLangCode,
  generateDateTimeText,
} from '@/typescript/locale/dayjs';
import { SupportedLocale } from '@/types/locale';
import { insertDateTimeText } from './element';

export function animateUpdateDateTimeText(
  elements: NodeListOf<Element>,
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
  dateTimeElements: NodeListOf<Element>,
  navigatorLanguageCode = 'ja',
  animationFunction: (elements: NodeListOf<Element>, localeCode: SupportedLocale, dayjsLocale: ILocale) => void,
): Promise<void> {
  const supportedLocaleCode = findSupportedLocaleCodeByLangCode(navigatorLanguageCode);
  const dayjsLocale = await findSupportedDayjsLocale(supportedLocaleCode);
  animationFunction(dateTimeElements, supportedLocaleCode, dayjsLocale);
}
