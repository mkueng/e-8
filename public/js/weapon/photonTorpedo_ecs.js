'use strict'

/**
 * @class PhotonTorpedo
 */
class PhotonTorpedo {

  static soundResource;
  static imageResource;

  /**
   *
   * @type {ResourceObject}
   */
  static imageResourceObject = new ResourceObject({
    category: ResourceObject.CATEGORIES.weapon,
    name: "photonTorpedo_01",
    fileName: "photonTorpedo_01",
    fileType: ResourceObject.TYPES.png,
    resourcePath: "/resources/weapon/photonTorpedo_01/images/"
  })

  /**
   *
   * @type {ResourceObject}
   */
  static soundResourceObject = new ResourceObject({
    category: ResourceObject.CATEGORIES.weapon,
    id: "photonShoot",
    filename: "photonShoot",
    type: ResourceObject.TYPES.wav,
    resourcePath: "/resources/sounds/photonShoot.wav"
  })

  /**
   *
   * @param resourceHandler
   * @returns {Promise<void>}
   */
  static async init({
                      resourceHandler
                    }) {

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

}