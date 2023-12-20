'use strict'
class PhotonTorpedo extends Weapon{

  static resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    id : "photonTorpedo_01",
    filename : "photonTorpedo_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/weapon/photonTorpedo_01/images/photonTorpedo_01.png"
  })

  static imageResource;

  static async invoke(resourceHandler){
    PhotonTorpedo.imageResource = await resourceHandler.fetchResource(PhotonTorpedo.resourceObject);
  }

  constructor ({
                 canvas,
                 posDX,
                 posDY,
                 controlAssignment
  }) {
    super({
      identification : "weaponPlayer",
      uniqueIdentifier : "PhotonTorpedo",
      controlAssignment,
      canvas : canvas,
      image : PhotonTorpedo.imageResource.image,
      width : PhotonTorpedo.imageResource.image.width,
      height : PhotonTorpedo.imageResource.image.height,
      posX : 0,
      posY : 0,
      posDX : posDX,
      posDY : posDY,
      velX : 10,
      velY : 0,
      isHittable : false,
      isDestroyable : false
    })
  }


}