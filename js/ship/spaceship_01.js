class Spaceship_01 extends Ship_01 {



  constructor(spriteComp, spriteHandler, args){
    super(spriteComp);
    this.spriteHandler = spriteHandler;
    this.hudHandler = args.hudHandler;
    this.arrowDown = false;
    this.arrowUp = false;
    this.arrowLeft = false;
    this.arrowRight = false;
    this.boundX =  window.global.screenWidth-this.width;
    this.boundY = -30+ this.height;
    this.laserDone = true;

    this.photonTorpedos= this.spriteHandler.createSprite({
      type:"spaceship_01",
      sprite: "shoot_01",
      quantity : 8,
      stage : this
    })
    this.photonTorpedosPool = Object.values(this.photonTorpedos);

    return this;
  }

  /**
   * fire photon torpedos
   */
  firePhotonTorpedo = ()=>{
    if (this.photonTorpedosPool.length > 0){
      let photonTorpedo = this.photonTorpedosPool.pop();
      photonTorpedo.x = this.x;
      photonTorpedo.y = this.y;
      this.spriteHandler.addSpriteToGame(SpriteHandler.spriteTypes.weapons, photonTorpedo);
      SoundHandler.playSound("spaceship", "photonShoot");
    }
  }

  /**
   * weapon destroyed
   * @param id
   */
  weaponDestroyed = (id)=>{
    this.photonTorpedosPool.unshift(this.photonTorpedos[id]);
  }

  /**
   * fire laser
   */
  fireLaser =()=>{
    this.laserDone = false;
    this.spriteTemplates["laser"].active = true;
    SoundHandler.playSound("spaceship", "laser");
  }

  /**
   * stop laser
   */
  stopLaser =()=>{
    this.laserDone = true;
    SoundHandler.stopSound("spaceship", "laser");
    this.spriteTemplates["laser"].active = false;
  }

  /**
   * raise shield
   */
  raiseShield =()=>{
    this.spriteTemplates["shield"].active = true;
    Spaceship_01.shieldPercentage < 1 ?
      this.spriteTemplates["shield"].active = false :
      Spaceship_01.shieldPercentage -= 5;
    if (Spaceship_01.shieldPercentage < 1) {
      this.destroy();
    }
  }

  /**
   * destroy ship
   */
  destroy = ()=>{
    this.spriteHandler.removeSpriteFromGame(SpriteHandler.spriteTypes.spaceships, this.id);
  }

  /**
   * update
   * @param dt
   */
  update = (dt)=>{
    super.update(dt);

    // laser
    if (this.spriteTemplates["laser"].active === true ){
      Spaceship_01.laserPercentage = Spaceship_01.laserPercentage - 3;
      for (let i=0, len = SpriteHandler.enemies.length; i < len; i++){
        if (this.x <= SpriteHandler.enemies[i].x
          && this.y >= SpriteHandler.enemies[i].y-8
          && this.y <= SpriteHandler.enemies[i].y+SpriteHandler.enemies[i].height
        )
        {
          SpriteHandler.enemies[i].explode();
        }
      }
      if ( Spaceship_01.laserPercentage <=0) {
        this.stopLaser();
      }
    } else if (Spaceship_01.laserPercentage < 100 ) {
      Spaceship_01.laserPercentage +=0.5;
    }

    //collision
    for (let i=0; i < SpriteHandler.enemies.length; i++){
      if (this.x+this.width >= SpriteHandler.enemies[i].x
        && this.x <= SpriteHandler.enemies[i].x + SpriteHandler.enemies[i].width
        && this.y >=  SpriteHandler.enemies[i].y
        && this.y <= SpriteHandler.enemies[i].y+SpriteHandler.enemies[i].height
      ){
        this.raiseShield();
        SpriteHandler.enemies[i].explode();
      }
    }

    
  }


}