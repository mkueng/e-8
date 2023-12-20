'use strict'
class Stage_01 extends Stage {


  #gameObjects = {
    planets: {
      planet_01: { id: "planet_01", amount: 1, onStage: 10000 },
      planet_02: { id: "planet_02", amount: 1, onStage: 30000 },
    },
    enemies: {
      enemy_01: { id: "enemy_01", amount: 2, onStage: 1000, offStage: 30000, interval: 3000 },
      enemy_02: { id: "enemy_02", amount: 2, onStage: 2000, offStage: 50000, interval: 5000 },
    }
  };

  #backgroundObjects = {
    asteroidField_01 : {
      id : "asteroidField_01",
      onStage : 10000,
      interval : [5000,7000]
    },
    asteroidField_02 : {
      id : "asteroidField_02",
      onStage : 100,
      interval : [5000,7000]
    }
  }

  constructor() {
    super(GameLoop.instance);
  }


  init = ()=>{
    return  new Promise((resolve, reject) =>{
      super.init(this.#gameObjects, this.#backgroundObjects).then(() => {
        resolve();
      });
    })
  }
}