'use strict'
class EngineTrailParticle extends GameObject {

  constructor({
                canvas,
                fadeTime,
                height,
                image,
                posDX,
                posDY,
                posX,
                posY,
                velX,
                width
              }){
    super({
      alpha: 1,
      canvas,
      height,
      image,
      isActive: true,
      posDX,
      posDY,
      posX,
      posY,
      velX: velX,
      width
    });

    Object.assign(this, {
      fadeTime,
      velX
    });
  }

  /**
   * @name update
   */
  update = ()=>{
    this.alpha -= this.alpha * this.fadeTime;
    this.posX = this.posX-PlayerShip.velX/2-this.velX;
    if (this.alpha <= 0.05) {
      this.destroy();
    }
  }
}