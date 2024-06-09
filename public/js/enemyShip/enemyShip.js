'use strict'
class EnemyShip extends GameObject {
  constructor({
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
      dependencies,
      enemyShipHandler,
      weapons,
      shield,
      terminationSequence,
      imageData,
      particles,
      playerShipTracking
    });

    this.activeWeapon = this.weapons[PhotonTorpedoEnemy]
    this.shield.relatedShip = this
  }

  /**
   *
   */
  fireWeapon = () => {
    if (this.activeWeapon.length > 0) {
      let weapon = this.activeWeapon.pop();
      weapon.active = true;
      weapon.posX = this.posX;
      weapon.posY = this.posY;
      weapon.subscriber = this;
      GameObjectsHandler.instance.addGameObject(weapon);
    }
  }

  /**
   *
   */
  invokeShield = () => {
    this.shield.posX = this.posX;
    this.shield.posY = this.posY;
    GameObjectsHandler.instance.addGameObject(this.shield);
    SoundHandler.playFX(this.shield.sound);
    this.shield.strength < 0 ? this.shield.strength = 1 : this.shield.strength -= 50;
  }

  invokeTerminationSequence = () => {

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

  /**
   *
   * @param hitBy
   */
  hit = (hitBy) => {
    //hit by ourselves?
    if (hitBy.identification === "enemyWeapon") {
      return;
    }

    this.invokeShield();
    if (this.shield.strength <= 1){
        this.destroy();
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
    this.weapons[PhotonTorpedoEnemy].unshift(data);
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
    if (this.playerShipTracking) {
      this.quotient = (PlayerShipHandler.activeShip.posY - this.posY ) / 300;
      this.posY = this.posY + this.quotient +(this.velY*dt);
    } else {
      this.posY = this.posY + (this.velY*dt);
    }

    if (this.posX >- this.width) {
      this.posX = this.posX + (this.velX*dt)
    } else {
      this.destroy();
      this.enemyShipHandler.shipDestroyed(this.id);
    }
  }
}