'use strict'

class GameObjectsHandler {

  static instance = new this();
  static gameObjects = [];
  static contexts = {};
  static gameObjectsToRemove = {};

  invoke(){
  }

  /**
   *
   * @param gameObject
   */
  addGameObject = (gameObject)=>{
    GameObjectsHandler.contexts[gameObject.canvas. id] = gameObject.context;
    GameObjectsHandler.gameObjects.push(gameObject);
   // console.log("gameObjects: ", GameObjectsHandler.gameObjects);

  }

  /**
   *
   * @param id
   */
  addGameObjectToRemoveQueue = (id)=>{
    GameObjectsHandler.gameObjectsToRemove[id]= id;
  }

  /**
   *
   * @param id
   */
  removeGameObject(id) {
    const removedObject = GameObjectsHandler.gameObjects.find(obj => obj.id === id);

    if (removedObject) {
      if (removedObject.subscriber) {
        removedObject.subscriber.subscriptionsUpdate("objectRemovedFromGameLoop", removedObject);
      }
      GameObjectsHandler.gameObjects = GameObjectsHandler.gameObjects.filter(obj => obj.id !== id);
      delete GameObjectsHandler.gameObjectsToRemove[id];
    }

  }
}