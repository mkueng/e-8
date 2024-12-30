'use strict'
class HazeHandler {

  #resourcePaths =[ "/resources/hazes/haze_01.png", "/resources/hazes/haze_02.png"];
  #upcoming = 0;
  #canvases = {};
  #colorKeys = [];

  constructor(){
  }

  init = async () =>{
    this.#canvases[0] = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundFace).canvas;
    this.#canvases[1] = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundFar).canvas;
    this.#canvases[2] = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundFarthest).canvas;
    this.resizeImageWorker = e8.global.resizeImageWorker;
    this.#upcoming = 100;
    this.#colorKeys = Object.keys(e8.global.colors);


    this.heartBeat();

    e8.global.resizeImageWorker.onmessage = ({data}) =>{
      this.#createHaze(data);
    }
  }

  #createHaze = (data) =>{
    let canvas;
    let img = new Image();

    img.onload =()=>{
      const size = img.width;
      const posZ = Math.floor(Math.random()*75+5);

      if (posZ >= 60 ) canvas = this.#canvases[2];
      else  if (posZ >= 10 && posZ < 60) canvas = this.#canvases[1];
      else canvas = this.#canvases[0];


      let haze = new Haze({
        canvas: canvas,
        image: img,
        width: img.width,
        height: img.height,
        posX: e8.global.screenWidth,
        posY: Math.floor(Math.random()* e8.global.screenHeight-img.height/3),
        posZ: posZ,
        posDX: 0,
        posDY: 0,
        velX: 0,
        velY: 0
      })

      GameObjectsHandler.instance.addGameObject(haze);
      //releasing object URL
      URL.revokeObjectURL(img.src);
    }

    // create object URL with imageBlob
    img.src = URL.createObjectURL(data.imageBlob)

  }



  #invokeHaze = () => {
    let width = Math.floor(Math.random()*4570+2455);
    let height = Math.floor(Math.random()*2200+375);
    let color = e8.global.colors[this.#colorKeys[Math.floor(Math.random()*this.#colorKeys.length)]];

    let randomIndex = Math.floor(Math.random() * this.#resourcePaths.length);
    let resourcePath = this.#resourcePaths[randomIndex];

    this.resizeImageWorker.postMessage({
      payload: {
        url : resourcePath,
        requiredWidth: width,
        requiredHeight : height,
        color : color
      }
    })
  }

  /**
   *
   * @param data
   */
  heartBeat = (data) => {
    setInterval(() => {
      if (PlayerShip.coordinates > this.#upcoming) {
        this.#upcoming = PlayerShip.coordinates + Math.floor(Math.random()*105000+100000);
        this.#invokeHaze();
      }
    },1000)

  }

}