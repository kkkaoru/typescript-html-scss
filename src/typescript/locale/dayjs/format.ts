import dayjs from 'dayjs';
import { SupportedLocale } from '@/types/locale';

export function generateDateTimeText(localeCode: SupportedLocale = 'ja', dayjsLocale: ILocale): string {
  const now = dayjs().locale(localeCode);
  return `${now.format(dayjsLocale?.formats?.LLLL || 'dddd, MMMM D, YYYY A h:mm')}:${now.format('ss:SSS')}`;
}
