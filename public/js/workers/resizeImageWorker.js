let bitmaps = {};

onmessage = async (evt) => {
  let { url, requiredWidth, requiredHeight, color } = evt.data.payload;
  let imageBitmap = null;

  if (bitmaps[url]) {
    imageBitmap = bitmaps[url];
  } else {
    imageBitmap = await fetchURLandConvertToImageBitmap(url);
  }

  let offscreenCanvas = new OffscreenCanvas(requiredWidth, requiredHeight);
  let offscreenContext = offscreenCanvas.getContext("2d");

  // Draw the image on the canvas
  offscreenContext.drawImage(imageBitmap, 0, 0, requiredWidth, requiredHeight);

  // Apply coloring overlay
  if (color) {
    offscreenContext.fillStyle = color; // e.g., 'rgba(255, 0, 0, 0.5)' for red with 50% opacity
    offscreenContext.globalCompositeOperation = 'source-atop';
    offscreenContext.fillRect(0, 0, requiredWidth, requiredHeight);
    offscreenContext.globalCompositeOperation = 'source-over'; // Reset to default
  }

  // Convert to blob and send back
  offscreenCanvas.convertToBlob().then((imageBlob) => {
    postMessage({
      imageBlob: imageBlob,
    });
  });
};

const fetchURLandConvertToImageBitmap = async (url) => {
  const response = await fetch(url);
  const fileBlob = await response.blob();
  const imageBitmap = await createImageBitmap(fileBlob);
  bitmaps[url] = imageBitmap;
  return imageBitmap;
};
