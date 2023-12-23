class ClassAEnemyShipExplosion extends Explosion {

  static resourceObject = new ResourceObject({
    id : "classAEnemyShipExplosion",
    filename : "explosion_03",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/explosions/explosion_03/images/explosion_03.png"
  })

  static soundResourceObject = "/resources/sounds/explosion.wav"

  static async fetchSpriteSheet(resourceHandler){
    return await resourceHandler.fetchResource(ClassAEnemyShipExplosion.resourceObject);
  }

  static async fetchSound(){
    return await SoundHandler.fetchAudioAndReturnAudioBuffer(ClassAEnemyShipExplosion.soundResourceObject);
  }

  constructor({
                spriteSheetResource,
                soundResource,
                canvas,
                posX,
                posY,
                posDX,
                posDY
              }){

    super({
      spriteSheet : spriteSheetResource.image,
      sound: soundResource,
      spriteSheetRows : 6,
      spriteSheetColumns : 6,
      width : 159,
      height : 100,
      frames : 36,
      currentFrame : 0,
      step : 50,
      stride : 0,
      strideX :  spriteSheetResource.image.width / 6,
      strideY : spriteSheetResource.image.height / 6,
      canvas : canvas,
      posX : posX,
      posY : posY,
      posDX : posDX,
      posDY : posDY
    });
  }
}