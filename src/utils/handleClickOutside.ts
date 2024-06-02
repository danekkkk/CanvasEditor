import { RefObject } from "react";

type CallbackFunction = (arg: boolean) => void;

/**
 * Handles click outside of a specified element.
 * @param event The MouseEvent object.
 * @param ref RefObject containing the reference to the HTMLElement.
 * @param callback Callback function to be called when click occurs outside the element.
 */
export function handleClickOutside(
  event: MouseEvent,
  ref: RefObject<HTMLElement>,
  callback: CallbackFunction
): void {
  if (ref.current && !ref.current.contains(event.target as Node)) {
    callback(false);
  }
}
