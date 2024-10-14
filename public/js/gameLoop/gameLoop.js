'use strict'
class GameLoop {

  #fpsTarget= 60;
  #renderTargetInterval =1000 / this.#fpsTarget;
  #fixedTimeStep = 1000 / 100; // Fixed time step for update (16.67ms for 60 FPS)
  #accumulatedTime = 0;
  #gameSpeedFactor = 0.5;
  #subscribers = [];
  #animationId = null;
  #frameCounter = 0;
  #deltaTime = 0;
  #previousTimeSinceLastRender = 0;
  #lastRenderTimestamp = 0;
  #ticker = 0;
#timeSinceLastRender = 0;
  #fps = 60;
  #previousTimeStamp = 0;
  #msPerFrame = 1000 /  this.#fpsTarget;



  constructor(){
  }

  /**
   *
   * @param subscriber
   */
  subscribe = (subscriber) => {
    this.#subscribers.push(subscriber);
  }

  /**
   *
   * @param subscriber
   */
  unsubscribe = (subscriber) => {
    const index = this.#subscribers.indexOf(subscriber);
    this.#subscribers.splice(index, 1);
  }

  /**
   *
   * @param deltaTime
   */
  #update = (deltaTime) => {
    //console.log("update");
    CollisionDetector.instance.performCollisionChecks();
    GameObjectsHandler.instance.removeGameObjects();

    // update game objects
    const len = GameObjectsHandler.gameObjects.length;
    for (let i = 0; i < len; i++) {
      GameObjectsHandler.gameObjects[i].update(deltaTime);
    }
  }

  /**
   *
   */
  #render = () => {
    //console.log("render");
    //clear contexts
    for (let context in GameObjectsHandler.contexts){
      GameObjectsHandler.contexts[context].clearRect(0,0,e8.global.screenWidth, e8.global.screenHeight);
    }
    //render game objects
    const len = GameObjectsHandler.gameObjects.length;
    for (let i = 0; i < len; i++){
      GameObjectsHandler.gameObjects[i].render();
    }
  }

  /**
   *
   * @param timeStamp
   */
  #animate = (timeStamp) => {

    const deltaTime = timeStamp - this.#previousTimeStamp;
    this.#previousTimeStamp = timeStamp;
    this.#update(deltaTime*0.5);

    const elapsedTimeSinceLastRender = timeStamp - this.#previousTimeSinceLastRender;
    if (elapsedTimeSinceLastRender > this.#renderTargetInterval) {
      this.#previousTimeSinceLastRender = timeStamp -(elapsedTimeSinceLastRender % this.#renderTargetInterval);
      this.#render();
    }

    this.#animationId = requestAnimationFrame(this.#animate);
  }

  /**
   *
   */
  init = () =>{
    this.#renderTargetInterval = 1000 / this.#fpsTarget; // 16.667ms at 60 frames per second
    this.#deltaTime = 0;
  }

  /**
   *
   */
  start = () => {
    this.init();
    const now = performance.now();
    this.#previousTimeSinceLastRender = now;
    this.#lastRenderTimestamp = now;
    this.#timeSinceLastRender = now;
    this.#previousTimeStamp = now;
    this.#animate(now);
  }

  /**
   *
   */
  pause = () => {
    cancelAnimationFrame(this.#animationId);
  }

  /**
   *
   */
  restart = () => {
    this.init();
    this.#animate(performance.now());
  }
}