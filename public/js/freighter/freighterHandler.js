class FreighterHandler {

  static freighters = {};

  #freighterFactory = null;
  #canvasObject = {};
  #freighterTypes = {
    0: "classAFreighter",
    1: "classBFreighter"
  }

  constructor(){
    this.resourceHandler = e8.global.resourceHandler;
    this.#canvasObject = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.playerShip);
    this.propulsionFactory = e8.global.propulsionFactory;
    this.engineTrailFactory = e8.global.engineTrailFactory;

    this.#freighterFactory = new FreighterFactory({
      resourceHandler: this.resourceHandler,
      propulsionFactory: this.propulsionFactory,
      engineTrailFactory: this.engineTrailFactory,
    });

  }

  init = async () => {
    await this.#freighterFactory.invoke({resourceHandler: this.resourceHandler})
  }

  create = async ()=>{
    let freighterTypeProps = this.#freighterTypes[Math.random() > 0.5 ? 0 : 1];
    const freighter = await this.#freighterFactory.createFreighter({
      freighterType:FreighterFactory.FREIGHTER_TYPES[freighterTypeProps],
      canvas: this.#canvasObject.canvas,
      context: this.#canvasObject.context,
      posX : e8.global.screenWidth,
      posY : Math.floor(Math.random()*(e8.global.screenHeight-500)+200),
      posZ : -0.05
    })

    GameObjectsHandler.instance.addGameObject(freighter);
    FreighterHandler.freighters[freighter.id] = freighter;
  }
}