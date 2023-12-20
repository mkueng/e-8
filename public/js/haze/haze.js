class Haze extends GameObject{

  constructor({
    canvas,
    image,
    width,
    height,
    posX,
    posY,
    velX,
    velY
              }){
    super({
      canvas,
      image,
      width,
      height,
      posX,
      posY,
      velX,
      velY,
      canDestroy : false,
      isHitable : false,
      isDestroyable: false,
    });
    this.boundX = 0-this.width;
  }

  update(dt) {
    this.posX = this.posX+this.velX;
    if (this.posX < this.boundX) {
      this.destroy();
    }
  }
}