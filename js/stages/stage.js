'use strict'
class Stage {

  constructor(resourceHandler, gameObjectsPool){
   this.gameObjectsPool = gameObjectsPool;
   this.gameObjects = {};
  }

  instantiate = (gameObjects) =>{

    return new Promise((resolve)=>{
      this.instantiateGameObjects(gameObjects).then(() => {
        console.log("gameObjects:", this.gameObjects);
        resolve();
      })
    })
  }

  /**
   *
   * @param gameObjects
   */
  instantiateGameObjects = async (gameObjects) =>{
    let initPromises = [];
    for (const type in gameObjects){
      this.gameObjects[type]={};
      for (const gameObject in gameObjects[type]) {
        const {id, amount, onStage, offStage, interval} = gameObjects[type][gameObject];
        this.gameObjects[type][id] = {
          pool: [],
          onStage,
          offStage,
          interval,
        };
        initPromises.push(this.#instantiateGameObjectPool(type, id, amount))
      }
    }
    return await Promise.all(initPromises);

  }

  /**
   *
   * @param category
   * @param id
   * @param amount
   */
  #instantiateGameObjectPool = async (category, id, amount)=>{
    const gameObjectClass = this.gameObjectsPool.getGameObject(category, id);
    for (let i = 0; i < amount; i++) {
      this.gameObjects[category][id]['pool'].push(new gameObjectClass());
    }

    const resourcePromises =  this.gameObjects[category][id]['pool'].map((resourceObject)=>resourceObject.init() )
    return await Promise.all(resourcePromises);
  }

  activate (){
  }

  end (){

  }
}