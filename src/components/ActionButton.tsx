import React from "react";

interface IActionButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ElementType;
  text: string;
  disabled?: boolean
}

export default function ActionButton ({ icon: Icon, text, disabled, ...buttonProps }: IActionButton) {
  return (
    <button
      {...buttonProps}
      className="flex flex-col items-center w-full h-[256px] p-3 rounded-[10px] bg-white-97 hover:bg-black-25 focus:border-4 focus:border-primary-50 focus:bg-white-97 disabled:bg-white-97 disabled:text-black text-center duration-75 ease-in-out"
    >
      <div className="h-full flex items-center">
        <Icon height={128} width={128} fill="#676767" opacity={disabled ? 0.25 : 1} />
      </div>
      <span className={`h-auto text-body text-black-100 font-medium leading-[27px] ${disabled ? "opacity-25" : ""}`}>
        {text}
      </span>
    </button>
  );
};

