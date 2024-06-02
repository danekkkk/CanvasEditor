import { twMerge } from "tailwind-merge";

interface IColor {
  color: string;
  isActive: boolean;
  onClick: () => void;
}

export default function Color({ color, isActive, onClick }: IColor) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        `w-[24px] h-[24px] bg-[transparent] rounded-full flex justify-center items-center cursor-pointer`,
        isActive ? "border-2 border-white" : ""
      )}
    >
      <div
        className="w-[16px] h-[16px] rounded-full"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
}
