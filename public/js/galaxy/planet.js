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

   update(deltaTime) {
    if (!this.isActive) return;

    if (this.posX + this.posDX <= 0 - this.width) {
      this.destroy();
      this.dependencies.forEach(dependency => dependency.destroy());
    } else {
      this.posX += this.velX * deltaTime + PlayerShip.velX * this.posZ;
      this.posY -= PlayerShip.velY * this.posZ * deltaTime;
      this.dependencies.forEach(dependency => {
        dependency.posX = this.posX;
        dependency.posY = this.posY;
      });
    }
  }

}