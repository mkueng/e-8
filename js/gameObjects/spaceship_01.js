class Spaceship_01 extends SpriteComp {

  constructor(spriteComp, spriteHandler){
    super(spriteComp);
    this.spriteHandler = spriteHandler;
    this.arrowDown = false;
    this.arrowUp = false;
    this.arrowLeft = false;
    this.arrowRight = false;
    this.boundX =  window.global.gameWidth-this.width;
    this.boundY = -30+ this.height;
    this.laserDone = true;

    this.photonTorpedos= this.spriteHandler.createSprite({
      type:"spaceship_01",
      sprite: "shoot_01",
      quantity : 8,
      stage : this
    })
    this.photonTorpedosPool = Object.values(this.photonTorpedos);
    console.log("photoTorpedosPool:",this.photonTorpedosPool );
    InputHandler.subscribe(this);
    return this;
  }

  /**
   * fire photon torpedos
   */
  firePhotonTorpedo = ()=>{
    if (this.photonTorpedosPool.length > 0){
      let photonTorpedo =this.photonTorpedosPool.pop();
      photonTorpedo.x = this.x;
      photonTorpedo.y = this.y;
      this.spriteHandler.addSpriteToGame(SpriteHandler.spriteTypes.weapons, photonTorpedo);
      SoundHandler.playSound("spaceship", "photonShoot");
    }

    // Hud.updateHud({"shotsFired": Hud.props["shotsFired"] + 1});
  }

  photonTorpedoDestroyed = (id)=>{
    this.photonTorpedosPool.unshift(this.photonTorpedos[id]);
    //console.log("photonTorpedosPool:", this.photonTorpedosPool);
  }

  /**
   * fire laser
   */
  fireLaser =()=>{
    this.laserDone = false;
    this.laserTimer = setTimeout(()=>{
      clearTimeout(this.laserTimer);
      SoundHandler.stopSound("spaceship", "laser");
      this.spriteTemplates["laser"].active = false;
      this.laserDone = true;
    },750)
    this.spriteTemplates["laser"].active = true;
    SoundHandler.playSound("spaceship", "laser");
  }

  /**
   * update
   * @param dt
   */
  update = (dt)=>{

    // is laser active?

    if (this.spriteTemplates["laser"].active === true ){
      for (let i=0, len = SpriteHandler.enemies.length; i < len; i++){
        if (this.x <= SpriteHandler.enemies[i].x
          && this.y >= SpriteHandler.enemies[i].y-8
          && this.y <= SpriteHandler.enemies[i].y+SpriteHandler.enemies[i].height
        )
        {
          SpriteHandler.enemies[i].explode();
        }
      }
    }

    // directions
    if (this.arrowDown === true && this.vy <8) {
      this.vy=this.vy+0.2;
    } else
    if (this.arrowUp === true && this.vy >-8){
      this.vy = this.vy-0.2;
    }
    if (this.arrowLeft === true && this.vx > -6) {
      this.vx=this.vx-0.1;
    } else
    if (this.arrowRight === true && this.vx < 6){
      this.vx = this.vx+0.1;
    }

    // border reached
    if (this.y > window.global.gameHeight-50) {
      this.y= window.global.gameHeight -50 ;
      this.vy = 0;
    } else

    if (this.y < this.boundY ) {
        this.y =  this.boundY ;
        this.vy=0;
    }

    if (this.x > this.boundX ) {
      this.x = this.boundX ;
      this.vx=0;
    } else

    if (this.x < 22) {
      this.x = 22;
      this.vx=0;
    }

    // update x,y
    this.y = this.y +this.vy;
    this.x = this.x +this.vx;
  }

  /**
   *
   * @param event
   * @param isKeyDown
   */
  keyEvent = (event, isKeyDown)=> {
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
      //laser
      case "f": {
        if (isKeyDown && this.laserDone === true) this.fireLaser()
        break;
      }
      //photon torpedo
      case " ": {
        if (isKeyDown === true) this.firePhotonTorpedo();
        break;
      }
    }
  }
}