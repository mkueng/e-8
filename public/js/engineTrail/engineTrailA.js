class EngineTrailA extends EngineTrail {

  static resourceObject = new ResourceObject({
    id: "engineTrailA",
    filename : "trail_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/trail/trail_01/images/trail_01.png"
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