'use strict'
class EnemyShip extends GameObject {
  constructor({
                activeWeaponID,
                image,
                imageData,
                spriteSheet,
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
                weapons,
                shield,
                terminationSequence,
                particles,
                enemyShipHandler,
                playerShipTracking
              }) {
    super({
      isActive: true,
      identification: "enemyShip",
      image,
      imageData,
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
      posZ,
      posDX,
      posDY,
      isDestroyable: true,
      terminationSequence
    })

    Object.assign(this, {
      activeWeaponID,
      dependencies,
      enemyShipHandler,
      weapons,
      shield,
      posZ,
      terminationSequence,
      imageData,
      particles,
      playerShipTracking
    });

    if (this.weapons) {
      this.activeWeapon = this.weapons[this.activeWeaponID];
    }

    if (this.shield) {
      this.shield.relatedShip = this;
      this.shield.isActive = true;
      this.initializeShield();
    }

  }

  fireWeapon = () => {
   // console.log("fireWeapon");
    if (this.activeWeapon.length > 0) {
      let weapon = this.activeWeapon.pop();
      weapon.active = true;
      weapon.posX = this.posX;
      weapon.posY = this.posY;
      weapon.subscriber = this;
      GameObjectsHandler.instance.addGameObject(weapon);
    }
  }

  initializeShield = () => {
    this.shield.posX = this.posX;
    this.shield.posY = this.posY;
    this.shield.isActive = true;
    GameObjectsHandler.instance.addGameObject(this.shield);

  }

  activateShield = () =>{
    console.log("activateShield");
    this.shield.posX = this.posX;
    console.log("this.shield.posX:", this.shield.posX );
    this.shield.posY = this.posY;
    console.log("this.shield.posY:", this.shield.posY );
    this.shield.isActive = true;
    //SoundHandler.playFX(this.shield.sound);
    //this.shield.strength < 0 ? this.shield.strength = 1 : this.shield.strength -= 50;
  }

  invokeTerminationSequence = () => {
/*
    let i = 0;
    for (const explosion of this.terminationSequence) {
      i++;
      explosion.posX = this.posX;
      explosion.posY = this.posY;
      explosion.velX = this.velX;
      explosion.velY = this.velY;
      setTimeout(() => {
        GameObjectsHandler.instance.addGameObject(explosion);
        SoundHandler.playFX(explosion.sound)
      }, Math.random() * 100 * i)
    }
*/
    this.particles.posX=this.posX;
    this.particles.posY = this.posY;
    this.particles.velX = this.velX;
    this.particles.velY = this.velY;
    GameObjectsHandler.instance.addGameObject(this.particles);
    this.enemyShipHandler.shipDestroyed(this.id);
  }

  destroy = () => {
    this.invokeTerminationSequence();
    super.destroy()
  }

  terminate = () => {
    super.destroy();
  }

  /**
   *
   * @param hitBy
   */
  hit = (hitBy) => {
    //hit by ourselves?
    if (hitBy.identification === "enemyWeapon") {
      return;
    }

    this.activateShield();
    if (this.shield.strength <= 1){
        //this.destroy();
    }
    // destroy hitBy object
    if (hitBy.identification !== "playerShip" && hitBy.isDestroyable === true) {
      hitBy.object.destroy();
    }
  }

  /**
   *
   * @param message
   * @param data
   */

  updateFromGameObjectsHandler = (message, data) => {
    this.weapons[this.activeWeaponID].unshift(data); //todo unshift with actual weaponId
  }

  /**
   *
   * @param dt
   */
  update = (dt) => {
    if (
      this.posY > PlayerShipHandler.activeShip.posY &&
      this.posY < PlayerShipHandler.activeShip.posY+20 &&
      this.posX > PlayerShipHandler.activeShip.posX
    ) {
      this.fireWeapon();
    }
    const zScale = this.posZ > 0 ? 1 / this.posZ : 1;

    if (this.playerShipTracking) {
      this.quotient = (PlayerShipHandler.activeShip.posY - this.posY ) / 300;
      this.posY = this.posY + this.quotient + (this.velY * dt);
      this.posY = this.posY - PlayerShip.velY * zScale;
    } else {
      this.posY = this.posY + (this.velY * dt);
      this.posY = this.posY - PlayerShip.velY * zScale;
    }

    if (this.posX >- this.width && this.posX < (e8.global.screenWidth + e8.global.screenWidth+this.width)) {
      this.posX = this.posX + ((this.velX * dt) + (PlayerShip.velX / 15))
    } else {
      this.terminate();
      this.enemyShipHandler.shipDestroyed(this.id);
    }
    for (const dependency of this.dependencies){
      dependency.posX = this.posX;
      dependency.posY = this.posY;
    }
  }
}