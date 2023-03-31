class Enemy_01_explosion extends Sprite {
  constructor(sprite, spriteHandler) {

    super(sprite);
  }


  update = (dt)=>{
    this.x = this.x+this.vx;
    this.y = this.y+this.vy;
  }
}