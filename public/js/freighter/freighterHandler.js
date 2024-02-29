class FreighterHandler {

  static freighters = {};

  #freighterFactory = null;
  #canvasObject = {};

  constructor({
                resourceHandler,
                canvasHandler

  }){
    this.resourceHandler = resourceHandler;
    this.#canvasObject = canvasHandler.getCanvas(CanvasHandler.canvasTypes.playerShip);
    this.#freighterFactory = new FreighterFactory({resourceHandler});

  }

  invoke = async () => {
    await this.#freighterFactory.invoke({resourceHandler: this.resourceHandler})
  }

  create = async ()=>{
    const freighter = this.#freighterFactory.createFreighter({
      freighterType:FreighterFactory.FREIGHTER_TYPES.classAFreighter,
      canvas: this.#canvasObject.canvas,
      context: this.#canvasObject.context,
      posX : e8.global.screenWidth,
      posY : Math.floor(Math.random()*(e8.global.screenHeight-100)+200)
    })

    console.log("freighter: ", freighter);
    GameObjectsHandler.instance.addGameObject(freighter);
    FreighterHandler.freighters[freighter.id] = freighter;
  }
}