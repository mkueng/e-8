class Haze extends GameObject{

  constructor({
    canvas,
    image,
    width,
    height,
    posX,
    posY,
      posZ,
    velX,
    velY
              }){
    super({
      isActive: true,
      canvas,
      image,
      width,
      height,
      posX,
      posY,
      posZ,
      velX,
      velY,
      canDestroy : false,
      isHitable : false,
      isDestroyable: false,
    });
    this.boundX = 0-this.width;
  }

  /**
   *
   * @param dt
   */
  update(dt) {
    this.posX = this.posX+(this.velX*dt);
    if (this.posX < this.boundX) {
      this.destroy();
    }
  }
}