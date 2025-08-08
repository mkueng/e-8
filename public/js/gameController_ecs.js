class GameController_ecs {

  #resourceHandler = null;
  #canvasHandler = null;
  #factoryHandler = null;

  constructor(){

  }

  init = async () => {
    // Initialize the ECS framework, handlers, and other components
    this.#factoryHandler = new FactoryHandler({
      resourceHandler: e8.global.resourceHandler,
      canvasHandler: e8.global.canvasHandler
    });

    await this.#factoryHandler.createFactories();
    console.log("GameController_ecs initialized");
  }

  startGame = async () => {
    // Start the game logic, set up the game world, etc.
    console.log("GameController_ecs game started");
  }
}