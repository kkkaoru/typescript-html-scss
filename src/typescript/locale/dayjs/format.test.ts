import jaLocale from 'dayjs/locale/ja';
import enLocale from 'dayjs/locale/en';
import MockDate from 'mockdate';
import { generateDateTimeText } from './format';

describe('generateDateTimeText', () => {
  // JST 2021-01-01 23:59:59:999
  const mockUnixTime = 1609513199999;

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
