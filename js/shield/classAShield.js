'use strict'

class ClassAShield extends Shield {

  static resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.shield,
    filename : "shield_sheet",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/shields/shield_sheet_02.png"
  })

  static imageResource;

  static async invoke(){
    ClassAShield.imageResource = await ResourceHandler.instance.fetchResource(ClassAShield.resourceObject);
  }

  constructor({
    relatedShip,
    canvas,
    posDX,
    posDY
  }){
    super({
      relatedShip : relatedShip,
      spriteSheet : ClassAShield.imageResource.image,
      spriteSheetRows : 4,
      spriteSheetColumns : 8,
      width : ClassAShield.imageResource.image.width / 8+50,
      height : ClassAShield.imageResource.image.height /4+50,
      frames : 32,
      currentFrame : 0,
      step : 50,
      strideX : ClassAShield.imageResource.image.width / 8,
      strideY : ClassAShield.imageResource.image.height /4,
      stride : ClassAShield.imageResource.image.height / 32,
      canvas : canvas,
      posDX : posDX,
      posDY : posDY,
      isHittable : false,
      strength : 100
    });
  }
}