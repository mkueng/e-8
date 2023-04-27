class Enemy_01 extends Sprite {

  constructor(sprite, spriteHandler) {

    super(sprite);
    this.spriteHandler = spriteHandler;
    this.oponent = null;
    this.y = Math.random()*window.global.gameHeight;
    this.sinRan = Math.random()*8;
    this.cosRan = Math.random()*5;
    this.setOponent = (oponent)=>{
      this.oponent = oponent;
    }
    this.shootEventInterval = Math.floor(Math.random()*100+100);
    this.shootEventTimer = 0;

    const pi180 = (Math.PI/180);
    this.angles =[...new Array(360).fill(0)].map((_,i) => ({
      cos: Math.cos(i * pi180),
      sin: Math.sin(i * pi180)
    }));

    this.sinIndex = 0;
    this.randomMovement = [];
    for (let i=0; i < 100; i++){
      this.randomMovement.push(Math.floor(Math.random()*100)-50);
    }
    this.step = 0;

    this.shoots= this.spriteHandler.createSprite({
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


    this.explosion =  Object.values(this.enemy_01_explosion)[0];
    this.shootsPool = Object.values(this.shoots);

    return this;
  }

  explode = ()=>{
    this.explosion.x = this.x;
    this.explosion.y = this.y;
    this.explosion.vx = this.vx;
    this.explosion.vy = this.vy;

    this.spriteHandler.addSpriteToGame(SpriteHandler.spriteTypes.explosions,this.explosion)
    this.destroy();
    SoundHandler.playSound("enemy_01", "explosion");
  }

  updateMovement = (oponentVY)=> {
    if (this.sinIndex<359){
      this.sinIndex++
    } else{
      this.sinIndex = 0;
    }
    this.vy = this.angles[this.sinIndex].sin*this.sinRan*oponentVY/2;
    this.vx = this.vx- this.angles[this.sinIndex].cos* this.cosRan/10;
  }

  update = (dt)=>{
    if (this.shootEventTimer < this.shootEventInterval){
      this.shootEventTimer++
    } else {
     this.shootEventTimer = 0;
      if (this.shootsPool.length > 0){
        let shoot = this.shootsPool.pop();
        shoot.x= this.x;
        shoot.y= this.y;
        shoot.vx = -10;
        shoot.active = true;
        this.spriteHandler.addSpriteToGame(SpriteHandler.spriteTypes.weapons, shoot)
      }
    }
    if (this.x < -100) {
     this.destroy()
    }
    if (this.step < 100) {
      this.step++
    }else {
     // this.updateMovement(this.oponent.vy);
      this.step = 0;
    }
    this.x = this.x+this.vx;
    this.y = this.y +this.vy;
  }

  shootDestroyed = (id)=>{
    this.shootsPool.push(this.shoots[id]);
  }

  destroy=()=>{
    this.stage.destroyed(this.id);
    this.spriteHandler.removeSpriteFromGame(SpriteHandler.spriteTypes.enemies, this.id);

  }
}