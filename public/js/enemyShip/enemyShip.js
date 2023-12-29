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

  invokeTerminationSequence = ()=>{
    let i = 0;
    console.log("terminationSequence: ", this.terminationSequence);
    SoundHandler.playSound(this.terminationSequence[0].sound);
    for (const explosion of this.terminationSequence){
      i++;
      explosion.posX = this.posX;
      explosion.posY = this.posY;
      explosion.velX = this.velX;
      explosion.velY = this.velY;
      setTimeout(()=>{

        GameObjectsHandler.instance.addGameObject(explosion);
      }, Math.random()*100*i)
    }
    this.destroy();
    this.enemyShipHandler.shipDestroyed(this.id);
  }

  hit(hitBy){
    if (hitBy.identification !== "enemyWeapon") {
      /*
      this.terminationSequence.posX = this.posX;
      this.terminationSequence.posY = this.posY;
      this.terminationSequence.velX = this.velX;
      this.terminationSequence.velY = this.velY;
      */

      //GameObjectsHandler.instance.addGameObject(this.terminationSequence);
      this.invokeTerminationSequence();
      //SoundHandler.playSound(this.terminationSequence.sound);


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
    if (this.posX > - this.width) {
      this.posX = this.posX + (this.velX*dt)
    } else {
      this.destroy();
         this.enemyShipHandler.shipDestroyed(this.id);
    }
    this.posY = this.posY +(this.velY*dt);

  }
}