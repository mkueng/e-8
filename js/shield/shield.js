class Shield extends GameObject {

  constructor({
                relatedShip,
                spriteSheet,
                spriteSheetRows,
                spriteSheetColumns,
                width,
                height,
                frames,
                currentFrame,
                step,
                stride,
                strideX,
                strideY,
                posX,
                posY,
                posDX,
                posDY,
                canvas,
                strength
              }) {
    super({
      spriteSheet,
      spriteSheetRows,
      spriteSheetColumns,
      width,
      height,
      frames,
      currentFrame,
      step,
      stride,
      strideX,
      strideY,
      posX,
      posY,
      posDX,
      posDY,
      canvas,
      isHitable : false,
      animationLoop : false
    })
    this.strength = strength;
    this.relatedShip = relatedShip;
  }


  update(dt) {
    this.posX = this.relatedShip.posX;
    this.posY = this.relatedShip.posY;
  }

}