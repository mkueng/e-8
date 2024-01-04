'use strict'
class GameLoop {

  #elapsed = 0;
  #then = 0;
  #fps = 60;
  #fpsInterval = 0;
  #performanceCount = 0;
  #start = 0;
  #end  = 0;
  #perfDif = 0;
  #performanceCumul = 0
  #stage = null;
  #coordinate = 100000;
  #subscribers = [];
  #toggleUpdate = true;

  constructor({infoHandler, hudHandler}){
    this.hudHandler = hudHandler;
    this.infoHandler = infoHandler;
  }

  subscribe=(subscriber)=>{
    this.#subscribers.push(subscriber);
  }

  unsubscribe = (subscriber)=>{
    const index = this.#subscribers.indexOf(subscriber);
    this.#subscribers.splice(index, 1);
  }

  /**
   *
   * @param deltaTime
   */
  #update=(deltaTime)=> {
    //increment current coordinate
    this.#coordinate+=10;

    //remove gameObjects
    for (const gameObjectToRemove in GameObjectsHandler.gameObjectsToRemove) {
      GameObjectsHandler.instance.removeGameObject(gameObjectToRemove);
    }

    // update game objects
    for (let i=0, len = GameObjectsHandler.gameObjects.length; i < len; i++){
      GameObjectsHandler.gameObjects[i].update(deltaTime);
    }
  }

  /**
   *
   */
  #render=()=>{
    this.#performanceCount++;

    //start measuring render time
    this.#start = window.performance.now();

    //clear canvas(es)
    for (let context in GameObjectsHandler.contexts){
      GameObjectsHandler.contexts[context].clearRect(0,0,window.global.screenWidth, window.global.screenHeight);
    }



    //perform collision checks
    CollisionDetector.instance.performCollisionCheck();

    //render game objects
    for (let i=0, len = GameObjectsHandler.gameObjects.length; i < len; i++){
      GameObjectsHandler.gameObjects[i].render();
    }

    this.#toggleUpdate = !this.#toggleUpdate;
    //end measuring render time
    this.#end = window.performance.now();
    this.#perfDif = this.#end-this.#start;
    this.#performanceCumul = this.#performanceCumul+this.#perfDif;
  }



  /**
   *
   * @param newTime
   */
  #animate = (newTime)=>{
    requestAnimationFrame(this.#animate);
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    this.delta = newTime - this.oldTime;
    this.oldTime = newTime;
    this.#update(this.delta/10);

    // if enough time has elapsed, draw the next frame
    if ( this.elapsed > this.#fpsInterval) {
      // adjust for fpsInterval not being multiple of fps
      this.then = this.now - (this.elapsed % this.#fpsInterval);
      this.#render(this.#elapsed);
    }
  }


  /**
   *
   */
  start = (stage)=>{
    this.#fpsInterval = 1000 / this.#fps;
    this.#stage = stage;
    this.#then = window.performance.now();
    this.now = Date.now();
    this.then = Date.now();
    this.startTime = this.then;
    this.delta = 0;
    this.oldTime = 0;
    this.#animate(0);

   setInterval(()=>{

     this.hudHandler.updateHudInfo({
       coordinates : this.#coordinate,
       time : (this.#performanceCumul/this.#performanceCount).toFixed(4),
       systemsStatus : this.#performanceCount / 2
     });

      this.#performanceCumul = this.#performanceCount = 0;
      for (const subscriber of this.#subscribers) {
        subscriber.update(this.#coordinate);
      }
    },2000)
  }
}