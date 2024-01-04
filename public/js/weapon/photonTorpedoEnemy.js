'use strict'
class PhotonTorpedoEnemy extends Weapon{

  static resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    id : "photonTorpedo_02",
    filename : "photonTorpedo_02",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/weapon/photonTorpedo_02/images/photonTorpedo_02.png"
  })

  static imageResource;

  static async invoke(resourceHandler){
    PhotonTorpedoEnemy.imageResource = await resourceHandler.fetchImageResource({
      resourceObject: PhotonTorpedoEnemy.resourceObject
    });
  }

  constructor ({
                 canvas,
                 posDX,
                 posDY,
                 controlAssignment
               }) {
    super({
        identification : "enemyWeapon",
        uniqueIdentifier : "PhotonTorpedoEnemy",
        controlAssignment,
        canvas : canvas,
        image : PhotonTorpedoEnemy.imageResource.image,
        width : PhotonTorpedoEnemy.imageResource.image.width,
        height : PhotonTorpedoEnemy.imageResource.image.height,
        posX : 0,
        posY : 0,
        posDX : posDX,
        posDY : posDY,
        velX : -7,
        velY : 0,
        isHittable : false,
        isDestroyable : false
      })
    }
}