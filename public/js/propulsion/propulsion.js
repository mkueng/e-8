class Propulsion extends GameObject {

  /**
   *
   * @param spriteSheet
   * @param spriteSheetRows
   * @param spriteSheetColumns
   * @param width
   * @param height
   * @param frames
   * @param currentFrame
   * @param step
   * @param stride
   * @param strideX
   * @param strideY
   * @param posX
   * @param posY
   * @param posDX
   * @param posDY
   * @param canvas
   */
  constructor({
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
                canvas
              }) {
    super({
      isActive: true,
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
      animationLoop : true
    })
  }
}