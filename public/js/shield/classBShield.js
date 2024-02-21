'use strict'

class ClassBShield extends Shield {

  static soundResource;
  static imageResource;

  static resourceObject = new ResourceObject({
    category: ResourceObject.CATEGORIES.shield,
    name: "shield_sheet_05",
    fileName: "shield_sheet_05",
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
    ClassBShield.imageResource = await resourceHandler.fetchImageResource({
      resourceObject: ClassBShield.resourceObject
    });
    ClassBShield.soundResource = await resourceHandler.fetchSoundResource({
      resourceObject:ClassBShield.soundResourceObject
    });
  }

  constructor({
                canvas,
                posDX,
                posDY,
                relatedShip,
  }){
    super({
      canvas: canvas,
      currentFrame: 0,
      frames: 32,
      height: ClassBShield.imageResource.image.height /8,
      isHittable: false,
      posDX: posDX,
      posDY: posDY,
      sound: ClassBShield.soundResource,
      spriteSheet: ClassBShield.imageResource.image,
      spriteSheetColumns: 8,
      spriteSheetRows: 4,
      step: 50,
      strength: 400,
      stride: ClassBShield.imageResource.image.height / 32,
      strideX: ClassBShield.imageResource.image.width / 8,
      strideY: ClassBShield.imageResource.image.height /4,
      width: ClassBShield.imageResource.image.width / 6,
      relatedShip: relatedShip,
    });
  }
}