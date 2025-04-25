'use strict'
class EngineTrail {

  /**
   *
   * @param fadeTime
   * @param velX
   */
  constructor({
                fadeTime,
                velX
              }){
    Object.assign(this, {
      fadeTime,
      velX
    });
  }

  /**
   *
   * @name invoke
   * @param resourceHandler
   * @param resourceObject
   * @returns {Promise<void>}
   */
  invoke = async ({
                    resourceHandler,
                    resourceObject
                  }) => {
    this.imageResource =  await resourceHandler.fetchImageResource({
      resourceObject: resourceObject
    });
  }

  /**
   *
   * @name createParticle
   * @param posX
   * @param posY
   */
  createParticle = ({posX, posY}) => {
    const engineTrailParticle = new EngineTrailParticle({
      canvas: this.canvas,
      fadeTime: this.fadeTime,
      height: this.imageResource.image.height,
      image: this.imageResource.image,
      posDX: this.posDX,
      posDY: this.posDY,
      posX: posX,
      posY: posY,
      velX: this.velX,
      width: this.imageResource.image.width
    })

    GameObjectsHandler.instance.addGameObject(engineTrailParticle);
  }
}