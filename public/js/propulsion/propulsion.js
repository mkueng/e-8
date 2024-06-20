class Propulsion extends GameObject {
    imageResource;
    efficiency;
    fuelType;

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
   * @param isActive
   */
  constructor({
                spriteSheet,
                spriteSheetRows,
                spriteSheetColumns,
                width,
                height,
                frames,
                currentFrame,
                stride,
                strideX,
                strideY,
                posX,
                posY,
                posDX,
                posDY,
                canvas,
                efficiency,
                fuelType,
                isActive,
    animationLoop
              }) {
    super({
      isActive: isActive || false,
      spriteSheet,
      spriteSheetRows,
      spriteSheetColumns,
      width,
      height,
      frames,
      currentFrame,
      stride,
      strideX,
      strideY,
      posX,
      posY,
      posDX,
      posDY,
      canvas,
      isHittable: false,
      animationLoop: animationLoop || false
    })

    this.efficiency = efficiency;
    this.fuelType = fuelType;
  }
}