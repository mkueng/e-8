class Stage {

  #enemies = {};
  #enemiesPools = {};

  #createEnemies = (enemies)=>{

    for (const enemy in enemies){
      const newEnemy = enemies[enemy];
      const newEnemyInstances = this.spriteHandler.createSprite (
        {
          type: enemy,
          sprite: enemy,
          quantity : newEnemy.quantity,
          stage : this,
        }
      )
      this.#enemies[enemy] = [];
      this.#enemies[enemy].push(newEnemyInstances);
      for (const enemy in newEnemyInstances){
        this.#enemiesPools[enemy] = [];
        this.#enemiesPools[enemy].push(newEnemyInstances[enemy]);
      }
    }
    console.log("enemies:", this.#enemies);
    console.log("enemiesPools", this.#enemiesPools);
  }

  constructor(spriteHandler, stageConfig){
    this.spriteHandler = spriteHandler;
    this.stageConfig = stageConfig;
    this.#createEnemies(stageConfig.enemies);
  }

  activate = ()=>{

  }
}