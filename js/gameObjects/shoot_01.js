class Shoot_01 extends Sprite{

  constructor(spriteComp, spriteHandler) {
    super (spriteComp);
    this.spriteHandler = spriteHandler;
    return this;
  }

  update = ()=>{

    if (this.x < window.global.gameWidth) {
      this.x = this.x+15;
    } else {
       this.spriteHandler.destroyWeaponSprite(this.id);
    }


    for (let i=0, len = GameLoop.enemySprites.length; i < len; i++){
      if (this.x >= GameLoop.enemySprites[i].x
        && this.x <= GameLoop.enemySprites[i].x+GameLoop.enemySprites[i].width
        && this.y >= GameLoop.enemySprites[i].y
        && this.y <= GameLoop.enemySprites[i].y+GameLoop.enemySprites[i].height) {
        const x = GameLoop.enemySprites[i].x;
        const y = GameLoop.enemySprites[i].y;
        const vx = GameLoop.enemySprites[i].vx;
        const vy = GameLoop.enemySprites[i].vy;
        this.spriteHandler.destroyEnemySprite(GameLoop.enemySprites[i].id);
        this.spriteHandler.destroyWeaponSprite(this.id);
        const explosion = this.spriteHandler.instantiateSprite("enemy_01_explosion", {});

        explosion.x = x;
        explosion.y = y;
        explosion.vx = vx;
        explosion.vy = vy;


        this.spriteHandler.addEnemyExplosionSpriteToGameLoop(explosion)
      }
    }

  }

}