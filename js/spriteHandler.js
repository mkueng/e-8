class SpriteHandler{

  constructor(canvasHandler, gameLoop){
    this.gameLoop = gameLoop;
    this.spriteTemplates = {
      "spaceship_01" : {
        id : "spaceship_01",
        image: document.querySelector("#spaceship_01"),
        width : 136,
        height: 35,
        x: 0,
        y: 0,
        dx : 0,
        dy : 0,
        vx: 0,
        vy : 0,
        frames : 1,
        active : true,
        spriteSheet : false,
        context: canvasHandler.getCanvas("spaceship").context,
        callback: null
      },
      "enemy_01" : {
        id : "enemy_01",
        class : Enemy_01,
        image: document.querySelector("#enemy_01"),
        width : 100,
        height: 90,
        x: window.global.gameWidth+100,
        y: 0,
        vy : 0,
        vx : 0,
        dx : 0,
        dy : 0,
        v: 0,
        frames : 1,
        currentFrame : 0,
        currentStep : 100,
        stride:0,
        active : true,
        spriteSheet : false,
        context: canvasHandler.getCanvas("spaceship").context,

        callback: null
      },
      "enemy_01_explosion": {
        id : "enemy_01_explosion",
        class : Enemy_01_explosion,
        image: document.querySelector("#enemy_01_explosion"),
        x : 200,
        y: 200,
        dx: 0,
        dy: 0,
        vx : 0,
        vy : 0,
        width: 100,
        height: 90,
        frames: 14,
        currentFrame: 0,
        stride : 304,
        spriteSheet : true,
        active : true,
        loop : false,
        step : 50 ,
        currentStep : 0,
        callback : ()=>{
          this.destroyEnemyExplosionSprite(this.id)
        },
        context: canvasHandler.getCanvas("spaceship").context
      },


      "exhaust_01" : {
        id : "exhaust_02",
        image: document.querySelector("#exhaust_01"),
        width : 22,
        height: 6,
        x:0,
        y:0,
        dx: -15,
        dy: +17,
        frames : 7,
        currentFrame : 0,
        spriteSheet : true,
        stride : 128,
        active : true,
        loop : true,
        step : 1/5,
        currentStep : 0,
        context: canvasHandler.getCanvas("spaceship").context,
        callback: null
      },
      "laser" : {
      id : "laser",
        image : document.querySelector("#laser"),
        width :  window.global.gameWidth,
        height: 32,
        dx: +75,
        dy: -8,
        frames : 2,
        currentFrame : 0,
        spriteSheet: true,
        stride : 32,
        repeatX : window.global.gameWidth,
        active : false,
        context: canvasHandler.getCanvas("spaceship").context,
        callback : null
    },
      "shoot_01" : {
        id : "shoot_01",
        image : document.querySelector("#shoot"),
        class : Shoot_01,
        width :  26,
        height: 16,
        dx: 125,
        dy: 9,
        x:100,
        y:100,
        frames : 5,
        currentFrame : 0,
        spriteSheet: true,
        loop : true,
        currentStep : 100,
        step :1,
        stride : 32,
        repeatX : window.global.gameWidth,
        active : true,
        context: canvasHandler.getCanvas("spaceship").context,
        callback : null
      }
  }

    this.spriteCompositionTemplates = {
      "spaceship_01": {
        class: Spaceship_01,
        id: "spaceship_01",
        spriteTemplates: {
          "spaceship_01": this.spriteTemplates["spaceship_01"],
          "exhaust_01": this.spriteTemplates["exhaust_01"],
          "laser": this.spriteTemplates["laser"]
        },
        //spriteTemplates: [this.spriteTemplates["spaceship_01"], this.spriteTemplates["exhaust_01"],this.spriteTemplates["laser"] ],
        context: canvasHandler.getCanvas("spaceship").context,
        width: 187,
        height: 42,
        x: 200,
        y: 200,
        vx: 0,
        vy: 0,
        callback: null
      }
    }
  }


  instantiateSpriteComposition = (composition)=>{
     return new this.spriteCompositionTemplates[composition].class(this.spriteCompositionTemplates[composition], this, this.gameLoop);
  }

  instantiateSprite = (spriteName, props) =>{
    this.spriteTemplates[spriteName].x = props.x ||  this.spriteTemplates[spriteName].x;
    this.spriteTemplates[spriteName].y = props.y || this.spriteTemplates[spriteName].y;
    return new this.spriteTemplates[spriteName].class(this.spriteTemplates[spriteName],this);
  }

  addSpriteToGameLoop = (sprite) =>{
    this.gameLoop.addSprite(sprite)
  }

  addEnemySpriteToGameLoop = (sprite) =>{
    this.gameLoop.addEnemySprite(sprite)
  }

  addEnemyExplosionSpriteToGameLoop = (sprite) =>{
    this.gameLoop.addEnemyExplosionSprite(sprite)
  }

  addWeaponSpriteToGameLoop = (sprite) =>{
    this.gameLoop.addWeaponSprite(sprite)
  }

  destroySprite = (id) => {
    //console.log("destroy:", id);
    this.gameLoop.destroySprite(id);
  }

  destroyWeaponSprite = (id) => {
    //console.log("destroyWeaponSprite:", id);
    this.gameLoop.destroyWeaponSprite(id);
  }

  destroyEnemySprite = (id) => {
   // console.log("destroyEnemySprite:", id);
    this.gameLoop.destroyEnemySprite(id);
  }
  destroyEnemyExplosionSprite = (id) => {
    // console.log("destroyEnemySprite:", id);
    this.gameLoop.destroyEnemyExplosionSprite(id);
  }
}