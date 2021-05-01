import jaLocale from 'dayjs/locale/ja';
import enLocale from 'dayjs/locale/en';
import MockDate from 'mockdate';
import { mockUnixTime } from '@/mocks/date-time';
import { generateDateTimeText } from './format';

describe('generateDateTimeText', () => {
  it('should be ja locale text', () => {
    MockDate.set(mockUnixTime);
    expect(generateDateTimeText('ja', jaLocale)).toBe('2021年1月1日 金曜日 23:59:59:999');
    MockDate.reset();
  });
  it('should be en locale text', () => {
    MockDate.set(mockUnixTime);
    expect(generateDateTimeText('en', enLocale)).toBe('Friday, January 1, 2021 PM 11:59:59:999');
    MockDate.reset();
  });
});
