'use strict'
class PropulsionIonC extends Propulsion{

  static imageResource;

  static resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.propulsion,
    name: "propulsion_03",
    fileName: "propulsion_03",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/propulsion/propulsion_03/"
  })



  static async invoke(resourceHandler){
    PropulsionIonC.imageResource = await resourceHandler.fetchImageResource({
      resourceObject: PropulsionIonC.resourceObject
    });
  }

  constructor({
                canvas,
                posDX,
                posDY,
                isActive
              }){
    super({
      spriteSheet: PropulsionIonC.imageResource.image,
      spriteSheetRows: 6,
      spriteSheetColumns: 1,
      width: PropulsionIonC.imageResource.image.width,
      height: PropulsionIonC.imageResource.image.height / 6,
      frames: 6,
      currentFrame : 0,
      step: 50,
      strideX: PropulsionIonC.imageResource.image.width / 1,
      strideY: PropulsionIonC.imageResource.image.height / 6,
      stride: PropulsionIonC.imageResource.image.height / 6,
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