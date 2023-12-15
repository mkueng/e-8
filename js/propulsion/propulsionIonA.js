'use strict'

class PropulsionIonA extends Propulsion{

  static resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.propulsion,
    filename : "propulsionSpriteSheet_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/propulsion/propulsion_01/images/propulsionSpriteSheet_01.png"
  })

  static imageResource;

  static async invoke(resourceHandler){
    PropulsionIonA.imageResource = await resourceHandler.fetchResource(PropulsionIonA.resourceObject);
  }

  constructor({
                canvas,
                posDX,
                posDY
  }){
    super({
      spriteSheet :  PropulsionIonA.imageResource.image,
      spriteSheetRows : 7,
      spriteSheetColumns : 1,
      width : PropulsionIonA.imageResource.image.width,
      height : PropulsionIonA.imageResource.image.height / 12,
      frames : 7,
      currentFrame : 0,
      step : 50,
      strideX : PropulsionIonA.imageResource.image.width / 1,
      strideY : PropulsionIonA.imageResource.image.height / 8,
      stride : PropulsionIonA.imageResource.image.height / 8,
      canvas : canvas,
      posDX : posDX,
      posDY : posDY,
      isHittable : false
    });
  }
}