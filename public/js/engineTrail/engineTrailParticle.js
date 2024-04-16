'use strict'
class EngineTrailParticle extends GameObject {

  constructor({
    image,
    canvas,
    posX,
    posY,
    posDX,
    posDY,
    width,
    height,
    fadeTime
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

    Object.assign(this, {
      fadeTime
    });
  }

  update = ()=>{
    this.alpha -= this.alpha * this.fadeTime;
    if (this.alpha <= 0.05) {
      this.destroy();
    }
  }
}