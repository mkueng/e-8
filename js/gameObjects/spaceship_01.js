class Spaceship_01 extends SpriteComp {


  constructor(spriteComp, spriteHandler, gameLoop){
    super(spriteComp);
    this.spriteHandler = spriteHandler;
    this.gameLoop = gameLoop;
    this.arrowDown = false;
    this.arrowUp = false;
    this.arrowLeft = false;
    this.arrowRight = false;
    this.boundX =  window.global.gameWidth-this.width;
    this.boundY = -30+ this.height;
    InputHandler.subscribe(this);

    return this;
  }

  keyEvent = (event, isDown)=> {

    switch (event) {
      case "ArrowDown" : {
        this.arrowDown = !this.arrowDown;
        break;
      }
      case "ArrowUp" : {
        this.arrowUp = !this.arrowUp;
        break;
      }
      case "ArrowLeft": {
        this.arrowLeft = !this.arrowLeft;
        break;
      }
      case "ArrowRight": {
        this.arrowRight = !this.arrowRight;
        break;
      }
      case "f": {
        this.spriteTemplates["laser"].active = !this.spriteTemplates["laser"].active;

        break;
      }
      case " ": {
        if (isDown === true) {
          const sprite = this.spriteHandler.instantiateSprite("shoot_01", {
            x: this.x,
            y: this.y
          });

          this.spriteHandler.addWeaponSpriteToGameLoop(sprite);
          Hud.updateHud({"shotsFired": Hud.props["shotsFired"] + 1});
        }
      }
    }
  }

  update = ()=>{

    if (this.spriteTemplates["laser"].active === true ){
      for (let i=0, len = GameLoop.enemySprites.length; i < len; i++){
        if (this.x <= GameLoop.enemySprites[i].x
          && this.y >= GameLoop.enemySprites[i].y
          && this.y <= GameLoop.enemySprites[i].y+GameLoop.enemySprites[i].height) {

          const x = GameLoop.enemySprites[i].x;
          const y = GameLoop.enemySprites[i].y;
          const vx = GameLoop.enemySprites[i].vx;
          const vy = GameLoop.enemySprites[i].vy;
          this.spriteHandler.destroyEnemySprite(GameLoop.enemySprites[i].id);
          const explosion = this.spriteHandler.instantiateSprite("enemy_01_explosion", {});

          explosion.x = x;
          explosion.y = y;
          explosion.vx = vx;
          explosion.vy = vy;


          this.spriteHandler.addEnemyExplosionSpriteToGameLoop(explosion)
        }
      }
    }
    if (this.arrowDown === true) {
      this.vy=this.vy+0.2;
    } else

    if (this.arrowUp === true){
      this.vy = this.vy-0.2;
    }

    if (this.arrowLeft === true) {
      this.vx=this.vx-0.2;
    } else

    if (this.arrowRight === true){
      this.vx = this.vx+0.2;
    }

    if (this.y > window.global.gameHeight-50) {
      this.y= window.global.gameHeight -50 ;
      this.vy = 0;
    } else {
      if (this.y < this.boundY ) {
        this.y =  this.boundY ;
        this.vy=0;
      }
    }


    if (this.x > this.boundX ) {
      this.x = this.boundX ;
      this.vx=0;
    } else {
      if (this.x < 22) {
        this.x = 22;
        this.vx=0;
      }
    }

    this.y = this.y +this.vy;
    this.x = this.x +this.vx;
  }
}