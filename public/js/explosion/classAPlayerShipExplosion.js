'use strict'
class ClassAPlayerShipExplosion extends Explosion {

  static imageResource;
  static soundResource;

  static imageResourceObject = new ResourceObject({
    category: ResourceObject.CATEGORIES.explosion,
    name : "classAPlayerShipExplosionImage",
    fileName : "explosion_02",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/explosions/explosion_02/images/"
  })

  static soundResourceObject = new ResourceObject({
    category: ResourceObject.CATEGORIES.explosion,
    name: "classAPlayerShipExplosionSound",
    filename: "explosion",
    type: ResourceObject.TYPES.wav,
    resourcePath: "/resources/sounds/explosion.wav"
  })

  static async invoke(resourceHandler){
    ClassAPlayerShipExplosion.imageResource = await e8.global.resourceHandler.fetchImageResource({
      resourceObject: ClassAPlayerShipExplosion.imageResourceObject
    });
    ClassAPlayerShipExplosion.soundResource = await e8.global.resourceHandler.fetchSoundResource({
      resourceObject: ClassAPlayerShipExplosion.soundResourceObject});

  }

    constructor({
                  canvas,
                  posX,
                  posY,
                  posDX,
                  posDY
    }){

    super({
      spriteSheet : ClassAPlayerShipExplosion.imageResource.image,
      sound : ClassAPlayerShipExplosion.soundResource,
      spriteSheetRows : 4,
      spriteSheetColumns : 8,
      width : 256,
      height : 151,
      frames : 32,
      currentFrame : 0,
      step : 50,
      stride : 0,
      strideX : ClassAPlayerShipExplosion.imageResource.image.width / 8,
      strideY : ClassAPlayerShipExplosion.imageResource.image.height / 4,
      canvas : canvas,
      posX : posX,
      posY : posY,
      posDX : posDX,
      posDY : posDY
    });
  }
}