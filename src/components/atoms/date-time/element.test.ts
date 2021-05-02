import { insertDateTimeText } from './element';

describe('insertDateTimeText', () => {
  it('should be inject text', () => {
    const mockNodeList = Object.assign(document.createElement('span'), {
      className: 'datetime',
    } as Partial<Element>).querySelectorAll('*');
    insertDateTimeText(mockNodeList, 'exampleTextてすと123');
    mockNodeList.forEach((node) => {
      expect(node.textContent).toBe('exampleTextてすと123');
    });
  });
});
