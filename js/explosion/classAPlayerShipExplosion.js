class ClassAPlayerShipExplosion extends Explosion {

  static resourceObject = new ResourceObject({
    id : "explosion01ClassA",
    filename : "explosion_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/explosions/explosion_02/images/explosion_02.png"
  })

  static imageResource

  static async invoke(){
    ClassAPlayerShipExplosion.imageResource = await ResourceHandler.instance.fetchResource(ClassAPlayerShipExplosion.resourceObject);
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