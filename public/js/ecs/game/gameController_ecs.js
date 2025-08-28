"use strict";
class GameController_ecs {

  #playerShipFactory;
  #weaponFactory;
  #explosionFactory;

  #movementSystem;
  #playerShipMovementSystem;
  #checkCollisionSystem;
  #checkBoundsSystem;
  #playerShipControlSystem;
  #renderSystem;

  constructor ({
                 inputHandler,
                 resourceHandler,
                 canvasHandler,
                 factoryHandler,
                 resizeImageWorker
  })
  {
    Object.assign(this,{
      inputHandler,
      resourceHandler,
      factoryHandler,
      canvasHandler,
      resizeImageWorker
    });
  }

  init = async () => {
    // Initialize the ECS framework, handlers, and other components
    await this.factoryHandler.init();
    this.#playerShipFactory = this.factoryHandler.getFactory("playerShipFactory");
    this.#weaponFactory = this.factoryHandler.getFactory("weaponFactory");
    this.#explosionFactory = this.factoryHandler.getFactory("explosionFactory");

    await this.createSystems();
    await this.createComposers();
    this.addEventListeners();

  }

  /**
   *
   */
  addEventListeners = () => {
    window.addEventListener('keydown', (e) => {
      ECS.component.input.keys[e.code] = true;
      console.log("ECS.component.input.keys",  ECS.component.input.keys);
    });
    window.addEventListener('keyup', (e) =>  {
      ECS.component.input.keys[e.code] = false;
      console.log("ECS.component.input.keys",  ECS.component.input.keys);
    });

    window.addEventListener('mousemove', e => {
      ECS.component.input.mouse.x = e.clientX;
      ECS.component.input.mouse.y = e.clientY;
    });

    window.addEventListener('mousedown', (e)=> {
      ECS.component.input.mouse.buttons[e.button] = true;

    })
    window.addEventListener('mouseup', (e) => {
      ECS.component.input.mouse.buttons[e.button] = false;

    });
  }

  /**
   *
   * @returns {Promise<void>}
   */
  createSystems = async () => {
    this.#movementSystem = new MovementSystem();
    this.#playerShipMovementSystem = new PlayerShipMovementSystem();
    this.#checkCollisionSystem = new CheckCollisionSystem();
    this.#renderSystem = new RenderSystem();
    this.#playerShipControlSystem = new PlayerShipControlSystem();
    console.log("ECS systems created");
  }

  /**
   *
   * @returns {Promise<void>}
   */
  createComposers = async () => {
    this.playerShipComposer = new PlayerShipComposer({
      playerShipFactory: this.#playerShipFactory,
      weaponFactory: this.#weaponFactory,
      explosionFactory: this.#explosionFactory,
      canvasHandler: this.canvasHandler
    });
    console.log("Composers created");
  }

  /**
   *
   * @returns {Promise<void>}
   */
  startGame = async () => {
    let playerShip = await this.playerShipComposer.composePlayerShip();
    let gameLoop = new GameLoop_ecs({
      systems:{
        movementSystem: this.#movementSystem,
        playerShipMovementSystem: this.#playerShipMovementSystem,
        checkCollisionSystem: this.#checkCollisionSystem,
        renderSystem: this.#renderSystem,
        playerShipControlSystem: this.#playerShipControlSystem
    }});
    console.log("Player ship created:", playerShip);
    gameLoop.start();

  }
}