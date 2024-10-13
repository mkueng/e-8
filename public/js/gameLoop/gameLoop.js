'use strict'
class GameLoop {

  #fpsTarget= 1;
  #renderTargetInterval =1000 / this.#fpsTarget;
  #fixedTimeStep = 1000 / 100; // Fixed time step for update (16.67ms for 60 FPS)
  #accumulatedTime = 0;
  #gameSpeedFactor = 0.5;
  #subscribers = [];
  #animationId = null;
  #frameCounter = 0;
  #deltaTime = 0;
  #previousTimestamp = 0;
  #lastRenderTimestamp = 0;
  #ticker = 0;
#timeSinceLastRender = 0;
  #fps = 60;
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
   * @param currentTimestamp
   */
  #animate = (currentTimestamp) => {








    this.#deltaTime =  currentTimestamp -  this.#previousTimestamp;
    this.#lastRenderTimestamp =  currentTimestamp - this.#timeSinceLastRender ;
    this.#deltaTime  = Math.min(  this.#deltaTime );
    this.#previousTimestamp = currentTimestamp;
    //console.log(timeSinceLastRender);
    //this.#lastRenderTimestamp = currentTimestamp;
    console.log("UPDATE");

    this.#update(  this.#deltaTime /100);


    if (   this.#lastRenderTimestamp   > this.#renderTargetInterval) {
      console.log("RENDER")
    const excessTime = this.#timeSinceLastRender - this.#msPerFrame;
      this.#timeSinceLastRender  = currentTimestamp  - excessTime;
      this.#render();
      //this.#frameCounter++;ds
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
    this.#previousTimestamp = now;
    this.#lastRenderTimestamp = now;
    this.#timeSinceLastRender = now;
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