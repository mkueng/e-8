'use strict'
class HazeHandler {

  #resourcePaths =[ "/resources/hazes/haze_01.png", "/resources/hazes/haze_02.png"];
  #ticker = 0;
  #upcoming = 0;
  #canvases = {};

  constructor(){
  }

  init = async () =>{
    this.#canvases[0] = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundFace).canvas;
    this.#canvases[1] = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundMiddle).canvas;
    this.#canvases[2] = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundFar).canvas;
    this.resizeImageWorker = e8.global.resizeImageWorker;
    this.#upcoming =2;

    e8.global.resizeImageWorker.onmessage = ({data}) =>{
      this.createHaze(data);
    }

  }

  createHaze = (data) =>{
    let canvas;
    let img = new Image();

    img.onload =()=>{
      const size = img.width;
      const velocity = size * 0.0003;

      if (velocity >= 0.7 ) canvas = this.#canvases[0];
      if (velocity > 0.5 && velocity < 0.7) canvas = this.#canvases[1];
      if (velocity <= 0.5) canvas = this.#canvases[2];

      let haze = new Haze({
        canvas: canvas,
        image: img,
        width: img.width,
        height: img.height,
        posX: e8.global.screenWidth,
        posY: Math.floor(Math.random()* e8.global.screenHeight-img.height/10),
        posDX: 0,
        posDY: 0,
        velX: -1 * velocity,
        velY: 0
      })

      GameObjectsHandler.instance.addGameObject(haze);
      console.log("haze created");

      //releasing object URL
      URL.revokeObjectURL(img.src);
    }

    // create object URL with imageBlob
    img.src = URL.createObjectURL(data.imageBlob)

  }



  invokeHaze = () => {
    let width = Math.floor(Math.random()*3570+1455)
    let height = Math.floor(Math.random()*1200+275)

    let randomIndex = Math.floor(Math.random() * this.#resourcePaths.length);
    let randomResourcePath = this.#resourcePaths[randomIndex];

    this.resizeImageWorker.postMessage({
      payload: {
        url : randomResourcePath,
        requiredWidth: width,
        requiredHeight : height
      }
    })
  }

  /**
   *
   * @param message
   * @param payload
   */
  updateFromGameLoop = ({message, payload}) => {
    this.#ticker++;
    if (this.#ticker > this.#upcoming){
      this.#ticker = 0;
      this.#upcoming = Math.floor(Math.random()*15+10);
     //this.#upcoming = 2;
      this.invokeHaze();
    }
  }
}