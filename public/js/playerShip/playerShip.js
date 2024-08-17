'use strict'
class PlayerShip extends GameObject {


  static posX;
  static posY;
  static velY;
  static velX;
  static coordinates;
  static fuel;
  static status;
  static weapons;

  /**
   *
   * @param image
   * @param spriteSheet
   * @param spriteSheetRows
   * @param spriteSheetColumns
   * @param strideX
   * @param strideY
   * @param animationLoop
   * @param currentFrame
   * @param stride
   * @param width
   * @param height
   * @param posX
   * @param posY
   * @param posZ
   * @param posDX
   * @param posDY
   * @param velX
   * @param velY
   * @param maxVelX
   * @param maxVelY
   * @param accX
   * @param accY
   * @param canvas
   * @param dependencies
   * @param propulsion
   * @param weapons
   * @param features
   * @param shield
   * @param cargo
   * @param fuel
   * @param fuelConsumption
   * @param terminationSequence
   * @param engineTrail
   * @param playerShipHandler
   * @param inputHandler
   * @param hudHandler
   * @param coordinates
   */
  constructor({
                image,
                spriteSheet,
    spriteSheetRows,
    spriteSheetColumns,
    strideX,
    strideY,
    animationLoop,
                currentFrame,
                stride,
                width,
                height,
                posX,
                posY,
                posZ,
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
                propulsion,
                weapons,
                features,
                shield,
                cargo,
                fuel,
                fuelConsumption,
                terminationSequence,
                engineTrail,
                playerShipHandler,
                inputHandler,
                hudHandler,
                coordinates
              }) {
    super({
      isActive: true,
      identification: "playerShip",
      currentFrame,
      animationLoop,
      spriteSheet,
      stride,
      spriteSheetColumns,
      spriteSheetRows,
      strideX,
      strideY,
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
      posZ,
      posDX,
      posDY,
      isDestroyable: true,
      canDestroy: true,
      hitWidth: width + 70,
      coordinates
    })

    Object.assign(this, {
      dependencies,
      weapons,
      features,
      shield,
      cargo,
      terminationSequence,
      engineTrail,
      hudHandler,
      inputHandler,
      playerShipHandler,
      propulsion,
      fuel,
      fuelConsumption
    });

    // Initialize properties
    this.keyEvents = {};
    this.upperBoundY = e8.global.screenHeight - this.height;
    this.upperBoundX = e8.global.screenWidth/1.5 - this.width;
    this.lowerBoundX = 10;
    this.shield.relatedShip = this;
    this.shieldInfoCritical = false;
    this.shieldInfoRecharged = true;
    this.viewPortVelX = 0;
    this.status = "green";
    this.coordinates = 10000000;
    PlayerShip.weapons = this.weapons;

    this.controls = {
      down: false,
      up: false,
      left: false,
      right: false
    }

    e8.global.inputHandler.subscribe(this);
    this.initializeWeapons();
    this.initializeFeatures();
    this.initializeShield();


    // register playerShip and dependencies with GameObjectsHandler
    GameObjectsHandler.instance.addGameObject(this);
    this.addDependencies();
  }

  /**
   *
   * @param key
   * @param execute
   */
  addKeyEvent = ({key, execute}) => {
    this.keyEvents[key] = execute;
  }

  initializeFeatures = () => {
    for (const feature in this.features){
      const {controlAssignment, type} = this.features[feature];
      this.addKeyEvent({
        key: controlAssignment,
        execute: () => {
          type.activate({dependency: this})
        }
      })
    }
  }

  initializeWeapons = () => {
    for (const weapon in this.weapons) {
      const { controlAssignment, units } = this.weapons[weapon];
      this.addKeyEvent({
        key: controlAssignment,
        execute: () => {
          if (units.length > 0) {
            const unit = units.pop();
            if (unit.ready === true) {
              unit.activate({posX: this.posX, posY: this.posY, dependency: this});
            } else {
              units.unshift(unit);
            }
          }
        }
      });
      units.forEach(unit => unit.subscribe(this));
    }
  };


  /**
   *x
   * @param message
   * @param obj
   */
  updateFromGameObjectsHandler = (message,obj) => {
    //this.weapons[obj.uniqueIdentifier].units.unshift(obj);
    //console.log("updateFromGameObjectsHandler", obj);
  }

  /**
   *
   * @param key
   */
  loadCargo = (key) => {
    //this.cargo[key] = (this.cargo[key] || {key: {amount:0, max:}});

    if (this.cargo[key] >= 100) {
      this.cargo[key] = 100;
    }
  }

  unloadCargo = () => {
  }

  initializeShield = () => {
    Object.assign(this.shield, {
      posX: this.posX,
      posY: this.posY
    });
    GameObjectsHandler.instance.addGameObject(this.shield);
  }

  activateShield = () =>{
    this.shield.posX = this.posX;
    this.shield.posY = this.posY;
    this.shield.isActive = true;
    SoundHandler.playFX(this.shield.sound);
    this.shield.strength = Math.max(this.shield.strength - 10, 0);
  }

  invokeTerminationSequence = () => {
    Object.assign(this.terminationSequence, {
      posX: this.posX,
      posY: this.posY,
      velX: this.velX,
      velY: this.velY
    });
    GameObjectsHandler.instance.addGameObject(this.terminationSequence);
    this.destroy();
    this.destroyDependencies();
    e8.global.inputHandler.unsubscribe(this);
    this.playerShipHandler.shipDestroyed(this);
  }

