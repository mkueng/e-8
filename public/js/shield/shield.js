'use strict'

class Shield extends GameObject {

  /**
   *
   * @param canvas
   * @param currentFrame
   * @param frames
   * @param height
   * @param posDX
   * @param posDY
   * @param posX
   * @param posY
   * @param sound
   * @param spriteSheet
   * @param spriteSheetColumns
   * @param spriteSheetRows
   * @param step
   * @param strength
   * @param stride
   * @param strideX
   * @param strideY
   * @param width
   * @param relatedShip
   */
  constructor({
                canvas,
                currentFrame,
                frames,
                height,
                posDX,
                posDY,
                posX,
                posY,
                sound,
                spriteSheet,
                spriteSheetColumns,
                spriteSheetRows,
                step,
                strength,
                stride,
                strideX,
                strideY,
                width,
                relatedShip,
              }) {
    super({
      animationLoop: false,
      canvas,
      currentFrame,
      frames,
      height,
      isHittable: false,
      posDX,
      posDY,
      posX,
      posY,
      sound,
      spriteSheet,
      spriteSheetColumns,
      spriteSheetRows,
      step,
      stride,
      strideX,
      strideY,
      width,
      isActive: true,
    })
    this.strength = strength;
    this.relatedShip = relatedShip;
    console.log("relatedShip: ", relatedShip);
  }

  /**
   *
   * @param deltaTime
   */
  update(deltaTime) {
    this.posX = this.relatedShip.posX;
    this.posY = this.relatedShip.posY;
  }
}