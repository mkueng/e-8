class Enemy_01 extends Sprite {


  #ran = (state)=>{
    return state*48271 % 2147483647;
  }

  constructor(sprite, spriteHandler) {
    sprite.y = Math.random()*window.global.gameHeight;
    super(sprite);
    this.spriteHandler = spriteHandler;
    this.spaceship = null;
    this.sinRan = Math.random()*8;
    this.cosRan = Math.random()*5;
    this.setOponent = (oponent)=>{
      this.oponent = oponent;
    }

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
    this.direction =Math.floor(Math.random()*2);

    return this;
  }


  updateMovement = ()=> {

    if (this.sinIndex<359){
      this.sinIndex++
    } else{
      this.sinIndex = 0;
    }
    this.vy = this.angles[this.sinIndex].sin*this.sinRan/10;
    this.vx = this.vx- this.angles[this.sinIndex].cos* this.cosRan/10;
   // this.vy = this.vy+ this.randomMovement[Math.floor(Math.random()*99)]/10;
   // this.vx = this.vx+ this.randomMovement[Math.floor(Math.random()*99)]/10;


  }

  update = (dt)=>{
    if (this.x < -100) {
      this.spriteHandler.destroyEnemySprite(this.id);
    }
    if (this.step < 10) {
      this.step++
    }else {
      this.updateMovement();
      this.step = 0;
    }

    this.x = this.x+this.vx;
    this.y = this.y +this.vy;
  }
}