'use strict'
class PhotonTorpedo extends Weapon{

  static soundResource;
  static imageResource;

  /**
   *
   * @type {ResourceObject}
   */
  static imageResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    name : "photonTorpedo_01",
    fileName : "photonTorpedo_01",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/weapon/photonTorpedo_01/images/"
  })

  /**
   *
   * @type {ResourceObject}
   */
  static soundResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    id : "photonShoot",
    filename : "photonShoot",
    type : ResourceObject.TYPES.wav,
    resourcePath : "/resources/sounds/photonShoot.wav"
  })

  /**
   *
   * @param resourceHandler
   * @returns {Promise<void>}
   */
  static async init({
                      resourceHandler
  }){

    Object.assign(this, {
      resourceHandler
    })
    PhotonTorpedo.imageResource = await this.resourceHandler.fetchImageResource({
      resourceObject: PhotonTorpedo.imageResourceObject
    });
    PhotonTorpedo.soundResource = await this.resourceHandler.fetchSoundResource({
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
      animationLoop: false,
      canvas: canvas,
      category: "playerWeapon",
      controlAssignment,
      height: PhotonTorpedo.imageResource.image.height,
      identification: "weaponPlayer",
      image: PhotonTorpedo.imageResource.image,
      isDestroyable: false,
      isHittable: false,
      posDX: posDX,
      posDY: posDY,
      posX: 0,
      posY: 0,
      sound: PhotonTorpedo.soundResource,
      vector: 1,
      velX: 40,
      velY: 0,
      width: PhotonTorpedo.imageResource.image.width
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