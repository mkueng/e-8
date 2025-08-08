'use strict'

class FireAndForget {

  static soundResource;
  static imageResource;

  static imageResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    name : "photonTorpedoFireAndForget_01",
    fileName : "photonTorpedoFireAndForget_01",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/weapon/photonTorpedoFireAndForget/images/"
  })

  static soundResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.weapon,
    id : "photonShoot",
    filename : "photonShoot",
    type : ResourceObject.TYPES.wav,
    resourcePath : "/resources/sounds/photonFireAndForget.wav"
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
    FireAndForget.imageResource = await this.resourceHandler.fetchImageResource({
      resourceObject: FireAndForget.imageResourceObject
    });
    FireAndForget.soundResource = await this.resourceHandler.fetchSoundResource({
      resourceObject: FireAndForget.soundResourceObject
    });
  }
}