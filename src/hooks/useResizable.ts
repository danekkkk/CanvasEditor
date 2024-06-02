import { useEffect, useRef } from "react";

type Size = {
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  initialFontSize: number;
  initialLineHeight: number;
  currentWidth: number;
  currentHeight: number;
};

/**
 * A custom hook for resizing an element.
 * Takes the element's id and a boolean indicating whether the element is resizable.
 *
 * @param {string} id - The id of the element to be resized.
 * @param {boolean} isResizable - A flag indicating whether the element is resizable.
 * @returns {void} This hook does not return anything; it adjusts the size of the specified element.
 */
export default function useResizable(id: string, isResizable: boolean): void {
  const isClicked = useRef<boolean>(false);

  const size = useRef<Size>({
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    initialFontSize: 0,
    initialLineHeight: 0,
    currentWidth: 0,
    currentHeight: 0,
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with given id doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("target element must have a parent");

    const children = target.children[0] as HTMLElement;
    if (!children)
      throw new Error("Element with given id doesn't have children");

    let textElement: HTMLElement | null = null;
    if (children.children[3] && children.children[3].tagName === "P") {
      textElement = children.children[3] as HTMLElement;
      const computedStyle = window.getComputedStyle(textElement);
      size.current.initialFontSize = parseFloat(computedStyle.fontSize);
      size.current.initialLineHeight = parseFloat(computedStyle.lineHeight);
    }

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      size.current.startX = e.clientX;
      size.current.startY = e.clientY;
      size.current.startWidth = children.offsetWidth;
      size.current.startHeight = children.offsetHeight;
      size.current.currentWidth = children.offsetWidth;
      size.current.currentHeight = children.offsetHeight;
    };

    const onMouseUp = () => {
      isClicked.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current || !isResizable) return;

      const deltaX = e.clientX - size.current.startX;
      const deltaY = e.clientY - size.current.startY;

      const newWidth = size.current.startWidth + deltaX;
      const newHeight = size.current.startHeight + deltaY;

      size.current.currentWidth = newWidth;
      size.current.currentHeight = newHeight;

      children.style.width = `${newWidth}px`;
      if (textElement) {
        children.style.minHeight = `${newHeight}px`;
        adjustTextSize(newWidth, newHeight, textElement);
      } else {
        children.style.height = `${newHeight}px`;
      }
    };

    const adjustTextSize = (
      newWidth: number,
      newHeight: number,
      textElement: HTMLElement
    ) => {
      const widthRatio = newWidth / size.current.startWidth;
      const heightRatio = newHeight / size.current.startHeight;

      const fontSizeRatio =
        newHeight > size.current.startHeight
          ? Math.max(widthRatio, heightRatio)
          : Math.min(widthRatio, heightRatio);

      let newFontSize = size.current.initialFontSize * fontSizeRatio;
      newFontSize = Math.min(48, Math.max(14, newFontSize));

      const newLineHeight = size.current.initialLineHeight * fontSizeRatio;
      const limitedLineHeight = Math.min(56, Math.max(16, newLineHeight));

      textElement.style.fontSize = `${newFontSize}px`;
      textElement.style.lineHeight = `${limitedLineHeight}px`;
    };

    target.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseUp);

    return () => {
      target.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseUp);
    };
  }, [id, isResizable]);
}
