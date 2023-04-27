class Enemy_01_shoot extends Sprite{

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

    for (let i=0, len = SpriteHandler.spaceships.length; i < len; i++) {

      if ((this.x+this.dx+this.width) <= (SpriteHandler.spaceships[i].x + SpriteHandler.spaceships[i].width)
        && this.x+this.dx+this.width  >= SpriteHandler.spaceships[i].x - SpriteHandler.spaceships[i].width
        && this.y+this.dy >= SpriteHandler.spaceships[i].y- this.height
        && this.y+this.dy <= SpriteHandler.spaceships[i].y + SpriteHandler.spaceships[i].height
      ) {


        this.spriteHandler.removeSpriteFromGame(SpriteHandler.spriteTypes.weapons,this.id);
        this.stage.shootDestroyed(this.id);
        //this.spriteHandler.removeSpriteFromGame(SpriteHandler.spriteTypes.spaceships,this.id);
        console.log("HIT");
      }
    }
  }
}