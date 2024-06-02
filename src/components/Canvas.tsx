import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants.ts/canvasSize";
import Imagearea from "./Imagearea";
import Textarea from "./Textarea";

interface ICanvas {
  background: string | null;
  isTextareaShown: boolean;
  isImageareaShown: boolean;
  image: string;
  setIsTextareaShown: () => void;
  setIsImageareaShown: () => void;
}

export default function Canvas({
  background,
  isTextareaShown,
  isImageareaShown,
  image,
  setIsTextareaShown,
  setIsImageareaShown,
}: ICanvas) {
  const canvasStyle = {
    backgroundImage: `url(${background})`,
    width: `${CANVAS_WIDTH}px`,
    height: `${CANVAS_HEIGHT}px`,
  };

  return (
    <div
      id="Canvas"
      className="object-cover bg-center flex items-center justify-center"
      style={{ width: canvasStyle.width, height: canvasStyle.height }}
    >
      <div
        className="w-full h-full bg-black-50 object-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: canvasStyle.backgroundImage }}
      >
        {isTextareaShown && (
          <Textarea setIsTextareaShown={setIsTextareaShown} />
        )}
        {isImageareaShown && (
          <Imagearea setIsImageareaShown={setIsImageareaShown} image={image} />
        )}
      </div>
    </div>
  );
}
