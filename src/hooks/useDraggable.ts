import { useEffect, useRef } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/canvasSize";

type Coords = {
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
};

/**
 * A custom hook for making an element draggable.
 * Takes the element's id and a boolean indicating whether the element is movable.
 *
 * @param {string} id - The id of the element to be made draggable.
 * @param {boolean} isMovable - A flag indicating whether the element is movable.
 * @returns {void} This hook does not return anything; it adjusts the position of the specified element.
 */
export default function useDraggable(id: string, isMovable: boolean): void {
  const isClicked = useRef<boolean>(false);

  const coords = useRef<Coords>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with given id doesn't exist");

    const centerX = CANVAS_WIDTH / 2 - target.offsetWidth / 2;
    const centerY = CANVAS_HEIGHT / 2 - target.offsetHeight / 2;

    coords.current.startX = centerX;
    coords.current.startY = centerY;
    coords.current.lastX = centerX;
    coords.current.lastY = centerY;
  }, []);

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with given id doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("Target element must have a parent");

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current || !isMovable) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
    };

    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [id, isMovable]);
}
