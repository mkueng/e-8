'use strict'
class ShieldFactory {

  static SHIELD_TYPES = {
    shieldA : "shieldA",
    shieldB : "shieldB"
  }

  constructor({resourceHandler}){
    this.resourceHandler = resourceHandler;
  };

  fetchResources = async ()=>{
    for (let type in ShieldFactory.SHIELD_TYPES) {
      ShieldTypes[type].imageResource = await this.resourceHandler.fetchImageResource({resourceObject: ShieldTypes[type].imageResourceObject});
    }
  }

    /**
     *
     * @param canvas
     * @param width
     * @param height
     * @param posDX
     * @param posDY
     * @param type
     * @param relatedShip
     * @returns {Shield}
     */
  createShield = ({
                      canvas,
                      width,
                      height,
                      posDX,
                      posDY,
                      type,
                      relatedShip,
  })=>{
    return new Shield({
        canvas: canvas,
        currentFrame: 0,
        frames: ShieldTypes[type].frames,
        isActive: true,
        isHittable: true,
        posDX: posDX,
        posDY: posDY,
        relatedShip: relatedShip,
        spriteSheetColumns: ShieldTypes[type].spriteSheetColumns,
        spriteSheetRows: ShieldTypes[type].spriteSheetRows,
        strideX: ShieldTypes[type].imageResource.image.width / ShieldTypes[type].spriteSheetColumns,
        strideY: ShieldTypes[type].imageResource.image.height / ShieldTypes[type].spriteSheetRows,
        stride: ShieldTypes[type].imageResource.image.height /  ShieldTypes[type].frames,
        width: width,
        height: height,
        spriteSheet: ShieldTypes[type].imageResource.image,
        strength: ShieldTypes[type].strength
    });
  };
}