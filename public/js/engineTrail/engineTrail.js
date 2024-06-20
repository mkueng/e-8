class EngineTrail {

  width;
  height;
  canvas;
  posDX;
  posDY;
  imageResource;

  constructor({
                fadeTime
              }){
    Object.assign(this, {
      fadeTime
    });
  }

  /**
   *
   * @param resourceHandler
   * @param resourceObject
   * @returns {Promise<void>}
   */
  invoke = async (resourceHandler, resourceObject) => {
    this.imageResource =  await resourceHandler.fetchImageResource({
      resourceObject: resourceObject
    });
  }

  /**
   *
   * @param posX
   * @param posY
   */
  createParticle = ({posX, posY}) => {
    const engineTrailParticle = new EngineTrailParticle({
      image: this.imageResource.image,
      canvas: this.canvas,
      width: this.imageResource.image.width,
      height: this.imageResource.image.height,
      posX: posX,
      posY: posY,
      posDX: this.posDX,
      posDY: this.posDY,
      fadeTime : this.fadeTime
    })

    GameObjectsHandler.instance.addGameObject(engineTrailParticle);
  }
}