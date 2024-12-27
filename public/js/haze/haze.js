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
      alpha: Math.random()+0.4,
      isActive: true,
      identification: "haze",
      canvas,
      image,
      hasMass: true,
      width,
      height,
      posX,
      posY,
      posZ,
      velX,
      velY,
      vector: -1,
      canDestroy : false,
      isHittable : false,
      isDestroyable: false,
    });
    this.boundX = 0-this.width;
  }


}