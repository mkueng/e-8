class Stage_01 extends Stage {
  constructor(spriteHandler, stageConfig) {
    super(spriteHandler, stageConfig);
    this.stageConfig = stageConfig;

    this.enemy_01 = this.spriteHandler.createSprite({
      type:"enemy_01",
      sprite: "enemy_01",
      quantity :  this.stageConfig.enemies.enemy_01.quantity,
      stage : this

    })

    /*
    this.enemy_01_pool = [];
    for (const enemy in this.enemy_01){
      this.enemy_01_pool.push(this.enemy_01[enemy]);
    }
  }


  activate = ()=>{
    setInterval(()=>{
      if (this.enemy_01_pool.length > 0) {
        let newEnemy = this.enemy_01_pool.pop()
        newEnemy.x =  window.global.gameWidth+100;
        newEnemy.vx = Math.floor(Math.random()*3+1)*-1;
        newEnemy.vy = 0;
        newEnemy.active = true;
        this.spriteHandler.addSpriteToGame(SpriteHandler.spriteTypes.enemies, newEnemy);
      }

    },1000)
    */

  }

  destroyed= (id)=> {
    this.enemy_01_pool.push(this.enemy_01[id]);
  }
}