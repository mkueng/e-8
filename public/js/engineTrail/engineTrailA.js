'use strict'
class EngineTrailA extends EngineTrail {

  static resourceObject = new ResourceObject({
    category: ResourceObject.CATEGORIES.propulsion,
    name: "engineTrailA",
    fileName : "trail_01",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/trail/trail_01/images/"
  })


  constructor({
    image,
    canvas,
    posX,
    posY,
    posDX,
    posDY,
    width,
    height
              }) {
    super({
      image,
      canvas,
      posX,
      posY,
      posDX,
      posDY,
      width,
      height
    });
  }


}