'use strict'
class EngineTrailA {

  static imageResource;

  static resourceObject = new ResourceObject({
    category: ResourceObject.CATEGORIES.propulsion,
    name: "engineTrailA",
    fileName: "trail_01",
    fileType: ResourceObject.TYPES.png,
    resourcePath: "/resources/trail/trail_01/images/"
  })

  static async invoke(resourceHandler) {
    EngineTrailA.imageResource = await resourceHandler.fetchImageResource({
      resourceObject: EngineTrailA.resourceObject
    });
  }

  constructor({
                canvas,
                posDX,
                posDY,
                width,
                height
              }){
    Object.assign(this, {
      canvas, posDX, posDY, width, height
    })
  }

  create = ({posX, posY}) =>{
    const engineTrail = new EngineTrail({
      image: EngineTrailA.imageResource.image,
      canvas: this.canvas,
      width: 5,
      height: 7,
      posX: posX,
      posY: posY,
      posDX: this.posDX,
      posDY: this.posDY
    })

    GameObjectsHandler.instance.addGameObject(engineTrail);
  }
}