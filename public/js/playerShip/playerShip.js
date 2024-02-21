'use strict'
class PlayerShip extends GameObject {

  /**
   *
   * @param image
   * @param spriteSheet
   * @param currentFrame
   * @param stride
   * @param width
   * @param height
   * @param posX
   * @param posY
   * @param velX
   * @param velY
   * @param maxVelX
   * @param maxVelY
   * @param accX
   * @param accY
   * @param canvas
   * @param propulsion
   * @param weapons
   */
  constructor({
                image,
                spriteSheet,
                currentFrame,
                stride,
                width,
                height,
                posX,
                posY,
                posDX,
                posDY,
                velX,
                velY,
                maxVelX,
                maxVelY,
                accX,
                accY,
                canvas,
                dependencies,
                weapons,
                features,
                shield,
                terminationSequence,
                engineTrail,
                playerShipHandler,
                inputHandler,
                hudHandler
              }) {
    super({
      isActive: true,
      identification: "playerShip",
      image,
      currentFrame,
      stride,
      spriteSheet,
      width,
      height,
      velX,
      velY,
      maxVelX,
      maxVelY,
      accX,
      accY,
      canvas,
      posX,
      posY,
      posDX,
      posDY,
      isDestroyable: true,
      canDestroy: true,
      hitWidth: width+ 70
    })

    Object.assign(this, {
      dependencies,
      weapons,
      features,
      shield,
      terminationSequence,
      engineTrail,
      hudHandler,
      inputHandler,
      playerShipHandler
    });

    // Initialize properties
    this.keyEvents = {};
    this.upperBoundY = e8.global.screenHeight - this.height;
    this.upperBoundX = e8.global.screenWidth - this.width;
    this.shield.relatedShip = this;
    this.shieldInfoCritical = false;
    this.shieldInfoRecharged = true;

    this.controls = {
      down: false,
      up: false,
      left: false,
      right: false
    }

    // Subscribe to input handler
    this.inputHandler.subscribe(this);

    // Initialize weapons and add to GameObjectsHandler
    this.initializeWeapons();

    this.initializeFeatures();

    // Update shield in the HUD
    this.hudHandler.updateHudInfo({
      shield : this.shield.strength
    });

    // Add player ship to GameObjectsHandler
    GameObjectsHandler.instance.addGameObject(this);

    // Add dependencies to GameObjectsHandler
    this.addDependencies();

  }

  /**
   *
   * @param key
   * @param execute
   */
  addKeyEvent = ({key, execute})=>{
    this.keyEvents[key] = execute;
    console.log("keyEvents:", this.keyEvents);
  }

  /**
   *
   */
  addDependencies = ()=>{
    this.dependencies.forEach(dependency => GameObjectsHandler.instance.addGameObject(dependency));
  }

  initializeFeatures = () => {
    for (const feature in this.features){
      const {controlAssignment, type} = this.features[feature];
      console.log("controlAssignment: ", controlAssignment);
      console.log("execute: ", type.execute);
      this.addKeyEvent({
        key: controlAssignment,
        execute: type.execute
      })
    }
  }

  /**
   *
   */
  initializeWeapons = ()=>{
    for (const weapon in this.weapons) {
      const { controlAssignment, units } = this.weapons[weapon];
      this.addKeyEvent({
        key: controlAssignment,
        execute: () => {
          if (units.length > 0) {
            const activeWeapon = units.pop();
            if (activeWeapon.ready === true) {
              activeWeapon.activate({posX: this.posX, posY: this.posY, dependency: this});
            } else {
              units.unshift(activeWeapon);
            }
          }
        }
      });
      units.forEach(unit => unit.subscribe(this));
    }
  };


  /**
   *
   * @param message
   * @param obj
   */
  subscriptionsUpdate = (message,obj)=>{
    this.weapons[obj.uniqueIdentifier].units.unshift(obj);
  }

  /**
   *
   */
  invokeShield = () => {
    this.shield.posX = this.posX;
    this.shield.posY = this.posY;
    GameObjectsHandler.instance.addGameObject(this.shield);
    SoundHandler.playFX(this.shield.sound);
    this.shield.strength < 0 ?  this.shield.strength = 1: this.shield.strength -=10;
  }

