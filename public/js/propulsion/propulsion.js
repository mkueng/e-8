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
   * @param efficiency
   * @param fuelType
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
                canvas,
                efficiency,
                fuelType
              }) {
    super({
      isActive: false,
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
      isHittable: false,
      animationLoop: true
    })
    this.efficiency = efficiency;
    this.fuelType = fuelType;
  }
}