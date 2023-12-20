class Explosion extends GameObject {

  constructor({
    spriteSheet,
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
      spriteSheet,
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
      isHitable : false,
      animationLoop : false
    });
  }

  update(dt) {
    this.posX = this.posX  + this.velX;
    this.posY = this.posY + this.velY;
  }
}