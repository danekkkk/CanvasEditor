import { useEffect, useRef, useState } from "react";
import ControlButtons from "./ControlButtons";
import MOVE_ICON from "../assets/icons/move.svg";
import BIN_ICON from "../assets/icons/delete.svg";
import useDraggable from "../hooks/useDraggable";
import useResizable from "../hooks/useResizable";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/canvasSize";
import { handleClickOutside } from "../utils/handleClickOutside";

export default function Imagearea({
  setIsImageareaShown,
  image,
}: {
  setIsImageareaShown: () => void;
  image: string;
}) {
  const [isMovable, setIsMovable] = useState<boolean>(false);
  const [isResizable, setIsResizable] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(true);

  const imageAreaRef = useRef<HTMLDivElement>(null);

  useDraggable("imagearea", isMovable);
  useResizable("imagearea", isResizable);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      handleClickOutside(event, imageAreaRef, setIsFocused);
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // imagearea width and height
  const width = 200;
  const height = 200;

  // center the element
  const left = CANVAS_WIDTH / 2 - width / 2;
  const top = CANVAS_HEIGHT / 2 - height / 2;

  return (
    <div
      ref={imageAreaRef}
      id="imagearea"
      className="absolute"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
      }}
      onClick={() => setIsFocused(true)}
    >
      <div
        className={`w-full h-full text-center relative border-2 ${
          isFocused ? "border-primary" : "border-[transparent]"
        }`}
      >
        {isFocused && (
          <>
            <ControlButtons
              additionalStyles={`w-10 h-10 absolute -top-5 -left-5 ${
                isMovable ? "cursor-grabbing" : ""
              }`}
              onMouseDown={() => setIsMovable(true)}
              onMouseUp={() => setIsMovable(false)}
            >
              <img src={MOVE_ICON} alt="Move" draggable="false" />
            </ControlButtons>

            <ControlButtons
              additionalStyles="w-6 h-6 absolute -top-3 -right-3"
              onClick={setIsImageareaShown}
            >
              <img src={BIN_ICON} alt="Delete" draggable="false" />
            </ControlButtons>

            <ControlButtons
              additionalStyles={`w-6 h-6 absolute -bottom-3 -right-3 bg-primary border-4 border-white ${
                isResizable ? "cursor-grabbing" : ""
              }`}
              onMouseDown={() => setIsResizable(true)}
              onMouseUp={() => setIsResizable(false)}
            />
          </>
        )}

        <img
          src={image}
          className="w-full h-full object-cover"
          alt="Image placeholder"
          draggable="false"
        />
      </div>
    </div>
  );
}
