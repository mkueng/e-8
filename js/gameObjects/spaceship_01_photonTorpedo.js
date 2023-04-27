class Spaceship_01_photonTorpedo extends Sprite{

  constructor(spriteComp, spriteHandler) {
    super (spriteComp);
    this.spriteHandler = spriteHandler;
    return this;
  }

  update = (dt)=>{

    if (this.x < window.global.gameWidth) {
      this.x = this.x+this.vx;
    } else {

      this.spriteHandler.removeSpriteFromGame(SpriteHandler.spriteTypes.weapons,this.id);
      this.stage.photonTorpedoDestroyed(this.id);
    }

    for (let i=0, len = SpriteHandler.enemies.length; i < len; i++) {

      if (this.x >= SpriteHandler.enemies[i].x - SpriteHandler.enemies[i].width
        && this.x <= SpriteHandler.enemies[i].x + SpriteHandler.enemies[i].width
        && this.y >= SpriteHandler.enemies[i].y- this.height
        && this.y <= SpriteHandler.enemies[i].y + SpriteHandler.enemies[i].height
      ) {


        this.spriteHandler.removeSpriteFromGame(SpriteHandler.spriteTypes.weapons,this.id);
        this.stage.photonTorpedoDestroyed(this.id);
        SpriteHandler.enemies[i].explode();
      }
    }
  }
}