'use strict'
class HazeHandler {

  #ticker = 0;
  #upcoming = 0;
  #canvases = {};

  constructor({gameLoop, canvasHandler, resizeImageWorker}){
    this.#canvases[0] = canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundFront).canvas;
    this.#canvases[1] = canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundMiddle).canvas;
    this.#canvases[2] = canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundFar).canvas;
    this.resizeImageWorker = resizeImageWorker;
    this.#upcoming = Math.floor(Math.random()*5+10);

    resizeImageWorker.onmessage = ({data}) =>{

      //const canvasNumber = Math.floor(Math.random()*3);
      let canvas;
      let img = new Image();

      img.onload =()=>{
        const size = img.width * img.height;
        const velocity = size * 0.0000007;
        console.log("velocity: ", velocity);

        if (velocity >= 1 ) canvas = this.#canvases[0];
        if (velocity > 0.5 && velocity < 1) canvas = this.#canvases[1];
        if (velocity <= 0.5) canvas = this.#canvases[2];

        console.log("canvas:", canvas);

        let haze = new Haze({
          canvas: canvas,
          image: img,
          width: img.width,
          height: img.height,
          posX: e8.global.screenWidth,
          posY: Math.floor(Math.random()* e8.global.screenHeight-300),
          posDX: 0,
          posDY: 0,
          velX: -1 * velocity,
          velY: 0
        })

        GameObjectsHandler.instance.addGameObject(haze);

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
    let width = Math.floor(Math.random()*1700+2559)
    let height = Math.floor(Math.random()*1200+750)

    this.resizeImageWorker.postMessage({
      payload: {
        url : "/resources/hazes/haze_04.png",
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
      this.#upcoming = Math.floor(Math.random()*20+20);
      this.create();
    }
  }
}