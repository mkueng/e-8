class AsteroidField_01 extends BackgroundObject {

  constructor(args={}){
    super({
      id : "asteroidField_01",
      width: 320,
      height : 301,
      x : 500,
      y : args.y || 150,
      step : args.step || 40,
      canvasId : args.canvasId || "backgroundInterim",
      onStage : args.onStage || 0,
      interval : args.interval || 0
    })
  }

}