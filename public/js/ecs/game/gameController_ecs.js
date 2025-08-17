"use strict";
class GameController_ecs {

  #playerShipFactory;
  #weaponFactory;
  #explosionFactory;

  #movementSystem;
  #checkCollisionSystem;
  #checkBoundsSystem;
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

  createSystems = async () => {
    this.#movementSystem = new MovementSystem();
    this.#checkCollisionSystem = new CheckCollisionSystem();
    this.#renderSystem = new RenderSystem();
    console.log("ECS systems created");
  }

  createComposers = async () => {
    this.playerShipComposer = new PlayerShipComposer({
      playerShipFactory: this.#playerShipFactory,
      weaponFactory: this.#weaponFactory,
      explosionFactory: this.#explosionFactory,
      canvasHandler: this.canvasHandler
    });
    console.log("Composers created");
  }

  startGame = async () => {
    let playerShip = await this.playerShipComposer.composePlayerShip();
    let gameLoop = new GameLoop_ecs({systems:{
      movementSystem: this.#movementSystem, checkCollisionSystem: this.#checkCollisionSystem,
        renderSystem: this.#renderSystem
    }});
    console.log("Player ship created:", playerShip);
    gameLoop.start();

  }
}