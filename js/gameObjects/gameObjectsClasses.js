'use strict'
class GameObjectsClasses {

  static instance = new this();

  #gameObjectsClasses = {
    enemies : {
      enemy_01 : Enemy_01,
      enemy_02 : Enemy_02
    },
    planets : {
      planet_01 : Planet_01,
      planet_02 : Planet_02
    },
    asteroids : {
      asteroid_01 : Asteroid_01
    }
  }

  #gameObjectsClassMap;

  constructor(){
    this.#gameObjectsClassMap = Util.nestedObjectToFlattenedMap(this.#gameObjectsClasses);
  }

  getGameObjectClass(id){
    return this. #gameObjectsClassMap.get(id);
  }
}