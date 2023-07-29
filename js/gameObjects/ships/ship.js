class Ship extends GameObject {

  constructor(params){
    super(params);

    this.propulsionPercentage = params.propulsionPercentage || 100;
    this.shieldPercentage = params.shieldPercentage || 100;

    this.arrowDown = false;
    this.arrowUp = false;
    this.arrowLeft = false;
    this.arrowRight = false;

    InputHandler.subscribe(this);

  }

  update(dt){

    this.propulsionPercentage < 0 ?  this.spriteTemplates["exhaust_01"].active = false : this.propulsionPercentage -=0.005;


    // directions
    if (this.arrowDown === true && this.vy <8) {
      this.vy=this.vy+0.2;
    } else
    if (this.arrowUp === true && this.vy >-8){
      this.vy = this.vy-0.2;
    }
    if (this.arrowLeft === true && this.vx > -7) {
      this.vx=this.vx-0.3;
    } else
    if (this.arrowRight === true && this.vx < 7){
      this.vx = this.vx+0.3;
    }


    // border reached
    if (this.y > window.global.screenHeight-50) {
      this.y= window.global.screenHeight -50 ;
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
        Spaceship_01.propulsionPercentage -=0.02;
        break;
      }
      case "ArrowUp" : {
        this.arrowUp = !this.arrowUp;
        Spaceship_01.propulsionPercentage -=0.02;
        break;
      }
      case "ArrowLeft": {
        this.arrowLeft = !this.arrowLeft;
        Spaceship_01.propulsionPercentage -=0.02;
        break;
      }
      case "ArrowRight": {
        this.arrowRight = !this.arrowRight;
        Spaceship_01.propulsionPercentage -=0.02;
        break;
      }
      //laser
      case "f": {
        if (isKeyDown && this.laserDone === true) this.fireLaser()
        break;
      }
      //shield
      case "s": {
        if (isKeyDown) this.raiseShield();
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