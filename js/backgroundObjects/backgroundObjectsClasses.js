'use strict'
class BackgroundObjectsClasses {

  static instance = new this();

  #backgroundObjects = {
    asteroidField_01 : AsteroidField_01,
    asteroidField_02 : AsteroidField_02
  }

  getBackgroundObjectClass(id){
    return this.#backgroundObjects[id];
  }
}