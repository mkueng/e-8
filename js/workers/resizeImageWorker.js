let bitmaps = {}

onmessage = async (evt)=>{

  let url = evt.data.payload.url
  let requiredWidth = evt.data.payload.requiredWidth;
  let requiredHeight = evt.data.payload.requiredHeight;
  let imageBitmap = null;

  if (bitmaps[url]) {
    console.log("blob exists");
    imageBitmap = bitmaps[url];
  }
  else {
    imageBitmap = await fetchURLandConvertToImageBitmap(url);
  }

  let offscreenCanvas = new OffscreenCanvas(requiredWidth,requiredHeight);
  let offscreenContext = offscreenCanvas.getContext("2d");
  offscreenContext.drawImage(imageBitmap,0,0,requiredWidth,requiredHeight);
  offscreenCanvas.convertToBlob().then((imageBlob)=> {
    postMessage({
      imageBlob: imageBlob
    })
  })

}

fetchURLandConvertToImageBitmap = async(url)=>{
  const response = await fetch(url);
  const fileBlob = await response.blob();
  const imageBitmap = await createImageBitmap(fileBlob);
  bitmaps[url]= imageBitmap;
  return imageBitmap;

}