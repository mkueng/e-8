'use strict'
class Planet extends GameObject {

  constructor({
    coordinates,
                image,
                width,
                height,
                posX,
                posY,
                posZ,
                posDX,
                posDY,
                velX,
                velY,
                canvas
              }) {
    super({
      isActive: true,
      coordinates,
        identification: "planet",
      image,
      width,
      height,
      posX,
      posY,
      posZ,
      posDX,
      posDY,
      velX,
      velY,
      canvas,
      isDestroyable: false
    })
  }
/*
  update=(deltaTime)=>{
    if (this.posX > (-this.width)) {
      this.posX = this.posX + ((this.velX * deltaTime)-PlayerShip.velX/10);
    } else {
      this.destroy();
    }
  }*/
}