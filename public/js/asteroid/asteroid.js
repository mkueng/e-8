'use strict'
class Asteroid extends GameObject{

  /**
   *
   * @param canvas
   * @param height
   * @param image
   * @param posDX
   * @param posDY
   * @param posX
   * @param posY
   * @param posZ
   * @param subscriber
   * @param velX
   * @param velY
   * @param width
   * @param rotation
   */
  constructor({
                canvas,
                height,
                image,
                posDX,
                posDY,
                posX,
                posY,
                posZ,
                subscriber,
                velX,
                velY,
                width,
                rotation
              }) {
  super({
      canvas,
      doNotCheckOutOfBoundsLeft : false,
      doNotCheckOutOfBoundsRight : true,
      hasMass: true,
      height,
      identification: "asteroid",
      image,
      posDX,
      posDY,
      posX,
      posY,
      posZ,
      subscriber,
      velX,
      velY,
      width,
      rotation,
      vector: -1,
      isActive: false
    });
  }
}