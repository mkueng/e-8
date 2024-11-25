'use strict'
class EngineTrailParticle extends GameObject {

  constructor({
    image,
    canvas,
    posX,
    posY,
    posDX,
    posDY,
    velX,
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
      velX : velX,
      width,
      height,
      alpha: 1,
    });

    Object.assign(this, {
      fadeTime,
      velX
    });
  }

  update = ()=>{
    this.alpha -= this.alpha * this.fadeTime;
    this.posX = this.posX-PlayerShip.velX/2-this.velX;
    if (this.alpha <= 0.05) {
      this.destroy();
    }
  }
}