class Planet extends GameObject {

  constructor({
                image,
                width,
                height,
                posX,
                posY,
                posDX,
                posDY,
                velX,
                velY,
                canvas
              }) {
    super({
      image,
      width,
      height,
      posX,
      posY,
      posDX,
      posDY,
      velX,
      velY,
      canvas,
      isDestroyable: false,
      isHitable : false
    })
    this.subCounter = 0;
  }

  update=()=>{
    if (this.posX > (-this.width)) {
      this.posX = this.posX + this.velX;
    } else {
      this.destroy();
    }
  }
}