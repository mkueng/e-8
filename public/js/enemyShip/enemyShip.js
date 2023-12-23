class EnemyShip extends GameObject {
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
                terminationSequence,
                enemyShipHandler
              }) {
    super({
      identification : "enemyShip",
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
      isHitable: true,
      isDestroyable : true,
      terminationSequence

    })
    Object.assign(this, {
      dependencies,
      weapons,
      terminationSequence,
      enemyShipHandler
    });

    this.activeWeapon = this.weapons[PhotonTorpedoEnemy]
  }

  fireWeapon(){
    if (this.activeWeapon.length > 0) {
      let weapon = this.activeWeapon.pop();
      weapon.active = true;
      weapon.posX = this.posX;
      weapon.posY = this.posY;
      weapon.subscriber = this;
      GameObjectsHandler.instance.addGameObject(weapon);
    }
  }

  hit(hitBy){
    if (hitBy.identification !== "enemyWeapon") {
      this.terminationSequence.posX = this.posX;
      this.terminationSequence.posY = this.posY;
      this.terminationSequence.velX = this.velX;
      this.terminationSequence.velY = this.velY;
      GameObjectsHandler.instance.addGameObject(this.terminationSequence);
      SoundHandler.playSound(this.terminationSequence.sound);
      this.destroy();
      this.enemyShipHandler.shipDestroyed(this.id);

      //hitBy.object.destroy();
    /*  for (const dependency of this.dependencies){
        dependency.destroy();
      }*/
    }
  }

  subscriptionsUpdate(message, obj){
    this.weapons[PhotonTorpedoEnemy].unshift(obj);
  }

  update(dt){
    if (
      this.posY > PlayerShipHandler.activeShip.posY &&
      this.posY < PlayerShipHandler.activeShip.posY+20 &&
      this.posX > PlayerShipHandler.activeShip.posX
    ) {
      this.fireWeapon();
    }
    if (this.posX > - 300) {
      this.posX = this.posX + (this.velX*dt)
    } else {
      this.posX = window.global.screenWidth+50;
    }
    this.posY = this.posY +(this.velY*dt);

  }
}