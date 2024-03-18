'use strict'

class GameObjectsHandler {

  static instance = new this();
  static gameObjects = [];
  static contexts = {};
  static gameObjectsToRemove = [];


  /**
   *
   * @param gameObject
   */
  addGameObject = (gameObject) => {
    try {
      GameObjectsHandler.contexts[gameObject.canvas.id] = gameObject.context;
    } catch(e){
       console.error(e);
    }
    GameObjectsHandler.gameObjects.push(gameObject);
    //console.log(GameObjectsHandler.gameObjects);
  }

  /**
   *
   * @param id
   */
  addGameObjectToRemoveQueue = (id) => {
    GameObjectsHandler.gameObjectsToRemove.push(id)
  }


  removeGameObjects = () =>{
    for (let i= 0, len = GameObjectsHandler.gameObjectsToRemove.length; i < len; i++){
      const removedObject = GameObjectsHandler.gameObjects.find(obj => obj.id === GameObjectsHandler.gameObjectsToRemove[i]);

      if (removedObject) {
        if (removedObject.subscriber) {
          removedObject.subscriber.subscriptionsUpdate("objectRemovedFromGameLoop", removedObject);
        }
        GameObjectsHandler.gameObjects = GameObjectsHandler.gameObjects.filter(obj => obj.id !== GameObjectsHandler.gameObjectsToRemove[i]);
        //delete GameObjectsHandler.gameObjectsToRemove[id];
        //console.log(GameObjectsHandler.gameObjects);
       //console.log( GameObjectsHandler.gameObjects);
      }
    }
    GameObjectsHandler.gameObjectsToRemove = [];
  }
  /**
   *
   * @param id
   */
  removeGameObject = (id) => {
    const removedObject = GameObjectsHandler.gameObjects.find(obj => obj.id === id);

    if (removedObject) {
      if (removedObject.subscriber) {
        removedObject.subscriber.subscriptionsUpdate("objectRemovedFromGameLoop", removedObject);
      }
      GameObjectsHandler.gameObjects = GameObjectsHandler.gameObjects.filter(obj => obj.id !== id);
      delete GameObjectsHandler.gameObjectsToRemove[id];
      //console.log(GameObjectsHandler.gameObjects);
    }
  }
}