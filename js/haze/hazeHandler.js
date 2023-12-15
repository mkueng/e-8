'use strict'
class HazeHandler {

  #ticker = 0;
  #upcoming = Math.floor(Math.random()*30+30);
  #canvas

  constructor({gameLoop, canvasHandler, resizeImageWorker}){
    this.#canvas = canvasHandler.getCanvas("backgroundMiddle").canvas;
    this.resizeImageWorker = resizeImageWorker;

    resizeImageWorker.onmessage = ({data}) =>{

      let img = new Image();
      img.onload =()=>{

        let hazeObject = new Haze({
          canvas : this.#canvas,
          image : img,
          width : img.width,
          height : img.height,
          posX  : 1500,
          posY : Math.floor(Math.random()*100),
          posDX : 0,
          posDY : 0,
          velX : -1.7,
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
    let width = Math.floor(Math.random()*1700+1700)
    let height = Math.floor(Math.random()*1000+800)
    this.resizeImageWorker.postMessage({
      payload: {
        url : "/resources/hazes/haze_01.png",
        requiredWidth: width,
        requiredHeight : height
      }
    })
  }

  update = ()=>{
    this.#ticker++;
    if (this.#ticker > this.#upcoming){
      this.#ticker = 0;
      this.#upcoming = Math.floor(Math.random()*200+200);
      this.create();
    }
  }
}