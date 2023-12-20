'use strict'

class PropulsionIonB extends Propulsion{

  static resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.propulsion,
    filename : "propulsionSpriteSheet_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/propulsion/propulsion_01/images/propulsionSpriteSheet_03.png"
  })

  static imageResource;

  static async invoke(){
    PropulsionIonB.imageResource = await ResourceHandler.instance.fetchResource(PropulsionIonB.resourceObject);
  }

  constructor({
                canvas,
                posDX,
                posDY
              }){
    super({
      spriteSheet :  PropulsionIonB.imageResource.image,
      spriteSheetRows : 7,
      spriteSheetColumns : 1,
      width : PropulsionIonB.imageResource.image.width,
      height : PropulsionIonB.imageResource.image.height / 12,
      frames : 7,
      currentFrame : 0,
      step : 50,
      strideX : PropulsionIonB.imageResource.image.width / 1,
      strideY : PropulsionIonB.imageResource.image.height / 8,
      stride : PropulsionIonB.imageResource.image.height / 8,
      canvas : canvas,
      posDX : posDX,
      posDY : posDY,
      isHittable : false
    });
  }
}