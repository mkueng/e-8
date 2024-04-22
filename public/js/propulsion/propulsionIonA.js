'use strict'
class PropulsionIonA extends Propulsion{

  static resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.propulsion,
    name: "propulsionSpriteSheet_01",
    fileName: "propulsionSpriteSheet_01",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/propulsion/propulsion_01/images/"
  })

  constructor({
                canvas,
                posDX,
                posDY,
                isActive
  }){
    super({
      spriteSheet: PropulsionIonA.imageResource.image,
      spriteSheetRows: 7,
      spriteSheetColumns: 1,
      animationLoop: true,
      width: PropulsionIonA.imageResource.image.width,
      height: PropulsionIonA.imageResource.image.height / 12,
      frames: 7,
      currentFrame : 0,
      step: 50,
      strideX: PropulsionIonA.imageResource.image.width / 1,
      strideY: PropulsionIonA.imageResource.image.height / 8,
      stride: PropulsionIonA.imageResource.image.height / 8,
      canvas: canvas,
      posDX: posDX,
      posDY: posDY,
      efficiency: 0.5,
      fuelType: FuelFactory.FUEL_TYPES.xenon,
      isHittable: false,
      isActive : isActive || false
    });
  }
}