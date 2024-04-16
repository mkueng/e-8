class FreighterHandler {

  static freighters = {};

  #freighterFactory = null;
  #canvasObject = {};

  constructor({
                resourceHandler,
                canvasHandler,
                propulsionFactory,
    engineTrailFactory

  }){
    this.resourceHandler = resourceHandler;
    this.#canvasObject = canvasHandler.getCanvas(CanvasHandler.canvasTypes.playerShip);
    this.#freighterFactory = new FreighterFactory({
      resourceHandler,
      propulsionFactory,
      engineTrailFactory
    });

  }

  invoke = async () => {
    await this.#freighterFactory.invoke({resourceHandler: this.resourceHandler})
  }

  create = async ()=>{
    const freighter = await this.#freighterFactory.createFreighter({
      freighterType:FreighterFactory.FREIGHTER_TYPES.classAFreighter,
      canvas: this.#canvasObject.canvas,
      context: this.#canvasObject.context,
      posX : e8.global.screenWidth-400,
      posY : Math.floor(Math.random()*(e8.global.screenHeight-500)+200)
    })

    //GameObjectsHandler.instance.addGameObject(freighter);
    FreighterHandler.freighters[freighter.id] = freighter;
  }
}