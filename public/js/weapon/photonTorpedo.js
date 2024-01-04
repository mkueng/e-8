'use strict'
class PhotonTorpedo extends Weapon{

  static imageResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    id : "photonTorpedo_01",
    filename : "photonTorpedo_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/weapon/photonTorpedo_01/images/photonTorpedo_01.png"
  })

  static soundResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    id : "photonShoot",
    filename : "photonShoot",
    type : ResourceObject.TYPES.wav,
    resourcePath : "/resources/sounds/photonShoot.wav"
  })

  static soundResource;
  static imageResource;

  static async invoke(resourceHandler){
    PhotonTorpedo.imageResource = await resourceHandler.fetchImageResource({
      resourceObject: PhotonTorpedo.imageResourceObject
    });
    PhotonTorpedo.soundResource = await resourceHandler.fetchSoundResource({
      resourceObject: PhotonTorpedo.soundResourceObject
    });
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
      sound : PhotonTorpedo.soundResource,
      width : PhotonTorpedo.imageResource.image.width,
      height : PhotonTorpedo.imageResource.image.height,
      posX : 0,
      posY : 0,
      posDX : posDX,
      posDY : posDY,
      velX : 15,
      velY : 0,
      isHittable : false,
      isDestroyable : false
    })

    this.ready = true;
  }


}