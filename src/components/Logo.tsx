import LOGO from "../assets/icons/logo.svg"

export default function Logo() {
  return (
    <div className="flex flex-row gap-3 items-center">
        <img src={LOGO} alt="Logo" width={64} height={64} />
        <span className="text-display font-bold leading-[48px] text-black-75">CanvasEditor</span>
    </div>
  )
}
