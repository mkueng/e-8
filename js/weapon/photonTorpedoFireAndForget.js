'use strict'

class PhotonTorpedoFireAndForget extends Weapon {

  static resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    id : "photonTorpedoFireAndForget_01",
    filename : "photonTorpedoFireAndForget_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/weapon/photonTorpedoFireAndForget/images/photonTorpedoFireAndForget_01.png"
  })

  static imageResource;

  static async invoke(){
    PhotonTorpedoFireAndForget.imageResource = await ResourceHandler.instance.fetchResource(PhotonTorpedoFireAndForget.resourceObject);
  }

  constructor ({
                 canvas,
                 posDX,
                 posDY,
                 controlAssignment
               }){
    super({
      identification : "weaponPlayer",
      uniqueIdentifier : "PhotonTorpedoFireAndForget",
      controlAssignment,
      canvas : canvas,
      image : PhotonTorpedoFireAndForget.imageResource.image,
      width : PhotonTorpedoFireAndForget.imageResource.image.width,
      height : PhotonTorpedoFireAndForget.imageResource.image.height,
      posX : 0,
      posY : 0,
      posDX : posDX,
      posDY : posDY,
      velX : 5,
      velY : 0,
      isHittable : false,
      isDestroyable : false
    })

    this.target = null;

  }

  activate(posX, posY){
    if (Object.keys(EnemyShipHandler.enemyShips).length > 0){
      const key = Object.keys(EnemyShipHandler.enemyShips)[0];
      this.target = EnemyShipHandler.enemyShips[key];
    }
    super.activate(posX, posY);
  }

  update(){
    if (this.posX < window.global.screenWidth && this.posX > 0 && this.posY < window.global.screenHeight && this.posY >0) {
      let quotient = (this.target.posX - this.posX) / (this.target.posY - this.posY);
      this.posX = this.posX+this.velX;
      this.posY = (this.posY + (this.posX / quotient)*0.01);
    } else {
      this.destroy();
    }
  }
}

