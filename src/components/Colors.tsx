import { useState } from "react";
import { TEXT_COLORS } from "../constants/textColors";
import Color from "./Color";

interface IColors {
  setTextColor: (color: string) => void;
  hidden: boolean;
}

export default function Colors({ setTextColor, hidden }: IColors) {
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);

  return (
    <div
      className={`flex flex-row gap-x-2 border-separate border-spacing-2 ${
        hidden ? "hidden" : ""
      }`}
    >
      {TEXT_COLORS.map((color, index) => (
        <Color
          key={index}
          color={color}
          isActive={activeColorIndex === index}
          onClick={() => {
            setActiveColorIndex(index);
            setTextColor(TEXT_COLORS[index]);
          }}
        />
      ))}
    </div>
  );
}
