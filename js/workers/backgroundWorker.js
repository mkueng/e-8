
let context;
let canvas;
let backgroundObjects = {};
let activeObjects  = {}


const targetFPS = 60;
const timeStep = 1000 / targetFPS;


let secondsPassed = 0;
let oldTimeStamp = 0;
let pause = false;
let animationFrameId;


/**
 *
 * @param evt
 * @returns {Promise<void>}
 */
onmessage = async (evt)=>{
  switch (evt.data.type) {
    case "init" : {

      backgroundObjects = evt.data.payload.backgroundObjects;

      for (const backgroundObject in evt.data.payload.backgroundObjects){
        const response = await fetch( evt.data.payload.backgroundObjects[backgroundObject].imageSrc);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        // Create ImageBitmap
        const imgBlob = await response.blob();
        backgroundObjects[backgroundObject].img = await createImageBitmap(imgBlob);
        backgroundObjects[backgroundObject].context = backgroundObjects[backgroundObject].offscreenCanvas.getContext('2d');
        backgroundObjects[backgroundObject].context.imageSmoothingEnabled = true;
        backgroundObjects[backgroundObject].context.imageSmoothingQuality = 'high';


      }
      this.postMessage("Worker ready");
      break;
    }
    case "start" : {
      console.log("start");
      Object.entries(backgroundObjects).forEach(([key, value]) => {
        setTimeout(function(){
          activeObjects[key] = backgroundObjects[key];

        }, value.onStage)
      });
      animate();
      break;
    }
    case "pause" : {
      pause = true;
      cancelAnimationFrame(animationFrameId);
      break;
    }
    case "resume": {
      pause = false;
      animate();
      break;
    }
  }
}


update= (secondsPassed)=>{
  console.log(secondsPassed);
  Object.entries(activeObjects).forEach(([key, value]) => {
    activeObjects[key].x = activeObjects[key].x -= ( activeObjects[key].step*secondsPassed)
  })

}

render = ()=>{
  Object.entries(activeObjects).forEach(([key, value]) => {
    activeObjects[key].context.clearRect(
      activeObjects[key].x,
      activeObjects[key].y,
      activeObjects[key].width,
      activeObjects[key].height
    );
    activeObjects[key].context.drawImage( activeObjects[key].img, activeObjects[key].x,activeObjects[key].y)
  })

}

animate = (timeStamp)=>{

  if (pause === false){


    // Calculate how much time has passed
    secondsPassed = (timeStamp - oldTimeStamp) / 1000
    oldTimeStamp = timeStamp;


    // Pass the time to the update
    update(secondsPassed);
    render();
    animationFrameId=requestAnimationFrame(animate);
  }



}

