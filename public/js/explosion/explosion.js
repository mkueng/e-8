'use strict'
class Explosion extends GameObject {

  constructor({
    spriteSheet,
    sound,
    spriteSheetRows,
    spriteSheetColumns,
    frames,
    currentFrame,
    step,
    stride,
    strideX,
    strideY,
    width,
    height,
    posX,
    posY,
    velX,
    velY,
    posDX,
    posDY,
    canvas
              }){
    super({
      isActive: true,
      spriteSheet,
      sound,
      spriteSheetRows,
      spriteSheetColumns,
      frames,
      currentFrame,
      step,
      stride,
      strideX,
      strideY,
      width,
      height,
      posX,
      posY,
      velX,
      velY,
      posDX,
      posDY,
      canvas,
      isHittable : false,
      animationLoop : false
    });
  }

  update(dt) {
    console.log("this.posX", this.posX, "this.velX", this.velX);
    this.posX = this.posX  + this.velX;
    this.posY = this.posY + this.velY;
  }

}