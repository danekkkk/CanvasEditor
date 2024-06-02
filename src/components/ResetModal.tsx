import CLOSE_ICON from "../assets/icons/close.svg";
import ALERT_ICON from "../assets/icons/alert.svg";
import Button from "./Button";

interface IResetModal {
  isModalShown: boolean;
  setIsModalShown: (arg: boolean) => void;
  callback: () => void;
}

export default function ResetModal({
  isModalShown,
  setIsModalShown,
  callback,
}: IResetModal) {
  if (!isModalShown) return;

  return (
    <div
      className="bg-[#00000080] flex items-center justify-center fixed inset-0 z-10"
      tabIndex={10}
    >
      <div className="flex flex-col gap-y-12 w-[643px] h-[584px] bg-white rounded-[10px] py-12 px-32 opacity-100 relative">
        <button
          className="bg-[transparent] absolute top-4 right-4"
          onClick={() => setIsModalShown(false)}
        >
          <img src={CLOSE_ICON} alt="Close icon" />
        </button>

        <div className="flex flex-col justify-center items-center">
          <img src={ALERT_ICON} alt="Alert icon" width={290} height={290} />
          <h1 className="text-display font-bold text-black-100 leading-[48px] uppercase">
            Warning
          </h1>
          <p className="text-body font-medium text-black-75 leading-[27px] text-center mt-2">
            You’re about to reset whole process. Are you sure you want to do it?
          </p>
        </div>
        <div className="flex flex-row justify-center gap-x-1">
          <Button variant="link" onClick={() => setIsModalShown(false)}>
            Cancel
          </Button>
          <Button
            variant="button"
            onClick={() => {
              callback();
              setIsModalShown(false);
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
