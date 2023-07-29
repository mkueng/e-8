class Enemy_02 extends Enemy {

  #weaponsSprites = {
    shot : {
      id : "enemy_01_shoot",
      type : "enemyWeapon",
      class : "Enemy_01_shoot",
      imageId: "enemy_01_shoot",
      width: 16,
      height: 16,
      dx:0,
      dy:0,
      active : false,
      loop : false,
      canvas: "enemies"
    }
  }

  #destroySprites = {
    id : "enemy_01_explosion",
    type : "explosion",
    class : "Enemy_01_explosion",
    imageId: "enemy_01_explosion",
    width: 100,
    height: 90,
    dx: 0,
    dy: -20,
    frames: 14,
    currentFrame: 0,
    step : 50,
    currentStep : 0,
    stride : 304,
    spriteSheet : true,
    active : true,
    loop : false,
    canvas: "enemies"
  }

  #props={

  }

  constructor() {
    super({
      id : "enemy_02",
      type : "enemy",
      imageId: "enemy_02",
      quantity : 1,
      width : 130,
      height: 31,
      x: window.global.screenWidth,
      y : Math.random()*window.global.screenHeight,
      shootEventInterval : Math.floor(Math.random()*100+100),
      dx : 0,
      dy : 0,
      active : false,
      spriteSheet : false,
      canvas: "enemies"
    });


    //this.sprite = SpriteHandler.createSprite(this.#props);
    /*

        this.shots = this.spriteHandler.createSprite({
          type:"enemy_01",
          sprite: "enemy_01_shoot",
          quantity : 1,
          stage : this
        })

        this.enemy_01_explosion = this.spriteHandler.createSprite({
          type:"enemy_01",
          sprite: "enemy_01_explosion",
          quantity : 1,
          stage : this
        })

    */
    //this.explosion = Object.values(this.enemy_01_explosion)[0];
    //this.shootsPool = Object.values(this.shots);

    return this;
  }


  destroySequence = ()=>{
    this.explosion.x = this.x;
    this.explosion.y = this.y;
    this.explosion.vx = this.vx;
    this.explosion.vy = this.vy;

    this.spriteHandler.addSpriteToGame(SpriteHandler.spriteTypes.explosions,this.explosion)
    SoundHandler.playSound("enemy_01", "explosion");
  }


}