  /**
   *
   */
  invokeTerminationSequence = () => {
    this.terminationSequence.posX = this.posX;
    this.terminationSequence.posY = this.posY;
    this.terminationSequence.velX = this.velX;
    this.terminationSequence.velY = this.velY;
    GameObjectsHandler.instance.addGameObject(this.terminationSequence);

    this.destroy();
    this.destroyDependencies();
    this.inputHandler.unsubscribe(this);
    this.playerShipHandler.shipDestroyed(this);
  }

  /**
   *
   */
  destroyDependencies = ()=>{
    for (const dependency of this.dependencies) {
      dependency.destroy();
    }
  }

  /**
   *
   * @param hitBy
   */
  hit = (hitBy)=> {
    if (hitBy.identification === "weaponPlayer") {
      return; // Ignore hits from player's own weapon
    }
    this.invokeShield();

    if (this.shield.strength < 30 && this.shieldInfoCritical === false) {
      SpeechHandler.playStatement(SpeechHandler.statements.shieldCritical)
      this.shieldInfoCritical = true;
      this.shieldInfoRecharged = false;
    }

    if (this.shield.strength <= 1){
      this.invokeTerminationSequence();
    }

    // Destroy hit object
    hitBy.object.destroy();
  }

  /**
   *
   * @param deltaTime
   */
  update = (deltaTime)=>{

    // directional controls
    if (this.controls.down === true && this.velY < this.maxVelY) {
      this.velY = (this.velY + this.accY);
    } else if (this.controls.up === true && this.velY > -this.maxVelY) {
      this.velY = (this.velY - this.accY);
    } else if (this.controls.right === true && this.velX < this.maxVelX) {
      this.velX = (this.velX + this.accX);
    } else if (this.controls.left === true && this.velX > -this.maxVelX) {
      this.velX = (this.velX - this.accX);
    }

    // bounds
    if (this.posY > this.upperBoundY) {
      this.posY = this.upperBoundY ;
      this.velY = 0;
    } else

    if (this.posY < 0 ) {
      this.posY = 0 ;
      this.velY = 0;
    } else

    if (this.posX > this.upperBoundX) {
      this.posX = this.upperBoundX;
      this.velX=0;
    } else

    if (this.posX < 1) {
      this.posX = 1;
      this.velX = 0;
    }

    // position
    this.posY = this.posY + (this.velY*deltaTime);
    this.posX = this.posX + (this.velX*deltaTime);

    // engineTrail
    if (this.velX>1){
      if (this.velY>1){
        this.engineTrail.create({posX: this.posX, posY: this.posY-4});
      } else
      if (this.velY < -1){
        this.engineTrail.create({posX:this.posX, posY:this.posY+4});
      } else
      {
        this.engineTrail.create({posX:this.posX, posY: this.posY});
      }
    }

    // position dependencies
    for (const dependency of this.dependencies){
      dependency.posX = this.posX;
      dependency.posY = this.posY;
    }

    // shield
    if (this.shield.strength < 100) {
      this.shield.strength+= 0.04;
      this.hudHandler.updateHudInfo({
        shield : this.shield.strength
      });

      if (this.shield.strength > 60 && this.shieldInfoRecharged === false){
        this.shieldInfoRecharged = true;
        this.shieldInfoCritical = false;
        SpeechHandler.playStatement(SpeechHandler.statements.shieldRecharged)
      }
    }

  }

  /**
   * 
   * @param event
   */
  mouseEvent = (event)=>{
    switch (event) {
      case "left" : {
        this.keyEvents["Space"]();
        break;
      }
      case "right": {
        this.keyEvents["KeyL"]();
        break;
      }
    }
  }

  /**
   *
   * @param event
   * @param isKeyDown
   */
  keyEvent = (event, isKeyDown) => {

    if (this.keyEvents[event] && isKeyDown){
      this.keyEvents[event]();
    } else {
      switch (event) {
        case "KeyS":
          this.controls.down = isKeyDown;
          break;
        case "KeyW":
          this.controls.up = isKeyDown;
          break;
        case "KeyA":
          this.controls.left = isKeyDown;
          break;
        case "KeyD":
          this.controls.right = isKeyDown;
          break;
      }
    }
  }
}
