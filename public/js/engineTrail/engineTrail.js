'use strict'
class EngineTrail extends GameObject {

  constructor({
    image,
    canvas,
    posX,
    posY,
    posDX,
    posDY,
    width,
    height
              }){
    super({
      isActive: true,
      image,
      canvas,
      posX,
      posY,
      posDX,
      posDY,
      width,
      height,
      alpha: 1,
    });
  }

  update = ()=>{
    //trail decay
    this.alpha -= 0.05;
    if (this.alpha <= 0.1) {
      this.destroy();
    }
  }
}