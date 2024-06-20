'use strict'
class ClassAEnemyShipExplosion extends Explosion {

  static imageResource;
  static soundResource;

  /**
   *
   * @type {ResourceObject}
   */
  static imageResourceObject = new ResourceObject({
    category: ResourceObject.CATEGORIES.explosion,
    name : "classAEnemyShipExplosion",
    fileName : "explosion_03",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/explosions/explosion_03/images/"
  })

  /**
   *
   * @type {ResourceObject}
   */
  static soundResourceObject = new ResourceObject({
    id: "classAPlayerShipExplosionSound",
    filename: "explosion.wav",
    type: ResourceObject.TYPES.wav,
    resourcePath: "/resources/sounds/explosionDeep.wav"
  })

  /**
   *
   * @param resourceHandler
   * @returns {Promise<*>}
   */
  static async fetchSpriteSheet(resourceHandler){
    return await resourceHandler.fetchImageResource({
      resourceObject: ClassAEnemyShipExplosion.imageResourceObject
    });
  }

  /**
   *
   * @returns {Promise<void>}
   */
  static async invoke(){
    ClassAEnemyShipExplosion.imageResource = await e8.global.resourceHandler.fetchImageResource({
      resourceObject: ClassAEnemyShipExplosion.imageResourceObject
    });
    ClassAEnemyShipExplosion.soundResource = await e8.global.resourceHandler.fetchSoundResource({
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
      spriteSheetRows : 2,
      spriteSheetColumns : 6,
      width : 159,
      height : 100,
      frames : 18,
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