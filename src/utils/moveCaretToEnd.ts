/**
 * Moves the caret (cursor) to the end of the specified HTMLElement.
 * @param el The HTMLElement to move the caret to the end of.
 */
export function moveCaretToEnd(el: HTMLElement) {
  const range = document.createRange();
  const sel = window.getSelection();
  if (el.lastChild) {
    range.setStart(el.lastChild, el.lastChild.textContent?.length || 0);
    range.collapse(true);
    sel?.removeAllRanges();
    sel?.addRange(range);
  }
}
