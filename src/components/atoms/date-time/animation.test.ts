import { updateDateTimeTextByAnimation } from './animation';

describe('updateDateTimeTextByAnimation', () => {
  it('should be executed in callback', async () => {
    expect.assertions(3);
    const mockNodeList = Object.assign(document.createElement('span'), {
      className: 'datetime',
    } as Partial<Element>).querySelectorAll('*');
    const mockCallBack = jest.fn();
    await updateDateTimeTextByAnimation(mockNodeList, 'ja', mockCallBack);
    expect(mockCallBack.mock.calls).toHaveLength(1);
    expect(mockCallBack.mock.calls.slice().shift()[0]).toBe(mockNodeList);
    expect(mockCallBack.mock.calls.slice().shift()[1]).toBe('ja');
  });
});
