import { ReactNode, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | ReactNode[];
  variant: "button" | "link";
  additionalStyles?: string;
}

export default function Button({
  children,
  additionalStyles,
  variant,
  ...buttonProps
}: IButton) {
  return (
    <button
      className={twMerge(
        `px-8 py-2 font-semibold text-[15px] leading-[22.5px] tracking-[0.5px] duration-75 ease-in-out box-border`,
        variant === "button"
          ? `rounded-[5px] text-white bg-primary border-primary border-2 hover:bg-[#550788] hover:border-[#550788] focus:bg-primary focus:border-[#7109b780] disabled:bg-black-25 disabled:border-black-25`
          : `text-black-75`,
        additionalStyles
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
