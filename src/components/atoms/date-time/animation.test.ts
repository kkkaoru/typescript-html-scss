import jaLocale from 'dayjs/locale/ja';
import { updateDateTimeTextByAnimation, animateUpdateDateTimeText } from './animation';

describe('updateDateTimeTextByAnimation', () => {
  it('should be executed in callback', async () => {
    expect.assertions(4);
    const mockNodeList = Object.assign(document.createElement('span'), {
      className: 'datetime',
    } as Partial<Element>).querySelectorAll('*');
    const mockCallBack = jest.fn();
    await updateDateTimeTextByAnimation(mockNodeList, 'ja', mockCallBack);
    expect(mockCallBack.mock.calls).toHaveLength(1);
    expect(mockCallBack.mock.calls.slice().shift()[0]).toBe(mockNodeList);
    expect(mockCallBack.mock.calls.slice().shift()[1]).toBe('ja');
    expect(mockCallBack.mock.calls.slice().shift()[2]).toBe(jaLocale);
  });
});

describe('animateUpdateDateTimeText', () => {
  it('should be called with requestAnimationFrame', () => {
    const mockFunction = jest.fn();
    const spy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(mockFunction);
    const mockNodeList = Object.assign(document.createElement('span'), {
      className: 'datetime',
    } as Partial<Element>).querySelectorAll('*');
    animateUpdateDateTimeText(mockNodeList, 'ja', jaLocale);
    expect(mockFunction.mock.calls).toHaveLength(1);
    spy.mockRestore();
  });
});
