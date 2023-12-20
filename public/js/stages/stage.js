'use strict'
class Stage {

  static backgroundObjects;
  static gameObjects;

  #backgroundWorker;

  constructor(gameLoop){
    this.gameLoop = gameLoop;

  }

  async init(gameObjects, backgroundObjects) {
    await this.#instantiateGameObjects(gameObjects);
    await this.#instantiateBackgroundObjects(backgroundObjects);
    /*
    this.#initiateBackgroundWorker();

    return new Promise((resolve) => {
      this.#backgroundWorker.onmessage = function(event) {
        console.log("event from worker:", event);
        resolve();
      };
    });*/
  }

  activate (){
    console.log("BackgroundObjects:", Stage.backgroundObjects);
    console.log("GameObjects: ", Stage.gameObjects);
    //this.#startBackgroundWorker();
    this.gameLoop.start(this);
  }

  deactivate (){
  }

  pause(){
    console.log("pause");
    this.#backgroundWorker.postMessage({
      type : "pause"
    })
  }

  resume(){
    console.log("resume");
    this.#backgroundWorker.postMessage({
      type : "resume"
    })
  }

  /**
   *
   * @param backgroundObjects
   * @returns {Promise<Awaited<unknown>[]>}
   */
  #instantiateBackgroundObjects = async(backgroundObjects) => {

    console.log("instantiate background Objects:", backgroundObjects);
    const initPromises = [];
    for (const {id} of Object.values(backgroundObjects)) {
      const gameObjectClass = BackgroundObjectsClasses.instance.getBackgroundObjectClass(id);
      initPromises.push(new gameObjectClass(backgroundObjects[id]).init());
    }
    return await Promise.all(initPromises).then((results)=>{
      Stage.backgroundObjects = results;
    });
  }


  /**
   *
   * @param gameObjects
   * @returns {Promise<Awaited<unknown>[]>}
   */
  #instantiateGameObjects = async (gameObjects) => {
    const initPromises = [];

    for (const type in gameObjects) {
      for (const { id, amount } of Object.values(gameObjects[type])) {
        gameObjects[type][id].pool = [];
        initPromises.push(this.#instantiateGameObjectPool(gameObjects, type, id, amount));
      }
    }
    return await Promise.all(initPromises).then(()=>{
      Stage.gameObjects = gameObjects;
    });
  };


  /**
   *
   * @param gameObjects
   * @param category
   * @param id
   * @param amount
   * @returns {Promise<Awaited<unknown>[]>}
   */
  #instantiateGameObjectPool = async (gameObjects, category, id, amount) => {
    const gameObjectClass = GameObjectsClasses.instance.getGameObjectClass(id);
    gameObjects[category][id].pool = Array.from({ length: amount }, () => new gameObjectClass());
    return await Promise.all(gameObjects[category][id].pool.map((gameObject) => gameObject.init()));
  };


  #startBackgroundWorker = ()=>{
    this.#backgroundWorker.postMessage({
      type: "start"
    })
  }



  /**
   *
   */
  #initiateBackgroundWorker = ()=>{
    this.#backgroundWorker = new Worker ('../js/workers/backgroundWorker.js');

    let workerObjects = {};
    let offscreenCanvases = [];
    // create worker objects from background objects, making sure
    // that the object can be handled by the structured clone algorithm
    // create an array with unique elements of offScreen canvases used by backgroundObjects
    Stage.backgroundObjects.forEach((element) => {
      workerObjects[element.props.id] = element.props;
      if (!offscreenCanvases.includes(element.props.offscreenCanvas)) {
        offscreenCanvases.push(element.props.offscreenCanvas);
      }
    })

    // message backgroundWorker and transfer control of offscreen canvases
    this.#backgroundWorker.postMessage({
      type : "init",
      payload : {
        backgroundObjects : workerObjects
      }
    }, offscreenCanvases)
  }


}