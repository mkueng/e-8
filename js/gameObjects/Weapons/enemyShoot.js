class EnemyShoot extends Sprite {

  constructor(spriteComp, spriteHandler){
    super(spriteComp);
    this.spriteHandler = spriteHandler;
  }


  update = ()=>{
    if (this.x > 0) {
      this.x = this.x+this.vx;
    } else {
      this.spriteHandler.removeSpriteFromGame(SpriteHandler.spriteTypes.weapons, this.id)
      this.stage.shootDestroyed(this.id);
    }

    for (let i=0, len = SpriteHandler.spaceships.length; i < len; i++) {

      if (this.x <= SpriteHandler.spaceships[i].x + SpriteHandler.spaceships[i].width
        && this.x >= SpriteHandler.spaceships[i].x - SpriteHandler.spaceships[i].width
        && this.y >= SpriteHandler.spaceships[i].y -this.height
        && this.y <= SpriteHandler.spaceships[i].y + SpriteHandler.spaceships[i].height
      ) {

        console.log("HIT");
        SpriteHandler.spaceships[i].raiseShield();
        //SpriteHandler.enemies[i].explode();
        this.spriteHandler.removeSpriteFromGame(SpriteHandler.spriteTypes.weapons, this.id);
        this.stage.shootDestroyed(this.id);

      }
    }

  }
}