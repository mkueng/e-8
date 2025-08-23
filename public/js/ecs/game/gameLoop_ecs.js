'use strict';

class GameLoop_ecs {

  static frameCount = 0;
  #simulationFps = 60  // Fixed simulation rate
  #subscribers = [];
  #animationId = null;
  #previousTimeStamp = 0;
  #accumulator = 0;
  #fixedDeltaTime = 1000 / this.#simulationFps; // Fixed simulation step
  #maxDeltaTime = this.#fixedDeltaTime*3;
  #heartBeat = 0;
  #systems;

  constructor({
    systems,
              }) {
    this.#systems = systems;
    //new GameTelemetry().startTracking();
    new Console();
  }

  /**
   * animate
   * @param timeStamp
   */
  #animate = (timeStamp) => {
    let deltaTime = timeStamp - this.#previousTimeStamp;
    this.#previousTimeStamp = timeStamp;

    // Clamp the frame time to avoid huge jumps

    if (deltaTime > this.#maxDeltaTime) {
      deltaTime = this.#maxDeltaTime;
    }

    this.#accumulator += deltaTime;

    // Update game logic with fixed time step and ensure this is done 60 times per second
    while (this.#accumulator >= this.#fixedDeltaTime) {
      this.#update(this.#fixedDeltaTime);
      this.#accumulator -= this.#fixedDeltaTime;
    }

    // Calculate interpolation factor for rendering
    const interpolation = this.#accumulator / this.#fixedDeltaTime;


    if (GameLoop_ecs.frameCount % 10 === 0) {
      Console.clear();
      Console.log("deltaTime: " + deltaTime.toFixed(2)+"ms");
      Console.log("fixedDeltaTime: " + this.#fixedDeltaTime.toFixed(2)+"ms");
      Console.log("timeStamp: " + timeStamp.toFixed(2)+"ms");
      Console.log("accumulator: " + this.#accumulator.toFixed(2));
      Console.log("interpolation: " + interpolation.toFixed(2));
      Console.log("amount of active game objects: " + GameObjectsHandler.gameObjects.length);
      //Console.log("gameObjects: "+ GameObjectsHandler.gameObjects.map(obj => obj.identification).join(", "));
    }

    this.#render(interpolation);
    GameLoop_ecs.frameCount++;

    this.#animationId = requestAnimationFrame(this.#animate);
  };

  /**
   * subscribe
   * @param subscriber
   */
  subscribe = (subscriber) => {
    this.#subscribers.push(subscriber);
  };

  /**
   * unsubscribe
   * @param subscriber
   */
  unsubscribe = (subscriber) => {
    const index = this.#subscribers.indexOf(subscriber);
    if (index !== -1) {
      this.#subscribers.splice(index, 1);
    }
  };

  /**
   * update
   * @param deltaTime
   */
  #update = (deltaTime) => {

    this.#systems["playerShipControlSystem"].update(this.groups["player"],deltaTime,0,0);
    this.#systems["movementSystem"].update(this.groups["movement"],deltaTime,0,0);
    this.#systems["checkCollisionSystem"].update(this.groups["collision"]);



    /*
    CollisionDetector.instance.performCollisionChecks();
    GameObjectsHandler.instance.removeGameObjects();

    // Update game objects
    const len = GameObjectsHandler.gameObjects.length;
    for (let i = 0; i < len; i++) {
      GameObjectsHandler.gameObjects[i].update(deltaTime /1000);
    }
    */


  };

  /**
   * render
   * @param interpolation
   */
  #render = (interpolation) => {

    this.#systems.renderSystem.render(this.groups.render,interpolation);

    // Clear contexts

    /*
    for (let context in GameObjectsHandler.contexts) {

      GameObjectsHandler.contexts[context]
        .clearRect(0, 0, e8.global.screenWidth, e8.global.screenHeight);
    }

    // Render game objects
    const len = GameObjectsHandler.gameObjects.length;
    for (let i = 0; i < len; i++) {
      GameObjectsHandler.gameObjects[i].render(interpolation);
    }
    */

  };

  /**
   * init
   */
  init = () => {
    // Only reset previousTimeStamp in init
    this.groups = ECS.systemGroups;
    console.log("this.groups", this.groups);
    this.#previousTimeStamp = performance.now();
  };

  /**
   * start
   */
  start = () => {
    this.init();
    this.#animate(performance.now());
  };

  /**
   * pause
   */
  pause = () => {
    console.log("pause");
    cancelAnimationFrame(this.#animationId);
  };

  /**
   * restart
   */
  restart = () => {
    this.init();
    this.#animate(performance.now());
  };
}
