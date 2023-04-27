class Enemy_02_shoot extends Sprite{

  constructor(spriteComp, spriteHandler) {
    super (spriteComp);
    this.spriteHandler = spriteHandler;
    this.oponent = spriteComp.oponent;
    return this;
  }

  update = ()=>{
    if (this.x > 0) {
      this.x = this.x+this.vx;
    } else {
      this.spriteHandler.removeSpriteFromGame(SpriteHandler.spriteTypes.weapons, this.id)
      this.stage.shootDestroyed(this.id);
    }
  }
}