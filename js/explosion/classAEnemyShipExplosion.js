class ClassAEnemyShipExplosion extends Explosion {

  static resourceObject = new ResourceObject({
    id : "classAEnemyShipExplosion",
    filename : "explosion_03",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/explosions/explosion_03/images/explosion_03.png"
  })

  static imageResource

  static async invoke(){
    ClassAEnemyShipExplosion.imageResource = await ResourceHandler.instance.fetchResource(ClassAEnemyShipExplosion.resourceObject);
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
      spriteSheetRows : 6,
      spriteSheetColumns : 6,
      width : 159,
      height : 100,
      frames : 36,
      currentFrame : 0,
      step : 50,
      stride : 0,
      strideX :  ClassAEnemyShipExplosion.imageResource.image.width / 6,
      strideY :  ClassAEnemyShipExplosion.imageResource.image.height / 6,
      canvas : canvas,
      posX : posX,
      posY : posY,
      posDX : posDX,
      posDY : posDY
    });
  }
}