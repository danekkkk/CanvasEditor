import domtoimage from "dom-to-image";

/**
 * Exports the content of a canvas element as a PNG image.
 */
export async function exportCanvasToPNG() {
  const canvasElement = document.getElementById("Canvas");
  const canvasClone = canvasElement?.cloneNode(true) as HTMLElement;
  const rootDiv = document.getElementById("root");

  if (canvasClone && rootDiv) {
    // make sure a copy of the canvas is not visible for the user
    rootDiv.style.marginBottom = "9999px";
    document.body.style.overflowY = "hidden";

    document.body.appendChild(canvasClone);

    const canvasChildren = canvasClone.children[0] as HTMLElement;
    const scaleX = 1080 / canvasChildren.offsetWidth;
    const scaleY = 1350 / canvasChildren.offsetHeight;

    canvasChildren.style.transform = `scale(${scaleX}, ${scaleY})`;

    await domtoimage
      .toPng(canvasClone, { width: 1080, height: 1350 })
      .then(function (dataUrl: string) {
        const link = document.createElement("a");
        link.download = "poster.png";
        link.href = dataUrl;
        link.target = "_blank";

        link.click();
        link.remove();
      })
      .catch(function (error: string) {
        console.error("Error while exporting an image: ", error);
      })
      .finally(() => {
        document.body.removeChild(canvasClone);
        document.body.style.overflowY = "auto";
        rootDiv.style.marginBottom = "0";
      });
  }
}
