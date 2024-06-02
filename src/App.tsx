import "./App.css";
import "./styles/globals.css";

import { useState } from "react";
import { createPortal } from "react-dom";

import Button from "./components/Button";
import Logo from "./components/Logo";
import ActionButton from "./components/ActionButton";
import TextActionIcon from "./assets/icons/text.svg";
import ImageActionIcon from "./assets/icons/image.svg";
import BackgroundActionIcon from "./assets/icons/background.svg";
import RESET_ICON from "./assets/icons/reset.svg";
import Separator from "./components/Separator";
import Canvas from "./components/Canvas";
import INITIAL_POSTER from "./assets/initialPoster.png";
import ResetModal from "./components/ResetModal";
import { exportCanvasToPNG } from "./utils/exportCanvasToPng";

function App() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(
    INITIAL_POSTER
  );
  const [isTextareaShown, setIsTextareaShown] = useState<boolean>(false);
  const [isImageareaShown, setIsImageareaShown] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const resetCanvas = () => {
    setBackgroundImage(INITIAL_POSTER);
    setIsTextareaShown(false);
    setIsImageareaShown(false);
    setImage(null);
  };

  const modal = createPortal(
    <ResetModal
      isModalShown={isModalShown}
      setIsModalShown={setIsModalShown}
      callback={resetCanvas}
    />,
    document.body
  );

  const handleSetTextarea = () => {
    setIsTextareaShown(true);
    if (backgroundImage == INITIAL_POSTER) {
      setBackgroundImage(null);
    }
  };

  const handleSetImagearea = () => {
    setIsImageareaShown(true);
    if (backgroundImage == INITIAL_POSTER) {
      setBackgroundImage(null);
    }
  };

  const handleSetBackground = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setBackgroundImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  const handleSetImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target?.result as string);
          handleSetImagearea();
        };
        reader.readAsDataURL(file);
      }
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  return (
    <div className="px-[189px] py-[66px]">
      <div className="flex flex-row gap-6">
        {isModalShown && modal}
        <Canvas
          background={backgroundImage}
          isTextareaShown={isTextareaShown}
          setIsTextareaShown={() => setIsTextareaShown(false)}
          isImageareaShown={isImageareaShown}
          image={image || ""}
          setIsImageareaShown={() => setIsImageareaShown(false)}
        />
        <div className="w-[759px] h-full">
          <div className="flex flex-row justify-between items-center">
            <Logo />
            <Button
              variant="link"
              onClick={() => setIsModalShown(true)}
              additionalStyles="flex flex-row items-center gap-x-2 text-[#CB0000] h-[32px] border-b-2 px-0 py-0"
            >
              Reset <img src={RESET_ICON} alt="Reset icon" />{" "}
            </Button>
          </div>
          <Separator additionalStyles="my-8" />

          <div className="w-full py-6 px-4 bg-white-97 rounded-[10px] text-body text-black-100 leading-[27px] font-bold">
            <p>Add content</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-8">
            <ActionButton
              text="Text"
              icon={TextActionIcon}
              onClick={() => handleSetTextarea()}
              disabled={isTextareaShown}
            />
            <ActionButton
              text="Image"
              icon={ImageActionIcon}
              onClick={() => handleSetImage()}
              disabled={isImageareaShown}
            />
            <ActionButton
              text="Background"
              icon={BackgroundActionIcon}
              onClick={() => handleSetBackground()}
            />
          </div>

          <Separator additionalStyles="mt-[96px] mb-8" />

          <div className="flex justify-end">
            <Button variant="button" onClick={() => exportCanvasToPNG()}>
              Export to PNG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
