import { findSupportedLocaleCodeByLangCode, findSupportedDayjsLocale } from './find';

describe('findSupportedLocaleCodeByLangCode', () => {
  it('should be en', () => {
    expect(findSupportedLocaleCodeByLangCode('en')).toBe('en');
    expect(findSupportedLocaleCodeByLangCode('en-us')).toBe('en');
    expect(findSupportedLocaleCodeByLangCode('EN')).toBe('en');
    expect(findSupportedLocaleCodeByLangCode('EN-US')).toBe('en');
  });
  it('should be ja', () => {
    expect(findSupportedLocaleCodeByLangCode('ja')).toBe('ja');
    expect(findSupportedLocaleCodeByLangCode('ja-jp')).toBe('ja');
    expect(findSupportedLocaleCodeByLangCode('JA-JP')).toBe('ja');
    expect(findSupportedLocaleCodeByLangCode('de')).toBe('ja');
    expect(findSupportedLocaleCodeByLangCode('fr-be')).toBe('ja');
  });
});

describe('findSupportedDayjsLocale', () => {
  it('should be en locale', async () => {
    expect.assertions(1);
    const enLocale = (await import('dayjs/locale/en')).default;
    expect(await findSupportedDayjsLocale('en')).toBe(enLocale);
  });
  it('should be ja locale', async () => {
    expect.assertions(1);
    const jaLocale = (await import('dayjs/locale/ja')).default;
    expect(await findSupportedDayjsLocale('ja')).toBe(jaLocale);
  });
});
