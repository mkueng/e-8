class Laser_01 extends Weapon{

  constructor(params){
    super(params);

    this.id = "laser_01";
    this.imageId = "laser_01";
    this.width = 0;
    this.height = 32;
    this.spriteSheet = true;
    this.stride = 32;
    this.frames = 2;
    this.currentFrame = 0;
    this.loop = true;
    this.active = false;
  }
}