'use strict'
class PhotonTorpedoEnemy extends Weapon{

  static resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    name : "photonTorpedo_02",
    fileName : "photonTorpedo_02",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/weapon/photonTorpedo_02/images/"
  })

  static imageResource;

  static async init(){
    PhotonTorpedoEnemy.imageResource = await e8.global.resourceHandler.fetchImageResource({
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
        identification: "enemyWeapon",
        uniqueIdentifier: "PhotonTorpedoEnemy",
        controlAssignment,
        canvas: canvas,
        image: PhotonTorpedoEnemy.imageResource.image,
        width: PhotonTorpedoEnemy.imageResource.image.width,
        height: PhotonTorpedoEnemy.imageResource.image.height,
        posX: 0,
        posY: 0,
        posDX: posDX,
        posDY: posDY,
        velX: -7,
        velY: 0,
        isHittable: false,
        isDestroyable: false
      })
    }
}