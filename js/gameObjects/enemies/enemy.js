'use strict'
class Enemy extends GameObject {

  constructor (params){
    super(params);

    this.shootEventInterval = params.shootEventInterval || null;
    this.shootEventTimer = 0;

  }

  activate=()=>{};
  deactivate=()=>{};
  destroySequence=()=>{}





  update = (dt)=>{
    //enemy has weapon(s)
    if (this.shootEventInterval) {
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
    }

    if (this.x < this.offScreenXLeft) {
      this.destroy();
    }

    this.x = this.x+this.vx;
    this.y = this.y +this.vy;
  }

  shotOut = (id)=>{
    this.shootsPool.push(this.shoots[id]);
  }

  destroy=()=>{
    this.destroySequence();
    this.stage.enemyDestroyed(this);
    this.spriteHandler.removeSpriteFromGame(SpriteHandler.spriteTypes.enemies, this.id);

  }
}