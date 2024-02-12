'use strict'

class ClassAShield extends Shield {

  static soundResource;
  static imageResource;

  static resourceObject = new ResourceObject({
    category: ResourceObject.CATEGORIES.shield,
    name:  "shield_sheet_02",
    fileName: "shield_sheet_02",
    fileType: ResourceObject.TYPES.png,
    resourcePath: "/resources/shields/"
  })

  static soundResourceObject = new ResourceObject({
    category: ResourceObject.CATEGORIES.shield,
    filename: "shield",
    type: ResourceObject.TYPES.wav,
    resourcePath: "/resources/sounds/shield.wav"
  })

  static async invoke(resourceHandler){
    ClassAShield.imageResource = await resourceHandler.fetchImageResource({
      resourceObject: ClassAShield.resourceObject
    });
    ClassAShield.soundResource = await resourceHandler.fetchSoundResource({
      resourceObject:ClassAShield.soundResourceObject
    });
  }

  constructor({
                canvas,
                posDX,
                posDY,
                relatedShip
  }){
    super({
      canvas: canvas,
      currentFrame: 0,
      frames: 32,
      height: ClassAShield.imageResource.image.height /4+50,
      isHittable: false,
      posDX: posDX,
      posDY: posDY,
      sound: ClassAShield.soundResource,
      spriteSheet: ClassAShield.imageResource.image,
      spriteSheetColumns: 8,
      spriteSheetRows: 4,
      step: 50,
      strength: 100,
      stride: ClassAShield.imageResource.image.height / 32,
      strideX: ClassAShield.imageResource.image.width / 8,
      strideY: ClassAShield.imageResource.image.height /4,
      width: ClassAShield.imageResource.image.width / 8+50,
      relatedShip: relatedShip,
    });
  }
}