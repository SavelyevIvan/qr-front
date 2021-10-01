export function prepareToExport(oldCanvas) {
  const newCanvas = document.createElement("canvas");
  const context = newCanvas.getContext("2d");

  newCanvas.width = oldCanvas.width + 20;
  newCanvas.height = oldCanvas.height + 20;

  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, newCanvas.width, newCanvas.height);

  context.drawImage(oldCanvas, 10, 10);

  return newCanvas;
}
