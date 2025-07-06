'use strict'

class Shield extends GameObject {

  #relatedShip = null;

  /**
   *
   * @param canvas
   * @param currentFrame
   * @param frames
   * @param height
   * @param isActive
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
   */
  constructor({
                canvas,
                currentFrame,
                frames,
                height,
                isActive,
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
                width
              }) {
    super({
      animationLoop: false,
      canvas,
      currentFrame,
      frames,
      height,
      identification: "shield",
      isActive: isActive || false,
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
      width
    })

    this.strength = strength;
  }

  set relatedShip(relatedShip) {
      this.#relatedShip = relatedShip;
      this.posX = relatedShip.posX;
      this.posY = relatedShip.posY;

  }
  /**
   *
   * @param deltaTime
   */
  update = (deltaTime) => {
    if (!this.isActive) return;
    this.posX = this.#relatedShip.posX;
    this.posY = this.#relatedShip.posY;
  }
}