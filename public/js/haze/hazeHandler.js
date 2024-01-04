'use strict'
class HazeHandler {

  #ticker = 0;
  #upcoming = Math.floor(Math.random()*5+10);
  #canvas

  constructor({gameLoop, canvasHandler, resizeImageWorker}){
    this.#canvas = canvasHandler.getCanvas("backgroundMiddle").canvas;
    this.resizeImageWorker = resizeImageWorker;

    resizeImageWorker.onmessage = ({data}) =>{

      let img = new Image();
      img.onload =()=>{
        let size =-1* (img.width *img.height) *0.000001;
        let hazeObject = new Haze({
          canvas : this.#canvas,
          image : img,
          width : img.width,
          height : img.height,
          posX  : window.global.screenWidth,
          posY : Math.floor(Math.random()*100),
          posDX : 0,
          posDY : 0,
          velX :size,
          velY : 0
        })

        GameObjectsHandler.instance.addGameObject(hazeObject);
        URL.revokeObjectURL(img.src);
      }

      img.src = URL.createObjectURL(data.imageBlob)
    }

    gameLoop.subscribe(this);

    return this;
  }


  create = ()=>{
    let width = Math.floor(Math.random()*2700+1700)
    let height = Math.floor(Math.random()*1200+200)


    this.resizeImageWorker.postMessage({
      payload: {
        url : "/resources/hazes/haze_02.png",
        requiredWidth: width,
        requiredHeight : height
      }
    })
  }

  update = ()=>{


    this.#ticker++;
    if (this.#ticker > this.#upcoming){
      this.#ticker = 0;
      this.#upcoming = Math.floor(Math.random()*5+5);
      this.create();
    }
  }
}