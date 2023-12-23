class Weapon extends GameObject {

  constructor({
                identification,
                uniqueIdentifier,
                controlAssignment,
                image,
                spriteSheet,
                canvas,
                width,
                height,
                posDX,
                posDY,
                velX,
                velY,
                sound
              })
  {
    super({
      identification,
      canvas,
      image,
      sound,
      spriteSheet,
      width,
      height,
      posDX,
      posDY,
      velX,
      velY,
      isHittable : false,
      isDestroyable : false,
      canDestroy : true
    });

    this.controlAssignment = controlAssignment;
    this.uniqueIdentifier = uniqueIdentifier;
  }

  activate(posX, posY){
    this.posX = posX;
    this.posY = posY;
  }

  update(dt) {
    this.posX = (this.posX < window.global.screenWidth && this.posX > 0) ? this.posX + (this.velX * dt) : this.destroy();
    this.posY = this.posY + (this.velY);
  }

}