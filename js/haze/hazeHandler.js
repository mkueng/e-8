'use strict'
class HazeHandler {

  static instance = new this();
  #ticker = 0;
  #upcoming = Math.floor(Math.random()*30+30);
  #canvas

  invoke = (resizeImageWorker)=>{
    this.#canvas = CanvasHandler.instance.getCanvas("haze").canvas;
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
          posY : Math.floor(Math.random()*200),
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

    GameLoop.instance.subscribe(this);

    return this;
  }


  create = ()=>{
    let width = Math.floor(Math.random()*1700+3700)
    let height = Math.floor(Math.random()*1200+1300)
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
      this.#upcoming = Math.floor(Math.random()*100+100);
      this.create();
    }
  }
}