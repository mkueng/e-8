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
      identification: "planet",
      coordinates,
      image,
      width,
      hasMass: true,
      height,
      posX,
      posY,
      posYisFixed : true,
      posZ,
      posDX,
      posDY,
      velX,
      velY,
      canvas,
      isDestroyable: false
    })
  }
}