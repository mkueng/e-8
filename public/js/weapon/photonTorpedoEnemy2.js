'use strict'
class PhotonTorpedoEnemy2 extends Weapon{

  static resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    name : "photonTorpedo_03",
    fileName : "photonTorpedo_03",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/weapon/photonTorpedo_03/images/"
  })

  static imageResource;

  static async init({
    resourceHandler
                    }){
    PhotonTorpedoEnemy2.imageResource = await resourceHandler.fetchImageResource({
      resourceObject: PhotonTorpedoEnemy2.resourceObject
    });
  }

  constructor ({
                 canvas,
                 posDX,
                 posDY,
                 controlAssignment
               }) {
    super({
      animationLoop: false,
        identification: "enemyWeapon",
        uniqueIdentifier: "PhotonTorpedoEnemy2",
        controlAssignment,
        canvas: canvas,
        image: PhotonTorpedoEnemy2.imageResource.image,
        width: PhotonTorpedoEnemy2.imageResource.image.width,
        height: PhotonTorpedoEnemy2.imageResource.image.height,
        posX: 0,
        posY: 0,
        posZ: 0,
        posDX: posDX,
        posDY: posDY,
        velX: 20,
        velY: 0,
        vector: -1,
        isHittable: false,
        isDestroyable: false
      })
    }
}