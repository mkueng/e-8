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
                terminationSequence,
                particles,
                enemyShipHandler,
                hasPlayerShipTracking
              }) {
    super({
      isActive: true,
      identification: "enemyShip",
      dependencies,
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
      enemyShipHandler,
      weapons,
      posZ,
      terminationSequence,
      imageData,
      particles,
      hasPlayerShipTracking
    });

    if (this.weapons) {
      this.activeWeapon = this.weapons[this.activeWeaponID];
    }
  }

  fireWeapon = () => {
   // console.log("fireWeapon");
    if (this.activeWeapon.length > 0) {
      let weapon = this.activeWeapon.pop();
      console.log("weapon", weapon);
      weapon.active = true;
      weapon.posX = this.posX;
      weapon.posY = this.posY;
      weapon.subscriber = this;
      GameObjectsHandler.instance.addGameObject(weapon);
    }
  }

  activateShield = () =>{
    this.dependencyObjects["shield"].posX = this.posX;
    this.dependencyObjects["shield"].posY = this.posY;
    this.dependencyObjects["shield"].isActive = true;
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
    this.particles.posX= this.posX;
    this.particles.posY = this.posY;
    this.particles.velX = this.velX;
    this.particles.velY = this.velY;
    console.log("this.particles velX", this.particles.velX);
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
    /*
    if (this.shield.strength <= 1){
        //this.destroy();
    }*/
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

    if (this.hasPlayerShipTracking) {
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
    for (let i = 0; i < this.dependencies.length; i++) {
      this.dependencies[i].posX = this.posX;
      this.dependencies[i].posY = this.posY;
    }
  }
}