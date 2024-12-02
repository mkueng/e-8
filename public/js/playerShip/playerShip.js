'use strict'
class PlayerShip extends GameObject {
  static instance;

  /**
   *
   * @param accX
   * @param accY
   * @param animationLoop
   * @param canvas
   * @param cargo
   * @param coordinates
   * @param currentFrame
   * @param dependencies
   * @param engineTrail
   * @param features
   * @param fuel
   * @param fuelConsumption
   * @param height
   * @param hudHandler
   * @param image
   * @param inputHandler
   * @param maxVelX
   * @param maxVelY
   * @param playerShipHandler
   * @param posDX
   * @param posDY
   * @param posX
   * @param posY
   * @param posZ
   * @param propulsion
   * @param shield
   * @param spriteSheet
   * @param spriteSheetColumns
   * @param spriteSheetRows
   * @param stride
   * @param strideX
   * @param strideY
   * @param terminationSequence
   * @param velX
   * @param velY
   * @param weapons
   * @param width
   */
  constructor({
                accX,
                accY,
                animationLoop,
                canvas,
                cargo,
                coordinates,
                currentFrame,
                dependencies,
                engineTrail,
                features,
                fuel,
                fuelConsumption,
                height,
                hudHandler,
                image,
                inputHandler,
                maxVelX,
                maxVelY,
                playerShipHandler,
                posDX,
                posDY,
                posX,
                posY,
                posZ,
                propulsion,
                shield,
                spriteSheet,
                spriteSheetColumns,
                spriteSheetRows,
                stride,
                strideX,
                strideY,
                terminationSequence,
                velX,
                velY,
                weapons,
                width,
              }) {
    super({
      isActive: true,
      identification: "playerShip",
      currentFrame,
      animationLoop,
      dependencies,
      image,
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

    if (PlayerShip.instance) {
      console.warn("Replacing existing PlayerShip instance.");
    }
    PlayerShip.instance = this;

    Object.assign(this, {
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
    this.shipStatus = "green";
    this.coordinates = 0;
    this.viewPortX = 0;
    this.viewPortY = 0;
    this.posZ = 1;
    
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

  static get weapons() {
    return PlayerShip.instance?.weapons;
  }

  static get coordinates(){
    return PlayerShip.instance?.coordinates;
  }

  static get fuel() {
    return PlayerShip.instance?.fuel.amount;
  }

  static get posX() {
    return PlayerShip.instance?.posX;
  }

  static get posY() {
    return PlayerShip.instance?.posY;
  }

  static get velX() {
    return PlayerShip.instance?.velX;
  }

  static get velY() {
    return PlayerShip.instance?.velY;
  }

  static get shipStatus() {
    return PlayerShip.instance?.shipStatus;
  }

  /**
   *
   * @param key
   * @param execute
   */
  addKeyEvent = ({key, execute}) => {
    this.keyEvents[key] = execute;
  }

  /**
   * @name initializeFeatures
   */
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

  /**
   * @name initializeWeapons
   */
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
   * @name updateFromGameObjectsHandler
   * @param message
   * @param obj
   */
  updateFromGameObjectsHandler = (message,obj) => {
    //this.weapons[obj.uniqueIdentifier].units.unshift(obj);
    //console.log("updateFromGameObjectsHandler", obj);
  }

  /**
   * @name loadCargo
   * @param key
   */
  loadCargo = (key) => {
    //this.cargo[key] = (this.cargo[key] || {key: {amount:0, max:}});

    if (this.cargo[key] >= 100) {
      this.cargo[key] = 100;
    }
  }

  /**
   * @name unloadCargo
   */
  unloadCargo = () => {
  }

  /**
   * @name initializeShield
   */
  initializeShield = () => {
    Object.assign(this.shield, {
      posX: this.posX,
      posY: this.posY
    });
    GameObjectsHandler.instance.addGameObject(this.shield);
  }

  /**
   * @name activateShield
   */
  activateShield = () =>{
    this.shield.posX = this.posX;
    this.shield.posY = this.posY;
    this.shield.isActive = true;
    SoundHandler.playFX(this.shield.sound);
    this.shield.strength = Math.max(this.shield.strength - 10, 0);
  }

  /**
   * @name invokeTerminationSequence
   */
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

  /**
   * @name destroyDependencies
   */
  destroyDependencies = () => this.dependencies.forEach(dependency => dependency.destroy());

  /**
   * @name hit
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

  /**
   * @name render
   * @param interpolation
   */
  render = (interpolation) => {

    // linear interpolation
    let interpolatedX = this.posX + (this.velX * interpolation);
    let interpolatedY = this.posY + (this.velY * interpolation);

    Console.log("interpolatedX: "+interpolatedX.toFixed(2));
    Console.log("interpolatedY: "+interpolatedY.toFixed(2));


    this.context.drawImage(
      this.image,
      interpolatedX,
      interpolatedY
    );
  }
  /**
   * @name update
   * @param deltaTime
   */
  update = (deltaTime) =>{

    // Save previous position
    this.previousPosX = this.posX;
    this.previousPosY = this.posY;

    //check fuel
    if (this.fuel.amount > 0 ) {
      let fuelConsumed = false;

      //control down
      if (this.controls.down && this.velY < this.maxVelY) {
        this.dependencies[0].isActive = false;
        this.dependencies[1].isActive = false;
        this.velY += this.accY*1/this.posZ;
        fuelConsumed = true;
      }
      //control up
      else if (this.controls.up && this.velY > -this.maxVelY) {
        this.dependencies[0].isActive = false;
        this.dependencies[1].isActive = false;
        this.velY -= this.accY*1/this.posZ;
        fuelConsumed = true;
      }
      //control right
      else if (this.controls.right) {
        this.dependencies[1].isActive = false; // throttle off
        this.dependencies[0].isActive = true; // propulsion on

        if (this.velX < this.maxVelX) {
          this.engineTrail.createParticle({posX: this.posX, posY: this.posY}); // show engine trail
          this.velX += this.accX*1/this.posZ;
          fuelConsumed = true;
        }
        //control left
      } else if (this.controls.left ) {
        this.dependencies[0].isActive = false; // propulsion off
        this.dependencies[1].isActive = true; // throttle on

        if (this.posX > 0) {
          this.velX -= this.accX*1/this.posZ;
        }
        fuelConsumed = true;
      } else {
        this.dependencies[0].isActive = false; // propulsion off
        this.dependencies[1].isActive = false; // throttle off
      }
      // Deduct fuel if consumed
      if (fuelConsumed) {
        this.fuel.amount -= this.fuelConsumption;
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
    this.posY = (this.posY + (this.velY * deltaTime * (1/this.posZ)));
    this.posX = (this.posX + (this.velX * deltaTime * (1/this.posZ)));

    if (this.posX > this.upperBoundX) {

      this.posX = this.previousPosX;
    }


    Console.logProperty("posX: "+ this.posX.toFixed(2));
    Console.logProperty("posY: "+ this.posY.toFixed(2));
    Console.logProperty("velX: "+ this.velX.toFixed(2));
    Console.logProperty("velY: "+ this.velY.toFixed(2));



    //update posY of affected gameObjects based on this.posY
    /*

    GameObjectsHandler.gameObjects.forEach(obj => {
      if (obj.posZ) {
        obj.posY = obj.posY - (this.velY * deltaTime * obj.posZ / 2);
      }
    })
*/
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
   * @name mouseEvent
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
   * @name keyEvent
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
