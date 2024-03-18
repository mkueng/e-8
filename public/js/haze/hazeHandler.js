'use strict'
class HazeHandler {

  #ticker = 0;
  #upcoming = 0;
  #canvases = {};

  constructor({gameLoop, canvasHandler, resizeImageWorker}){
    this.#canvases[0] = canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundFace).canvas;
    this.#canvases[1] = canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundMiddle).canvas;
    this.#canvases[2] = canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundFar).canvas;
    this.resizeImageWorker = resizeImageWorker;
    //this.#upcoming = Math.floor(Math.random()*5+10);
    this.#upcoming =2;
    resizeImageWorker.onmessage = ({data}) =>{
      let canvas;
      let img = new Image();


      img.onload =()=>{
        const size = img.width;
        const velocity = size * 0.0006;

        if (velocity >= 1 ) canvas = this.#canvases[0];
        if (velocity > 0.5 && velocity < 1) canvas = this.#canvases[1];
        if (velocity <= 0.5) canvas = this.#canvases[2];

        let haze = new Haze({
          canvas: canvas,
          image: img,
          width: img.width,
          height: img.height,
          posX: e8.global.screenWidth,
          posY: Math.floor(Math.random()* e8.global.screenHeight-100),
          posDX: 0,
          posDY: 0,
          velX: -1 * velocity,
          velY: 0
        })

        GameObjectsHandler.instance.addGameObject(haze);
        console.log("created");

        //releasing object URL
        URL.revokeObjectURL(img.src);
      }

      // create object URL with imageBlob
      img.src = URL.createObjectURL(data.imageBlob)
    }

    gameLoop.subscribe(this);

    return this;
  }

  create = () => {
    let width = Math.floor(Math.random()*2570+855)
    let height = Math.floor(Math.random()*1200+75)

    this.resizeImageWorker.postMessage({
      payload: {
        url : "/resources/hazes/haze_05.png",
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
      this.create();
    }
  }
}