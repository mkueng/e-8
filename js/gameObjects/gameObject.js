'use strict'

class GameObject {

  /**
   *
   * @param params
   */
  constructor(params){
    this.x = params.x || 0;
    this.y = params.y || 0;
    this.vx = params.vx || 0;
    this.vy = params.vy || 0;
    this.width = params.width || 0;
    this.height = params.height || 0;
    this.offScreenXLeft = 0-this.width;
    this.offscreenXRight = window.global.gameWidth+this.width;
    this.offScreenYTop = 0-this.height;
    this.offscreenYBottom = window.global.gameHeight+this.height;
    this.canvas = params.canvas;
    this.active = params.active || false;
    this.image = null;
    this.imageId = params.imageId || null;
    this.stage = this;

    this.resourceHandler = new ResourceHandler();

  }


  init = ()=>{
    return new Promise((resolve, reject) =>{
      this.resourceHandler.getResources([this.imageId]).then((image)=>{
        this.image = image;
        resolve()
      })
    })

  }

  setup=()=>{

  };


  activate(){};
  deactivate(){};
  destroy(){};
  render (dt){};
  update (dt){};
}