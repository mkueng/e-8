'use strict'
class PropulsionIonB extends Propulsion{

  static imageResource;

  static resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.propulsion,
    name: "propulsionSpriteSheet_01",
    fileName: "propulsionSpriteSheet_01",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/propulsion/propulsion_01/images/"
  })


  static async invoke(resourceHandler){
    PropulsionIonB.imageResource = await resourceHandler.fetchImageResource(PropulsionIonB.resourceObject);
  }

  constructor({
                canvas,
                posDX,
                posDY
              }){
    super({
      spriteSheet: PropulsionIonB.imageResource.image,
      spriteSheetRows: 7,
      spriteSheetColumns: 1,
      width: PropulsionIonB.imageResource.image.width,
      height: PropulsionIonB.imageResource.image.height / 12,
      frames: 7,
      currentFrame: 0,
      step: 50,
      strideX: PropulsionIonB.imageResource.image.width / 1,
      strideY: PropulsionIonB.imageResource.image.height / 8,
      stride: PropulsionIonB.imageResource.image.height / 8,
      canvas: canvas,
      posDX: posDX,
      posDY: posDY,
      isHittable: false
    });
  }
}