import { useState, useRef, useEffect } from "react";
import Colors from "./Colors";
import ControlButtons from "./ControlButtons";

import MOVE_ICON from "../assets/icons/move.svg";
import BIN_ICON from "../assets/icons/delete.svg";

import { TEXT_COLORS, textColorMapping } from "../constants/textColors";
import { twMerge } from "tailwind-merge";
import useDraggable from "../hooks/useDraggable";
import useResizable from "../hooks/useResizable";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/canvasSize";
import { handleClickOutside } from "../utils/handleClickOutside";
import { moveCaretToEnd } from "../utils/moveCaretToEnd";

export default function Textarea({
  setIsTextareaShown,
}: {
  setIsTextareaShown: () => void;
}) {
  const [textColor, setTextColor] = useState<string>(TEXT_COLORS[0]);
  const [userText, setUserText] = useState<string>("");
  const [isMovable, setIsMovable] = useState<boolean>(false);
  const [isResizable, setIsResizable] = useState<boolean>(false);
  const [hasBeenFocused, setHasBeenFocused] = useState<boolean>(false);
  const [isDefaultTextHidden, setIsDefaultTextHidden] =
    useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(true);

  const textAreaRef = useRef<HTMLDivElement>(null);

  useDraggable("textarea", isMovable);
  useResizable("textarea", isResizable);

  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      handleClickOutside(event, textAreaRef, setIsFocused);
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleInput = (e: any) => {
    if (!hasBeenFocused) {
      setHasBeenFocused(true);
      setIsDefaultTextHidden(true);
      setUserText(e.data);
    } else {
      const pElement = paragraphRef.current;
      if (pElement) {
        setUserText(pElement.innerText);
        moveCaretToEnd(pElement);
      }
    }
  };



  useEffect(() => {
    const pElement = paragraphRef.current;
    if (pElement) {
      pElement.focus();
      pElement.addEventListener("input", handleInput);
      pElement.addEventListener("paste", handleInput);
    }
    return () => {
      if (pElement) {
        pElement.removeEventListener("input", handleInput);
        pElement.removeEventListener("paste", handleInput);
      }
    };
  }, [hasBeenFocused]);

  useEffect(() => {
    const pElement = paragraphRef.current;
    if (pElement) {
      moveCaretToEnd(pElement);
    }
  }, [userText]);

  // textarea width and height
  const width = 350;
  const minHeight = 120;

  // center the element
  const left = CANVAS_WIDTH / 2 - width / 2;
  const top = CANVAS_HEIGHT / 2 - minHeight / 2;

  return (
    <div
      ref={textAreaRef}
      id="textarea"
      className="mt-auto absolute"
      style={{
        width: `${width}px`,
        minHeight: `${minHeight}px`,
        left: `${left}px`,
        top: `${top}px`,
      }}
      onClick={() => {
        setIsFocused(true);
      }}
    >
      <div
        className={`flex w-full h-full border-2 text-center relative px-6 py-3 mb-2 ${
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
              onClick={setIsTextareaShown}
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

        <p
          ref={paragraphRef}
          tabIndex={0}
          className={`text-display w-full h-full ${twMerge(
            "text-black-100 font-semibold leading-[48px] break-words outline-none",
            textColorMapping[textColor],
            isDefaultTextHidden ? "opacity-100" : "opacity-25"
          )}`}
          contentEditable
          suppressContentEditableWarning={true}
        >
          {isDefaultTextHidden ? userText : "Type your text here"}
        </p>
      </div>
      <Colors setTextColor={setTextColor} hidden={!isFocused} />
    </div>
  );
}
