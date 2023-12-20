


onmessage = async (evt)=>{
  importScripts('../resource/resourceObject.js');
  const imageData = evt.data.payload;

  let resourceObjects = [];


  const images = await Promise.all(
    urls.map(async url => {
      try {
        const response = await fetch(url);
        const fileBlob = await response.blob();
        if (fileBlob.type === "image/jpeg")
          return

        URL.createObjectURL(fileBlob);
      } catch (e) {
        return null;
      }
    })
  );
  self.postMessage(images);

}



//iterate through array of URL's, fetch and return as blobs

/*
self.addEventListener(
  "message",
  async function(e) {
    const urls = e.data;
    const images = await Promise.all(
      urls.map(async url => {
        try {
          const response = await fetch(url);
          const fileBlob = await response.blob();
          if (fileBlob.type === "image/jpeg")
            return URL.createObjectURL(fileBlob);
        } catch (e) {
          return null;
        }
      })
    );
    self.postMessage(images);
  },
  false
);

 */