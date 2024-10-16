'use strict'
class GameLoop {

  #hudHandler;
  #fpsTarget= 60;
  #renderTargetInterval = 0;
  #galaxyCoordinatesIncrement = 5;
  #gameSpeedFactor = 0.1;
  #subscribers = [];
  #galaxyCoordinate = 50000;
  #animationId = null;
  #frameCounter = 0;
  #deltaTime = 0;
  #oldTime = 0;
  #then = 0;
  #hudInterval = null
  #ticker = 0;

  constructor(){
    //this.#hudHandler = e8.global.hudHandler;
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
    this.#galaxyCoordinate += this.#galaxyCoordinatesIncrement;
    CollisionDetector.instance.performCollisionCheck();
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
    //clear canvas(es)
    for (let context in GameObjectsHandler.contexts){
      GameObjectsHandler.contexts[context].clearRect(0,0,e8.global.screenWidth, e8.global.screenHeight);
    }

    //render hud
    //this.#hudHandler.renderNavi();

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

    //calculating elapsed time for render
    const elapsedTime =  newTime - this.#then;
    //calculating delta time for update
    const deltaTime = newTime - this.#oldTime;
    this.#oldTime = newTime;
    //invoke update with delta time multiplied by game speed
    this.#update(deltaTime * this.#gameSpeedFactor);
    // if enough time has elapsed, draw the next frame
    if (elapsedTime > this.#renderTargetInterval) {
      // adjust for fpsInterval not being multiple of fps
      this.#then = newTime  - (elapsedTime % this.#renderTargetInterval);
      this.#render();
      this.#frameCounter++;
    }
    this.#ticker++;
    if (this.#ticker >= 60) {
      this.#ticker = 0;
      this.#subscribers.forEach(subscriber => {
        subscriber.updateFromGameLoop({
          "coordinatesUpdate": this.#galaxyCoordinate,
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
  start = () => {
    this.#renderTargetInterval = 1000 / this.#fpsTarget; // 16.667ms at 60 frames per second
    this.#deltaTime = 0;
    this.#oldTime = performance.now();
    this.#then = performance.now();
    this.#animate(performance.now());


    /*
   this.#hudInterval = setInterval(()=>{
       this.#hudHandler.updateHudInfo({
         coordinates: this.#galaxyCoordinate,
         time: this.#deltaTime.toFixed(2),
         systemsStatus: this.#frameCounter/2
       });

        this.#frameCounter = 0;
        for (const subscriber of this.#subscribers) {
          subscriber.updateFromGameLoop({message:"coordinatesUpdate", payload: {coordinate: this.#galaxyCoordinate}});
        }
      },2000)*/
  }



  /**
   *
   */
  pause = () => {
    cancelAnimationFrame(this.#animationId);
    clearInterval(this.#hudInterval);
  }

  /**
   *
   */
  restart = () => {
    this.#then = performance.now();
    this.#frameCounter = 0;
    this.#oldTime = performance.now();
    this.#then = performance.now();
    this.#animate(performance.now());
    this.#hudInterval = setInterval(()=>{
      this.#hudHandler.updateHudInfo({
        coordinates: this.#galaxyCoordinate,
        time: this.#deltaTime.toFixed(2),
        systemsStatus: this.#frameCounter/2
      });

      this.#frameCounter = 0;
      for (const subscriber of this.#subscribers) {
        subscriber.updateFromGameLoop({message:"coordinatesUpdate", payload: {coordinate: this.#galaxyCoordinate}});
      }
    },2000)
  }
}