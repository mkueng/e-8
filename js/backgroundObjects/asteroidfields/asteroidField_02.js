'use strict'
class AsteroidField_02 extends BackgroundObject {

  constructor(args={}){
    super({
      id : "asteroidField_02",
      width: 980,
      height : 978,
      x : 500,
      y : args.y || 150,
      step : args.step || 30,
      canvasId : args.canvasId || "backgroundFar",
      onStage : args.onStage || 0,
      interval : args.interval || 0

    })
  }
}