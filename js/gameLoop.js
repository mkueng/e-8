class GameLoop {

  constructor(canvasHandler){
    this.canvasHandler = canvasHandler;
    this.enemyCanvasContext = this.canvasHandler.getCanvas("enemies").context;
    this.spaceshipCanvasContext = this.canvasHandler.getCanvas("spaceship").context;
    this.backgroundContext = this.canvasHandler.getCanvas("backgroundMiddle").context;
    this.backgroundInterimContext = this.canvasHandler.getCanvas("backgroundInterim").context;
    this.weaponsContext = this.canvasHandler.getCanvas("weapons").context;
    this.performanceCount = 0;
    this.performanceCumul = 0;

    this.video = document.querySelector('video');
    this.videoContext = this.canvasHandler.getCanvas("backgroundFar").context;
  }

  //private fields
  #now = 0;
  #hud;
  #elapsed;
  #then;
  #fpsInterval

  #removeBackgroundQueue=[];
  #hasRemoveBackgroundQueueEntries = false;

  static backgrounds = [];

  #render=(dt)=> {

    this.performanceCount++;
    let start = window.performance.now();

    //remove backgrounds
    if (BackgroundHandler.backgroundRemoveQueue.length > 0) {
      for (let i = 0, len = BackgroundHandler.backgroundRemoveQueue.length; i < len; i++) {
        BackgroundHandler.backgrounds.splice(BackgroundHandler.backgrounds.findIndex(item => item.id === BackgroundHandler.backgroundRemoveQueue[i]), 1);
      }
      BackgroundHandler.backgroundRemoveQueue = [];
      console.log("backgrounds:", BackgroundHandler.backgrounds );
    }
    //remove weapons
    for (let i = 0, len = SpriteHandler.weaponsRemoveQueue.length; i < len; i++){
        SpriteHandler.weapons.splice(SpriteHandler.weapons.findIndex(item => item.id === SpriteHandler.weaponsRemoveQueue[i]),1);
    }
    SpriteHandler.weaponsRemoveQueue = [];

    //remove spaceships
    for (let i = 0, len = SpriteHandler.spaceshipsRemoveQueue.length; i < len; i++){
      SpriteHandler.spaceships.splice(SpriteHandler.spaceships.findIndex(item => item.id === SpriteHandler.spaceshipsRemoveQueue[i]),1);
    }
    SpriteHandler.spaceshipsRemoveQueue = [];

    //remove enemies
    for (let i = 0, len = SpriteHandler.enemiesRemoveQueue.length; i < len; i++){
      SpriteHandler.enemies.splice(SpriteHandler.enemies.findIndex(item => item.id === SpriteHandler.enemiesRemoveQueue[i]),1);
    }
    SpriteHandler.enemiesRemoveQueue = [];

    //remove explosions
    for (let i = 0, len = SpriteHandler.explosionsRemoveQueue.length; i < len; i++){
      SpriteHandler.explosions.splice(SpriteHandler.explosions.findIndex(item => item.id === SpriteHandler.explosionsRemoveQueue[i]),1);
    }
    SpriteHandler.explosionsRemoveQueue = [];

    //render backgrounds

    this.backgroundContext.clearRect(0,0,window.global.gameWidth, window.global.gameHeight);
    this.backgroundInterimContext.clearRect(0,0,window.global.gameWidth, window.global.gameHeight);
    for (let i = 0, len = BackgroundHandler.backgrounds.length; i < len; i++) {
      try {
        BackgroundHandler.backgrounds[i].render();
      } catch(e){console.error(e)}
    }


    //render hud
    this.#hud.render();

    // render enemies
    this.enemyCanvasContext.clearRect(0, 0, window.global.gameWidth, window.global.gameHeight);
    if (SpriteHandler.enemies.length > 0) {
      for (let i = 0, len = SpriteHandler.enemies.length; i < len; i++) {
        try {
          SpriteHandler.enemies[i].update(dt);
          SpriteHandler.enemies[i].render();
        } catch (e) {
          console.error(e)
        }
      }
    }

    //render explosions
    if (SpriteHandler.explosions.length > 0){
      for (let i = 0, len = SpriteHandler.explosions.length; i < len; i++) {
        try {
          SpriteHandler.explosions[i].update(dt);
          SpriteHandler.explosions[i].render();
        } catch(e){console.error(e)}
      }
    }

    //render weapons
    this.weaponsContext.clearRect(0,0,window.global.gameWidth, window.global.gameHeight);
    if (SpriteHandler.weapons.length > 0) {
      for (let i = 0, len = SpriteHandler.weapons.length;  i < len; i++) {
        try {
          SpriteHandler.weapons[i].update(dt);
          SpriteHandler.weapons[i].render();
        } catch(e){console.error(e)}
      }
    }

    //render spaceships
    this.spaceshipCanvasContext.clearRect(0,0,window.global.gameWidth, window.global.gameHeight);
    if (SpriteHandler.spaceships.length > 0){
      for (let i = 0, len = SpriteHandler.spaceships.length; i < len; i++) {
        try {
          SpriteHandler.spaceships[i].update(dt);
          SpriteHandler.spaceships[i].render();
        } catch(e){console.error(e)}
      }
    }

    // performance
    let end = window.performance.now();
    let perfDif = end-start;
    this.performanceCumul = this.performanceCumul+perfDif;
    if (this.performanceCount >= 100) {
      InfoHandler.render((this.performanceCumul / 100).toFixed(2));
      //console.log("performance: ", (this.performanceCumul / 500).toFixed(4));
      this.performanceCumul = 0;
      this.performanceCount = 0;
    }


  }

  drawImage(){

    this.videoContext.drawImage(this.video,400,400,700,400);

  }

  #animate = (newtime)=> {
    requestAnimationFrame(this.#animate);
    //this.drawImage();
    this.#now = newtime;
    this.#elapsed = this.#now - this.#then;
    // if enough time has elapsed, draw the next frame
    if ( this.#elapsed > this.#fpsInterval) {
      // adjust for fpsInterval not being multiple of 16.67
      this.#then = this.#now - (this.#elapsed % this.#fpsInterval);
      this.#render(this.#elapsed);
    }
  }

  startLoop = ()=>{
    this.#fpsInterval = 1000 / 60;
    this.#then = window.performance.now();
   // this.video.play();
// Set the video to loop
    //this.video.loop = true;
    this.#animate();
  }

  removeBackground = (id)=>{
    this.#removeBackgroundQueue.push(id);
    this.#hasRemoveBackgroundQueueEntries = true;
  }

  addBackground = (background)=> {
    GameLoop.backgrounds.push(background);

  }
  addHud = (hud)=>{
    this.#hud = hud;
  }
}