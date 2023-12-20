class ClassAPlayerShipExplosion extends Explosion {

  static resourceObject = new ResourceObject({
    id : "explosion01ClassA",
    filename : "explosion_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/explosions/explosion_02/images/explosion_02.png"
  })

  static async fetchSpriteSheet(resourceHandler){
    return await resourceHandler.fetchResource(ClassAPlayerShipExplosion.resourceObject);
  }

    constructor({
                  canvas,
                  spriteSheetResource,
                  posX,
                  posY,
                  posDX,
                  posDY
    }){

    super({
      spriteSheet : spriteSheetResource.image,
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