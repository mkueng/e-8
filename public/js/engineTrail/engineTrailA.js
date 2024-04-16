'use strict'
class EngineTrailA extends EngineTrail {

  static resourceObject = new ResourceObject({
    category: ResourceObject.CATEGORIES.propulsion,
    name: "engineTrailA",
    fileName: "trail_01",
    fileType: ResourceObject.TYPES.png,
    resourcePath: "/resources/trail/trail_01/images/"
  })

  constructor() {
    super({
      fadeTime : 0.09
    });
  }
}