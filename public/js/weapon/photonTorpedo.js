'use strict'
class PhotonTorpedo extends Weapon{

  static imageResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    name : "photonTorpedo_01",
    fileName : "photonTorpedo_01",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/weapon/photonTorpedo_01/images/"
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

  static async init(){
    PhotonTorpedo.imageResource = await e8.global.resourceHandler.fetchImageResource({
      resourceObject: PhotonTorpedo.imageResourceObject
    });
    PhotonTorpedo.soundResource = await e8.global.resourceHandler.fetchSoundResource({
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
      identification: "weaponPlayer",
      controlAssignment,
      canvas: canvas,
      image: PhotonTorpedo.imageResource.image,
      sound: PhotonTorpedo.soundResource,
      width: PhotonTorpedo.imageResource.image.width,
      height: PhotonTorpedo.imageResource.image.height,
      posX: 0,
      posY: 0,
      posDX: posDX,
      posDY: posDY,
      velX: 20,
      velY: 0,
      isHittable: false,
      isDestroyable: false
    })

    this.uniqueIdentifier = this.constructor.name;
    this.ready = true;
  }

  /**
   *
   * @param hitBy
   */
  hit = (hitBy) => {
    if (hitBy.identification !== "playerShip") {
      this.destroy();
    }
  }
}