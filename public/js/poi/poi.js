class Poi extends GameObject {

  constructor({
    image,
    width,
    height,
    posX,
    posY,
    posDX,
    posDY,
    canvas,
      dependencies

              }){
    super({
      isActive:true,
      image,
      width,
      height,
      posX,
      posY,
      posDX,
      posDY,
      canvas,
      dependencies
      }
    );
  }
}