class GameLoop {

  #now = 0;
  #dt = 0;
  #step = 1/60;
  #last = 0;

  #backgrounds = [];
  #backgroundLength = 0;

  static sprites = [];
  static spriteQueue = [];

  static weaponSprites = [];
  static weaponSpritesQueue = [];
  static weaponSpriteDestroyQueue = [];

  static enemySprites = [];
  static enemyExplosionSprites = [];

  #hud;


  #render =(dt)=> {
    for (let i = 0; i < this.#backgroundLength; i++) {
      this.#backgrounds[i].render(dt);
    }


    for (let i = 0; i < GameLoop.sprites.length; i++) {
      try {
        GameLoop.sprites[i].update(dt);
        GameLoop.sprites[i].render(dt);
      } catch(e){console.log(e)}
    }

    for (let i = 0; i < GameLoop.weaponSprites.length; i++) {
      try {
        GameLoop.weaponSprites[i].update(dt);
        GameLoop.weaponSprites[i].render(dt);
      } catch(e){}
    }

    for (let i = 0; i < GameLoop.enemyExplosionSprites.length; i++) {
      try {
        GameLoop.enemyExplosionSprites[i].update(dt);
        GameLoop.enemyExplosionSprites[i].render(dt);
      } catch(e){console.log(e)}
    }


    for (let i = 0; i < GameLoop.enemySprites.length; i++) {
      try {
        GameLoop.enemySprites[i].update(dt);
        GameLoop.enemySprites[i].render(dt);
      } catch(e){console.log(e)}
    }

  }

  #loop = ()=>{
    this.#now = performance.now();
    this.#dt = this.#dt + (this.#now-this.#last)/1000;
    this.#last = this.#now;

    this.#render(this.#dt);
    requestAnimationFrame(this.#loop);
  }

  constructor(){
  }

  startLoop = ()=>{
    requestAnimationFrame(this.#loop);
    this.#hud.render();
    setInterval(()=>{
      this.#hud.render();
    },200)

  }

  setBackgrounds = (backgrounds)=>{
    this.#backgrounds = backgrounds;
    this.#backgroundLength = backgrounds.length;
  }

  addSprite = (sprite)=>{
    GameLoop.sprites.push(sprite);
  }

  addWeaponSprite = (sprite)=>{
    GameLoop.weaponSprites.push(sprite);

  }

  addEnemyExplosionSprite = (sprite)=>{
    GameLoop.enemyExplosionSprites.push(sprite);
  }


  destroyEnemyExplosionSprite = (id)=>{
    GameLoop.enemyExplosionSprites.splice(GameLoop.enemyExplosionSprites.findIndex(item => item.id === id),1);

  }
  addEnemySprite = (sprite)=>{
    GameLoop.enemySprites.push(sprite);
    //console.log(GameLoop.enemySprites.length);
  }

  destroySprite = (id)=>{
    GameLoop.sprites.splice(GameLoop.sprites.findIndex(item => item.id === id),1);
  }

  destroyWeaponSprite = (id)=>{
    GameLoop.weaponSprites.splice(GameLoop.weaponSprites.findIndex(item => item.id === id),1);

  }

  destroyEnemySprite = (id)=>{
    GameLoop.enemySprites.splice(GameLoop.enemySprites.findIndex(item => item.id === id),1);
   // console.log(GameLoop.enemySprites.length);
  }


  addHud = (hud)=>{
    this.#hud = hud;
  }



}

