'use strict'
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
                dependencies,
                engineTrail
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

    Object.assign(this,{
      shield,
      terminationSequence,
      cargo,
      dependencies,
      engineTrail
    })

    GameObjectsHandler.instance.addGameObject(this);
    this.addDependencies();


  };

  update(deltaTime) {
    if (this.isActive) {
      if (this.posX+this.posDX > 0 - this.width) {
        this.posX = this.posX + (this.velX*deltaTime)
      } else {
        this.destroy();
        if (this.dependencies) {
          for (const dependency of this.dependencies){
            dependency.destroy();
          }
        }
      }
      this.posY = this.posY +(this.velY*deltaTime);

      // positioning dependencies
      if (this.dependencies) {
        for (const dependency of this.dependencies){
          dependency.posX = this.posX;
          dependency.posY = this.posY;
        }
      }
      this.engineTrail.createParticle({posX: this.posX, posY: this.posY});
    }
  }

}