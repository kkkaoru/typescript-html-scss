import dayjs from 'dayjs';
import { findSupportedDayjsLocale, findSupportedLocaleCodeByLangCode } from '@/typescript/locale/dayjs';
import { SupportedLocale } from '@/types/locale';

function generateDateTimeText(localeCode: SupportedLocale = 'ja', dayjsLocale: ILocale): string {
  const now = dayjs().locale(localeCode);
  return `${now.format(dayjsLocale?.formats?.LLLL || 'dddd, MMMM D, YYYY A h:mm')}:${now.format('ss:SSS')}`;
}

function findDateTimeNodeList(query: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(query);
}

function insertDateTimeText(elements: NodeListOf<HTMLElement>, text: string): void {
  if (elements.length === 0) {
    return;
  }
  elements.forEach((element) => {
    Object.assign(element, { innerHTML: text } as Partial<HTMLElement>);
  });
}

async function updateDateTimeTextByAnimation(navigatorLanguageCode = 'ja') {
  const updateAnimation = (elements: NodeListOf<HTMLElement>, localeCode: SupportedLocale, dayjsLocale: ILocale) => {
    const text = generateDateTimeText(localeCode, dayjsLocale);
    insertDateTimeText(elements, text);
    requestAnimationFrame(() => {
      updateAnimation(elements, localeCode, dayjsLocale);
    });
  };
  const dateTimeElements = findDateTimeNodeList('.datetime');
  const supportedLocaleCode = findSupportedLocaleCodeByLangCode(navigatorLanguageCode);
  const dayjsLocale = await findSupportedDayjsLocale(supportedLocaleCode);
  updateAnimation(dateTimeElements, supportedLocaleCode, dayjsLocale);
}

updateDateTimeTextByAnimation(window.navigator.language);
