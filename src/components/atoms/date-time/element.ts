export function insertDateTimeText(elements: NodeListOf<Element>, text: string): void {
  if (elements.length === 0) {
    return;
  }
  elements.forEach((element) => {
    Object.assign(element, { innerHTML: text } as Partial<Element>);
  });
}