  destroyDependencies = () => this.dependencies.forEach(dependency => dependency.destroy());

  /**
   *
   * @param hitBy
   */
  hit = (hitBy) => {
    if (hitBy.identification === "weaponPlayer") {
      return; // Ignore hits from player's own weapon
    }
    this.activateShield();

    if (this.shield.strength < 30 && this.shieldInfoCritical === false) {
      SpeechHandler.playStatement(SpeechHandler.statements.shieldCritical)
      this.shieldInfoCritical = true;
      this.shieldInfoRecharged = false;
    }

    if (this.shield.strength <= 1){
      this.invokeTerminationSequence();
    }
    hitBy.object.destroy();
  }

  render = () => {
    const frame = this.currentFrame;
    const column = frame % this.spriteSheetColumns;
    const row = Math.floor(frame / this.spriteSheetColumns);

    this.context.drawImage(
      this.spriteSheet,
      column * this.strideX,
      row * this.strideY,
      this.strideX,
      this.strideY,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
  /**
   *
   * @param deltaTime
   */
  update = (deltaTime) =>{
    //check fuel
    if (this.fuel.amount > 0 ) {

      //control down
      if (this.controls.down && this.velY < this.maxVelY) {
        if (this.currentFrame < 16) {
          this.currentFrame = this.currentFrame + 1;
        }
        this.velY += this.accY;
        this.fuel.amount = this.fuel.amount - this.fuelConsumption;
      }
      //control up
      else if (this.controls.up && this.velY > -this.maxVelY) {
        if (this.currentFrame > 0 ) {
          this.currentFrame = this.currentFrame - 1;
        }

        this.velY -= this.accY;
        this.fuel.amount = this.fuel.amount - this.fuelConsumption;
      }
      //control right
      else if (this.controls.right) {
        this.viewPortVelX += this.accX;
        this.dependencies[0].isActive = true; // propulsion on
        if (this.currentFrame < 10) {
          this.currentFrame++;
        }
        if (this.currentFrame > 10) {
          this.currentFrame--;
        }
        if (this.posX < this.upperBoundX) {
          this.engineTrail.createParticle({posX: this.posX, posY: this.posY}); // show engine trail
        }
        if (this.velX < this.maxVelX) {
          this.velX += this.accX;
          this.fuel.amount = this.fuel.amount - this.fuelConsumption;
        } else {
          // this.dependencies[0].isActive = false; // propulsion off
        }
        //control left
      } else if (this.controls.left) {
        if (this.currentFrame < 10) {
          this.currentFrame++;
        }
        if (this.currentFrame > 10) {
          this.currentFrame--;
        }
        this.dependencies[0].isActive = false; // propulsion off
        this.dependencies[1].isActive = true; // throttle on
        this.viewPortVelX -= this.accX;
        if (this.velX > 0 && this.posX === this.lowerBoundX) {
          this.velX -= this.accX;
        }
        this.fuel.amount = this.fuel.amount - this.fuelConsumption;
      } else {
        this.dependencies[0].isActive = false; // propulsion off
        if (this.currentFrame < 10) {
          this.currentFrame++;
        }
        if (this.currentFrame > 10) {
          this.currentFrame--;
        }
      }
    }

    if (this.fuel.amount < 30 || this.shield.strength < 30) {
      PlayerShip.status = "red"
    } else {
      PlayerShip.status = "green"
    }

    // bounds
    if (this.posY > this.upperBoundY) {
      this.posY = this.upperBoundY ;
      this.velY = 0;
    } else if (this.posY < 0 ) {
      this.posY = 0 ;
      this.velY = 0;
    }

    // position
    this.posY = this.posY + (this.velY * deltaTime);
    this.posX = this.posX + (this.viewPortVelX * deltaTime);

    if (this.posX >= this.upperBoundX) {
      this.viewPortVelX = 0;
      this.posX = this.upperBoundX;
    } else if (this.posX <= this.lowerBoundX) {
      this.viewPortVelX = 0;
      this.posX = this.lowerBoundX;
    }

    //coordinates
    this.coordinates = this.coordinates + (this.velX * deltaTime / 5);
    PlayerShip.coordinates = this.coordinates;
    PlayerShip.velY = this.velY;
    PlayerShip.velX = this.velX;
    PlayerShip.fuel = this.fuel.amount;
    PlayerShip.shield = this.shield.strength;

    //update posY of affected gameObjects based on this.posY
    GameObjectsHandler.gameObjects.forEach(obj => {
      if (obj.posZ) {
        obj.posY = obj.posY - (this.velY * deltaTime * obj.posZ / 2);
      }
    })

    // position dependencies
    for (const dependency of this.dependencies){
      dependency.posX = this.posX;
      dependency.posY = this.posY;
    }

    // shield
    if (this.shield.strength < 100) {
      this.shield.strength+= 0.04;

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

      case 0 : {
        this.keyEvents["Space"]();
        break;
      }
      case 2 : {
        this.keyEvents["KeyK"]();
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
          this.controlsEvent = isKeyDown;
          break;
        case "KeyW":
          this.controls.up = isKeyDown;
          this.controlsEvent = isKeyDown;
          break;
        case "KeyA":
          this.controls.left = isKeyDown;
          this.controlsEvent = isKeyDown;
          break;
        case "KeyD":
          this.controls.right = isKeyDown;
          this.controlsEvent = isKeyDown;
          break;
      }
    }
  }
}
