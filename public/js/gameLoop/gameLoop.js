'use strict';

class GameLoop {

  static frameCount = 0;
  #targetFps = 60; // Target FPS
  #simulationFps = 60 // Fixed simulation rate
  #subscribers = [];
  #animationId = null;
  #previousTimeStamp = 0;
  #accumulator = 0;
  #fixedDeltaTime = 1000 / this.#simulationFps; // Fixed simulation step
  #maxDeltaTime = this.#fixedDeltaTime * 10;

  constructor() {
    new GameTelemetry().startTracking();
    new Console();
  }

  /**
   * animate
   * @param timeStamp
   */
  #animate = (timeStamp) => {

    // Simulate lower FPS with delay
    //const delay = 1000 / this.#targetFps; // Calculate delay based on target FPS

    //setTimeout(() => {

      Console.clear();
      Console.clearProperty();

      Console.log("fixedDeltaTime: " + this.#fixedDeltaTime.toFixed(2));
      Console.log("timeStamp: " + timeStamp.toFixed(2));

      let deltaTime = timeStamp - this.#previousTimeStamp;
      this.#previousTimeStamp = timeStamp;

      // Clamp the frame time to avoid huge jumps
      if (deltaTime > this.#maxDeltaTime) {
        deltaTime = this.#maxDeltaTime;
      }
      Console.log("deltaTime: " + deltaTime.toFixed(2));
      this.#accumulator += deltaTime;

      // Update game logic with fixed time step and ensure this is done 60 times per second
      while (this.#accumulator >= this.#fixedDeltaTime) {
        this.#update(this.#fixedDeltaTime);
        this.#accumulator -= this.#fixedDeltaTime;
        Console.log("accumulator: " + this.#accumulator.toFixed(2));
      }

      // calculate interpolation factor for rendering
      const interpolation = this.#accumulator / this.#fixedDeltaTime;
      Console.log("interpolation: " + interpolation.toFixed(2));
      this.#render(interpolation);

      // Increment frame counter for FPS calculation
      GameLoop.frameCount++;

    this.#animationId = requestAnimationFrame(this.#animate);

    //}, delay); // Introduce the delay
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
    CollisionDetector.instance.performCollisionChecks();
    GameObjectsHandler.instance.removeGameObjects();

    // Update game objects
    const len = GameObjectsHandler.gameObjects.length;
    for (let i = 0; i < len; i++) {
      GameObjectsHandler.gameObjects[i].update(deltaTime);
    }

  };

  /**
   * render
   * @param interpolation
   */
  #render = (interpolation) => {
    // Clear contexts
    for (let context in GameObjectsHandler.contexts) {
      GameObjectsHandler.contexts[context]
        .clearRect(0, 0, e8.global.screenWidth, e8.global.screenHeight);
    }

    // Render game objects
    const len = GameObjectsHandler.gameObjects.length;
    for (let i = 0; i < len; i++) {
      GameObjectsHandler.gameObjects[i].render(interpolation);
    }
  };

  /**
   * init
   */
  init = () => {
    // Only reset previousTimeStamp in init
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
