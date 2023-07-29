class SpaceshipWeapon extends Sprite {

  constructor(spriteComp, spriteHandler){
    super(spriteComp);
    this.spriteHandler = spriteHandler;
    return this;
  }

  update = (dt)=>{

    if (this.x < window.global.screenWidth) {
      this.x = this.x+this.vx;
    } else {
      this.spriteHandler.removeSpriteFromGame(SpriteHandler.spriteTypes.weapons,this.id);
      this.stage.weaponDestroyed(this.id);
    }

    for (let i=0, len = SpriteHandler.enemies.length; i < len; i++) {
      if (SpriteHandler.enemies[i].x < window.global.screenWidth) {
        if (this.x >= SpriteHandler.enemies[i].x - SpriteHandler.enemies[i].width
          && this.x <= SpriteHandler.enemies[i].x + SpriteHandler.enemies[i].width
          && this.y >= SpriteHandler.enemies[i].y - this.height
          && this.y <= SpriteHandler.enemies[i].y + SpriteHandler.enemies[i].height
        ) {
          SpriteHandler.enemies[i].explode();
          this.spriteHandler.removeSpriteFromGame(SpriteHandler.spriteTypes.weapons, this.id);
          this.stage.weaponDestroyed(this.id);
        }
      }
    }
  }
}