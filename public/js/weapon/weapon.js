class Weapon extends GameObject {

  constructor({
                identification,
                uniqueIdentifier,
                controlAssignment,
                image,
                spriteSheet,
                canvas,
                spriteSheetRows,
                spriteSheetColumns,
    frames,
    currentFrame,
    step,
    stride,
    strideX,
    strideY,
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
      spriteSheet,
      spriteSheetRows,
      spriteSheetColumns,
      image,
      sound,
      width,
      height,
      frames,
      currentFrame,
      step,
      strideX,
      strideY,
      stride,
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