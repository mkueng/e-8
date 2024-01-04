class ClassAPlayerShipExplosion extends Explosion {

  static imageResourceObject = new ResourceObject({
    id : "classAPlayerShipExplosion",
    filename : "explosion_02",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/explosions/explosion_02/images/explosion_02.png"
  })

  static soundResourceObject = new ResourceObject({
    id: "classAPlayerShipExplosionSound",
    filename: "explosion.wav",
    type: ResourceObject.TYPES.wav,
    resourcePath: "/resources/sounds/explosion.wav"
  })



  static async fetchSpriteSheet(resourceHandler){
    return await resourceHandler.fetchImageResource({
      resourceObject: ClassAPlayerShipExplosion.imageResourceObject
    });
  }

  static async fetchSound(resourceHandler){
    return await resourceHandler.fetchSoundResource({resourceObject: ClassAPlayerShipExplosion.soundResourceObject})
  }
    constructor({
                  canvas,
                  spriteSheetResource,
                  soundResource,
                  posX,
                  posY,
                  posDX,
                  posDY
    }){

    super({
      spriteSheet : spriteSheetResource.image,
      sound : soundResource,
      spriteSheetRows : 4,
      spriteSheetColumns : 8,
      width : 256,
      height : 151,
      frames : 32,
      currentFrame : 0,
      step : 50,
      stride : 0,
      strideX : spriteSheetResource.image.width / 8,
      strideY : spriteSheetResource.image.height / 4,
      canvas : canvas,
      posX : posX,
      posY : posY,
      posDX : posDX,
      posDY : posDY
    });
  }
}