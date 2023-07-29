class Stage_old {

  #enemies = {};
  #enemiesPools = {};
  #sequence = {};

  #createEnemies = (enemies)=>{

    for (const enemy in enemies){
      this.#enemies[enemy] = {};
      this.#enemiesPools[enemy] = [];
      const newEnemy = enemies[enemy];
      const newEnemyInstances = this.spriteHandler.createSprite (
        {
          type: enemy,
          sprite: enemy,
          quantity : newEnemy.quantity,
          stage : this,
        }
      )
      this.#enemies[enemy] = newEnemyInstances;
      for (const instance in newEnemyInstances){
        this.#enemiesPools[enemy].push(newEnemyInstances[instance]);
      }
    }
  }

  constructor(spriteHandler, stageConfig, stageHandler){
    this.spriteHandler = spriteHandler;
    this.id = stageConfig.id;
    this.enemies = stageConfig.enemies;
    this.sequence = stageConfig.sequence;
    this.stageConfig = stageConfig;
    this.stageHandler = stageHandler;

    this.#createEnemies(stageConfig.enemies);
  }

  /**
   * activate stage
   */
  activate = ()=>{
    for (const step in this.sequence){
      const newStep = this.stageConfig.sequence[step];
      this.#sequence[newStep.id] = {};
      this.#sequence[newStep.id]["enemy"] = {};
      this.#sequence[newStep.id]["enemy"].enemy = newStep.enemy;
      this.#sequence[newStep.id]["enemy"].quantitiy = newStep.quantity;
      this.#sequence[newStep.id]["enemy"].interval = newStep.interval;

      this.#sequence[newStep.id]["start"]= setTimeout(()=>{
        this.#sequence[newStep.id].interval = setInterval(()=>{
          if (this.#enemiesPools[this.#sequence[newStep.id]["enemy"].enemy].length > 0) {
            let newEnemy = this.#enemiesPools[this.#sequence[newStep.id]["enemy"].enemy].pop()
            newEnemy.x =  window.global.screenWidth+100;
            newEnemy.y = Math.random()*window.global.screenHeight;
            newEnemy.vx = Math.floor(Math.random()*3+1)*-1;
            newEnemy.vy = 0;
            newEnemy.active = true;
            this.spriteHandler.addSpriteToGame(SpriteHandler.spriteTypes.enemies, newEnemy);
          }

        }, this.#sequence[newStep.id]["enemy"].interval)
        console.log("sequence started:", newStep.id);

      }, newStep.startTime)

      this.#sequence[newStep.id]["end"]= setTimeout(()=>{
        clearInterval( this.#sequence[newStep.id].interval);
        delete this.#sequence[newStep.id];
        console.log("sequence ended:", newStep.id);
        if (Object.keys (this.#sequence).length === 0){
          this.stageHandler.stageEnded(this.id);

        }
      }, newStep.endTime)
    }
    console.log("stage activated:", this.id);
  }

  enemyDestroyed =(enemy)=>{
    this.#enemiesPools[enemy.type].push(this.#enemies[enemy.type][enemy.id]);
  }
}