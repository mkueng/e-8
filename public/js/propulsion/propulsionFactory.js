'use strict'
class PropulsionFactory {

  static PROPULSION_TYPES = {
    ionA : "ionA",
    ionB : "ionB",
    ionC : "ionC",
    throttle : "throttle",
    spinner: "spinner"
  }

  /**
   *
   * @param resourceHandler
   */
  constructor({
                resourceHandler
  }){
    Object.assign(this, {
      resourceHandler
    });
  }

  /**
   *
   * @returns {Promise<void>}
   */
  init = async () => {
    for (let type in PropulsionFactory.PROPULSION_TYPES) {
      PropulsionTypes[type].imageResource = await this.resourceHandler.fetchImageResource({resourceObject: PropulsionTypes[type].imageResourceObject});
    }
  }

  /**
   *
   * @param type
   * @param canvas
   * @param posDX
   * @param posDY
   * @param isActive
   * @returns {Propulsion}
   */
  createPropulsion = ({
                        type,
                        canvas,
                        posDX,
                        posDY,
                        isActive
  }) => {

    return new Propulsion({
      canvas: canvas,
      currentFrame: 0,
      efficiency: PropulsionTypes[type].efficiency,
      frames: PropulsionTypes[type].frames,
      fuelType: FuelFactory.FUEL_TYPES.xenon,
      height: PropulsionTypes[type].imageResource.image.height / PropulsionTypes[type].spriteSheetRows,
      isActive: isActive,
      isHittable: false,
      posDX: posDX,
      posDY: posDY,
      posX: e8.global.screenWidth + e8.global.screenWidth,
      posY: null,
      spriteSheetColumns: PropulsionTypes[type].spriteSheetColumns,
      spriteSheetRows: PropulsionTypes[type].spriteSheetRows,
      strideX: PropulsionTypes[type].imageResource.image.width / 1,
      strideY: PropulsionTypes[type].imageResource.image.height / PropulsionTypes[type].spriteSheetRows,
      stride: PropulsionTypes[type].imageResource.image.height / PropulsionTypes[type].spriteSheetRows,
      width: PropulsionTypes[type].imageResource.image.width,
      spriteSheet: PropulsionTypes[type].imageResource.image,
      image:  null,
      animationLoop: PropulsionTypes[type].animationLoop
    })
  }
}