import dayjs from 'dayjs';
import { findSupportedDayjsLocale, findSupportedLocaleCodeByLangCode } from '@/typescript/locale/dayjs';
import { SupportedLocale } from '@/types/locale';

function generateDateTimeText(localeCode: SupportedLocale = 'ja', dayjsLocale: ILocale): string {
  const now = dayjs().locale(localeCode);
  return `${now.format(dayjsLocale?.formats?.LLLL || 'dddd, MMMM D, YYYY A h:mm')}:${now.format('ss:SSS')}`;
}

function insertDateTimeText(elements: NodeListOf<HTMLElement>, text: string): void {
  if (elements.length === 0) {
    return;
  }
  elements.forEach((element) => {
    Object.assign(element, { innerHTML: text } as Partial<HTMLElement>);
  });
}

function updateAnimation(elements: NodeListOf<HTMLElement>, localeCode: SupportedLocale, dayjsLocale: ILocale): void {
  const text = generateDateTimeText(localeCode, dayjsLocale);
  insertDateTimeText(elements, text);
  requestAnimationFrame(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateAnimation(elements, localeCode, dayjsLocale);
  });
}

async function updateDateTimeTextByAnimation(
  dateTimeElements: NodeListOf<HTMLElement>,
  navigatorLanguageCode = 'ja',
  animationFunction: (elements: NodeListOf<HTMLElement>, localeCode: SupportedLocale, dayjsLocale: ILocale) => void,
) {
  const supportedLocaleCode = findSupportedLocaleCodeByLangCode(navigatorLanguageCode);
  const dayjsLocale = await findSupportedDayjsLocale(supportedLocaleCode);
  animationFunction(dateTimeElements, supportedLocaleCode, dayjsLocale);
}

updateDateTimeTextByAnimation(document.querySelectorAll('.datetime'), window.navigator.language, updateAnimation);
