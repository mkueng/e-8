class ClassAPlayerShipExplosion extends Explosion {

  static resourceObject = new ResourceObject({
    id : "explosion01ClassA",
    filename : "explosion_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/explosions/explosion_02/images/explosion_02.png"
  })

  static soundResourceObject = "/resources/sounds/explosion.wav"

  static async fetchSpriteSheet(resourceHandler){
    return await resourceHandler.fetchResource(ClassAPlayerShipExplosion.resourceObject);
  }

  static async fetchSound(){
    return await SoundHandler.fetchAudioAndReturnAudioBuffer(ClassAPlayerShipExplosion.soundResourceObject);
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