'use strict'

class GameObjectsHandler {

  static instance = new this();
  static gameObjects = [];
  static contexts = {};
  static gameObjectsToRemove = new Set();

  /**
   *
   * @param gameObject
   */
  addGameObject = (gameObject) => {
    try {
      if (!gameObject.isContextPreventedOfBeingCleared) {
        GameObjectsHandler.contexts[gameObject.canvas.id] = gameObject.context;

      } else {

      }
    } catch(e){
       console.error(e);
    }
    GameObjectsHandler.gameObjects.push(gameObject);
  }

  /**
   *
   * @param id
   */
  addGameObjectToRemoveQueue = (id) => {
    GameObjectsHandler.gameObjectsToRemove.add(id)
  }

  removeGameObjects = () =>{

    for (let id of GameObjectsHandler.gameObjectsToRemove){
      const index = GameObjectsHandler.gameObjects.findIndex(obj => obj.id === id);

      if (index !== -1) {
        const removedObject = GameObjectsHandler.gameObjects[index];

        if (removedObject.subscriber) {
          removedObject.subscriber.updateFromGameObjectsHandler("objectRemovedFromGameLoop", removedObject);
        }
        GameObjectsHandler.gameObjects.splice(index, 1);
      }
    }
    GameObjectsHandler.gameObjectsToRemove.clear();

  }
}