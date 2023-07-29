'use strict'
class Stage_01 extends Stage {

  
  #gameObjectsTemplate = {
    planets: {
      planet_01: { id: "planet_01", amount: 1, onStage: 10000 },
      planet_02: { id: "planet_02", amount: 1, onStage: 30000 },
    },
    enemies: {
      enemy_01: { id: "enemy_01", amount: 2, onStage: 1000, offStage: 30000, interval: 3000 },
      enemy_02: { id: "enemy_02", amount: 2, onStage: 2000, offStage: 50000, interval: 5000 },
    },
  };


  constructor(resourceHandler, gameObjectsPool) {
    super(resourceHandler, gameObjectsPool);
    this.init();
  }

  init = ()=>{
    this.instantiate(this.#gameObjectsTemplate).then(() => {
      console.log("gameObjects:", this.gameObjects);
    });

  }


}