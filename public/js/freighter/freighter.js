class Freighter extends GameObject{

  static fetchResources = async ({resourceHandler,imageResourceObject, soundResourceObject}) => {
    const resources = {};

    const fetchResource = async (resourceType, resourceObject) => {
      if (resourceObject) {
        resources[resourceType] = await resourceHandler[`fetch${resourceType}Resource`]({
          resourceObject
        });
      }
    };

    await Promise.all([
      fetchResource('Sound', soundResourceObject),
      fetchResource('Image', imageResourceObject)
    ]);

    return resources;
  }


  /**
   *
   * @param isActive
   * @param canvas
   * @param context
   * @param image
   * @param width
   * @param height
   * @param posX
   * @param posY
   * @param velX
   * @param velY
   * @param shield
   * @param terminationSequence
   * @param cargo
   * @param particleGenerator
   */
  constructor({
                isActive,
                canvas,
                context,
                image,
                width,
                height,
                posX,
                posY,
                velX,
                velY,
                shield,
                terminationSequence,
                cargo,
                particleGenerator
              }){
    super({
      isActive,
      canvas,
      context,
      image,
      width,
      height,
      posX,
      posY,
      velX,
      velY
    });

    console.log("cargo:", cargo);
    Object.assign(this,shield,terminationSequence)
    this.cargo = cargo;
  };

}