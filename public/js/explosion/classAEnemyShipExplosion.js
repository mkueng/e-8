'use strict'
class ClassAEnemyShipExplosion extends Explosion {

  static imageResource;
  static soundResource;

  static imageResourceObject = new ResourceObject({
    category: ResourceObject.CATEGORIES.explosion,
    name : "classAEnemyShipExplosion",
    fileName : "explosion_03",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/explosions/explosion_03/images/"
  })

  static soundResourceObject = new ResourceObject({
    id: "classAPlayerShipExplosionSound",
    filename: "explosion.wav",
    type: ResourceObject.TYPES.wav,
    resourcePath: "/resources/sounds/explosion.wav"
  })

  static async fetchSpriteSheet(resourceHandler){
    return await resourceHandler.fetchImageResource({
      resourceObject: ClassAEnemyShipExplosion.imageResourceObject
    });
  }

  static async invoke(resourceHandler){
    ClassAEnemyShipExplosion.imageResource = await resourceHandler.fetchImageResource({
      resourceObject: ClassAEnemyShipExplosion.imageResourceObject
    });
    ClassAEnemyShipExplosion.soundResource = await resourceHandler.fetchSoundResource({
      resourceObject: ClassAEnemyShipExplosion.soundResourceObject});
  }

  constructor({
                canvas,
                posX,
                posY,
                posDX,
                posDY
              }){

    super({
      spriteSheet : ClassAEnemyShipExplosion.imageResource.image,
      sound: ClassAEnemyShipExplosion.soundResource,
      spriteSheetRows : 6,
      spriteSheetColumns : 6,
      width : 159,
      height : 100,
      frames : 36,
      currentFrame : 0,
      step : 50,
      stride : 0,
      strideX :  ClassAEnemyShipExplosion.imageResource.image.width / 6,
      strideY : ClassAEnemyShipExplosion.imageResource.image.height / 6,
      canvas : canvas,
      posX : posX,
      posY : posY,
      posDX : posDX,
      posDY : posDY
    });
  }

  invoke = ()=>{

  }
}