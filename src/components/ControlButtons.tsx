import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IControlButtons extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode | ReactNode[];
  additionalStyles?: string;
}

export default function ControlButtons({
  children,
  additionalStyles,
  ...buttonProps
}: IControlButtons) {
  return (
    <button
    {...buttonProps}
      className={twMerge(
        "bg-white p-1 rounded-full flex justify-center items-center select-none",
        additionalStyles
      )}
    >
      {children}
    </button>
  );
}
