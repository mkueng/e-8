'use strict'
class GameLoop {

  #elapsedTime = 0;
  #fpsTarget = 60;
  #renderTargetInterval = 0;
  #galaxyCoordinatesIncrement = 5;
  #gameSpeedFactor = 0.1;
  #hudHandler;
  #subscribers = [];
  #coordinate = 20000;
  #animationId = null;
  #frameCounter;
  #deltaTime;
  #oldTime;
  #now;
  #then;

  constructor({hudHandler}){
    this.#hudHandler = hudHandler;
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

    //increment current coordinate
    this.#coordinate+=this.#galaxyCoordinatesIncrement;

    //collision checks
    CollisionDetector.instance.performCollisionCheck();

    //remove obsolete gameObjects
    GameObjectsHandler.instance.removeGameObjects();

    /*
    for (const gameObjectToRemove in GameObjectsHandler.gameObjectsToRemove) {
      GameObjectsHandler.instance.removeGameObject(gameObjectToRemove);
    }
*/
    // update game objects
    for (let i=0, len = GameObjectsHandler.gameObjects.length; i < len; i++){
      GameObjectsHandler.gameObjects[i].update(deltaTime);
    }
  }

  /**
   *
   */
  #render = () => {
    //clear canvas(es)

    for (let context in GameObjectsHandler.contexts){
      GameObjectsHandler.contexts[context].clearRect(0,0,e8.global.screenWidth, e8.global.screenHeight);
    }

    //render game objects
    for (let i=0, len = GameObjectsHandler.gameObjects.length; i < len; i++){
      GameObjectsHandler.gameObjects[i].render();
    }
  }

  /**
   *
   * @param newTime
   */


  #animate = (newTime) => {
      this.#animationId = requestAnimationFrame(this.#animate);
      //using Date.now() since it's still faster than performance.now() in most browsers
      this.#now = Date.now();
      //calculating elapsed time for render
      this.#elapsedTime =  this.#now - this.#then;
      //calculating delta time for update
      this.#deltaTime = newTime - this.#oldTime;
      this.#oldTime = newTime;
      //calling update with delta time factored with game speed
      this.#update(this.#deltaTime * this.#gameSpeedFactor);

      // if enough time has elapsed, draw the next frame
      if (this.#elapsedTime > this.#renderTargetInterval) {
       // adjust for fpsInterval not being multiple of fps
        this.#then = this.#now  - (this.#elapsedTime % this.#renderTargetInterval);
        this.#render();
        this.#frameCounter++;

    }
  }

  /**
   *
   */
  start = () => {
    this.#renderTargetInterval = 1000 / this.#fpsTarget; // 16.667ms at 60 frames per second
    this.#now = Date.now();
    this.#then = Date.now();
    this.#deltaTime = 0;
    this.#oldTime = performance.now();
    this.#animate(performance.now());

   setInterval(()=>{

       this.#hudHandler.updateHudInfo({
         coordinates: this.#coordinate,
         time: this.#deltaTime.toFixed(2),
         systemsStatus: this.#frameCounter
       });

        this.#frameCounter = 0;
        for (const subscriber of this.#subscribers) {
          subscriber.updateFromGameLoop({message:"coordinatesUpdate", payload: {coordinate: this.#coordinate}});
        }
      },2000)
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
    this.#then = Date.now();
    this.#now = Date.now();
    this.#frameCounter = 0;
    this.#oldTime = performance.now();
    this.#animate(performance.now());

  }
}