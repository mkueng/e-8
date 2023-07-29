class GameObjectsPool{

  #gameObjects = {
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

  constructor(){

  }


  getGameObject(category, id){
    return this.#gameObjects[category][id];
  }
}