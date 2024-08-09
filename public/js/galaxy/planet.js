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
                posZFixed,
                posDX,
                posDY,
                velX,
                velY,
                canvas
              }) {
    super({
      isActive: true,
      identification: "planet",
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
      canvas,
      isDestroyable: false
    })
    this.posZfixed = posZFixed;
  }

   update(deltaTime) {
    if (!this.isActive) return;

    if (this.posX + this.posDX <= 0 - this.width) {
      this.destroy();
    } else {
      this.posX += this.velX * deltaTime + PlayerShip.velX * this.posZfixed;
    }
  }
}