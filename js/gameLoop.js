class GameLoop {

  constructor(canvasHandler, hudHandler){
    this.canvasHandler = canvasHandler;
    this.hudHandler = hudHandler;
    this.staticBackgroundContext = this.canvasHandler.getCanvas("backgroundStatic").context;
    this.enemyCanvasContext = this.canvasHandler.getCanvas("enemies").context;
    this.spaceshipCanvasContext = this.canvasHandler.getCanvas("spaceship").context;
    this.backgroundFarContext = this.canvasHandler.getCanvas("backgroundFar").context;
    this.backgroundMiddleContext = this.canvasHandler.getCanvas("backgroundMiddle").context;
    this.backgroundInterimContext = this.canvasHandler.getCanvas("backgroundInterim").context;
    this.backgroundFrontContext = this.canvasHandler.getCanvas("backgroundFront").context;
    this.backgroundFaceContext = this.canvasHandler.getCanvas("backgroundFace").context;
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
  #fpsInterval;
  #backgroundInterval = 3;
  #renderCount = 0;

  #renderDynamicBackgrounds=()=>{
    //remove dynamicBackgrounds
    if (BackgroundHandler.backgroundRemoveQueue.length > 0) {
      for (let i = 0; i < BackgroundHandler.backgroundRemoveQueue.length; i++) {
        BackgroundHandler.dynamicBackgrounds.splice(BackgroundHandler.dynamicBackgrounds.findIndex(item => item.id === BackgroundHandler.backgroundRemoveQueue[i]), 1);
      }
      BackgroundHandler.backgroundRemoveQueue = [];
      console.log("backgrounds:", BackgroundHandler.dynamicBackgrounds);
    }

    //render dynamicBackgrounds
    this.backgroundFarContext.clearRect(0,0,window.global.screenWidth, window.global.screenHeight);
    this.backgroundMiddleContext.clearRect(0,0,window.global.screenWidth, window.global.screenHeight);
    this.backgroundInterimContext.clearRect(0,0,window.global.screenWidth, window.global.screenHeight);
    this.backgroundFrontContext.clearRect(0,0,window.global.screenWidth, window.global.screenHeight);
    this.backgroundFaceContext.clearRect(0,0,window.global.screenWidth, window.global.screenHeight);

    for (let i = 0, len = BackgroundHandler.dynamicBackgrounds.length; i < len; i++) {
      try {
        BackgroundHandler.dynamicBackgrounds[i].render();
      } catch(e){console.error(e)}
    }
  }

  #renderStaticBackgrounds=()=>{
    this.staticBackgroundContext.clearRect(0,0,window.global.screenWidth, window.global.screenHeight);
    for (let i = 0, len = BackgroundHandler.staticBackgrounds.length; i < len; i++) {
      try {
        BackgroundHandler.staticBackgrounds[i].render();
      } catch(e){console.error(e)}
    }
  }

  #render=(dt)=> {

    this.performanceCount++;
    let start = window.performance.now();


    //remove weapons
    for (let i = 0; i < SpriteHandler.weaponsRemoveQueue.length; i++){
        SpriteHandler.weapons.splice(SpriteHandler.weapons.findIndex(item => item.id === SpriteHandler.weaponsRemoveQueue[i]),1);
    }
    SpriteHandler.weaponsRemoveQueue = [];

    //remove spaceships
    for (let i = 0; i < SpriteHandler.spaceshipsRemoveQueue.length; i++){
      SpriteHandler.spaceships.splice(SpriteHandler.spaceships.findIndex(item => item.id === SpriteHandler.spaceshipsRemoveQueue[i]),1);
    }
    SpriteHandler.spaceshipsRemoveQueue = [];

    //remove enemies
    for (let i = 0; i < SpriteHandler.enemiesRemoveQueue.length; i++){
      SpriteHandler.enemies.splice(SpriteHandler.enemies.findIndex(item => item.id === SpriteHandler.enemiesRemoveQueue[i]),1);
    }
    SpriteHandler.enemiesRemoveQueue = [];

    //remove explosions
    for (let i = 0; i <  SpriteHandler.explosionsRemoveQueue.length; i++){
      SpriteHandler.explosions.splice(SpriteHandler.explosions.findIndex(item => item.id === SpriteHandler.explosionsRemoveQueue[i]),1);
    }
    SpriteHandler.explosionsRemoveQueue = [];




    // render enemies
    if (SpriteHandler.enemies.length > 0) {
      this.enemyCanvasContext.clearRect(0, 0, window.global.screenWidth, window.global.screenHeight);

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

    if (SpriteHandler.weapons.length > 0) {
      this.weaponsContext.clearRect(0,0,window.global.screenWidth, window.global.screenHeight);
      for (let i = 0, len = SpriteHandler.weapons.length;  i < len; i++) {
        try {
          SpriteHandler.weapons[i].update(dt);
          SpriteHandler.weapons[i].render();
        } catch(e){console.error(e)}
      }
    }

    //render spaceships
    this.spaceshipCanvasContext.clearRect(0,0,window.global.screenWidth, window.global.screenHeight);
    if (SpriteHandler.spaceships.length > 0){
      for (let i = 0, len = SpriteHandler.spaceships.length; i < len; i++) {
        try {
          SpriteHandler.spaceships[i].update(dt);
          SpriteHandler.spaceships[i].render();
        } catch(e){console.error(e)}
      }
    }

    this.hudHandler.render(dt);

    // performance
    let end = window.performance.now();
    let perfDif = end-start;
    this.performanceCumul = this.performanceCumul+perfDif;
    if (this.performanceCount >= 100) {
      InfoHandler.render((this.performanceCumul / 100).toFixed(4));
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
      this.#renderDynamicBackgrounds(this.#elapsed);
    }
  }

  startLoop = ()=>{
    this.#fpsInterval = 1000 / 60;
    this.#then = window.performance.now();
   //this.video.play();
    //this.video.loop = true;
    this.#renderStaticBackgrounds();
    this.#animate();
    this.hudHandler.renderStatic();

  }



  renderHud = ()=>{
    //render hud

    this.hudHandler.renderDisplayLeft();
    this.hudHandler.renderDisplayRight();
    this.hudHandler.renderDisplayMiddle();
  }
}