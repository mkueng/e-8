'use strict'
class PropulsionIonA extends Propulsion{

  static imageResource;

  static resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.propulsion,
    name: "propulsionSpriteSheet_01",
    fileName: "propulsionSpriteSheet_01",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/propulsion/propulsion_01/images/"
  })



  static async invoke(resourceHandler){
    PropulsionIonA.imageResource = await resourceHandler.fetchImageResource({
      resourceObject: PropulsionIonA.resourceObject
    });
  }

  constructor({
                canvas,
                posDX,
                posDY
  }){
    super({
      spriteSheet: PropulsionIonA.imageResource.image,
      spriteSheetRows: 7,
      spriteSheetColumns: 1,
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
      isHittable: false
    });
  }
}