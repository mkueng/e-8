'use strict'
class EngineTrailB extends EngineTrail {

  static resourceObject = new ResourceObject({
    category: ResourceObject.CATEGORIES.propulsion,
    name: "engineTrailB",
    fileName: "trail_02",
    fileType: ResourceObject.TYPES.png,
    resourcePath: "/resources/trail/trail_02/images/"
  })

  constructor() {
    super({
      fadeTime : 0.05
    });
  }
}