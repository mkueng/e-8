'use strict'
class GameLoop {

  #fpsTarget= 10;
  #renderTargetInterval;
  #gameSpeedFactor = 0.1;
  #subscribers = [];
  #animationId = null;
  #frameCounter = 0;
  #deltaTime = 0;
  #oldTime = 0;
  #then = 0;
  #ticker = 0;

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
   * @param newTime
   */
  #animate = (newTime) => {
    //console.log("ANIMATE");
    const elapsedTime =  newTime - this.#then;
    const deltaTime = newTime - this.#oldTime;
    this.#oldTime = newTime;

    this.#update(deltaTime * this.#gameSpeedFactor);

    if (elapsedTime > this.#renderTargetInterval) {
      //console.log("RENDER")
      //console.log("this.#renderTargetInterval:",this.#renderTargetInterval)
      //console.log("elapsedTime: ", elapsedTime);
      //console.log("newTime: ", newTime);
      //console.log("this.#then: ", this.#then);
      //this.#then = newTime;
      this.#then = newTime  - (elapsedTime % this.#renderTargetInterval);
      this.#render();
      this.#frameCounter++;
    }

    this.#ticker++;
    if (this.#ticker >= 60) {
      this.#ticker = 0;
      this.#subscribers.forEach(subscriber => {
        subscriber.updateFromGameLoop({
          "frameTime:": this.#frameCounter
        })
      })
      this.#frameCounter = 0;
    }

    this.#animationId = requestAnimationFrame(this.#animate);
  }

  /**
   *
   */
  init = () =>{
    this.#renderTargetInterval = 1000 / this.#fpsTarget; // 16.667ms at 60 frames per second
    this.#deltaTime = 0;
    this.#oldTime = performance.now();
    this.#then = performance.now();
  }

  /**
   *
   */
  start = () => {
    this.init();
    this.#animate(performance.now());
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