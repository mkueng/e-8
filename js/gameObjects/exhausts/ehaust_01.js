class Exhaust_01 extends Exhaust {

  constructor(params){
    super(params)

    this.id = "exhaust_01";
    this.imageId = "exhaust_01";
    this.width = 22;
    this.height = 6;
    this.spriteSheet = true;
    this.frames = 7;
    this.currentFrame = 0;
    this.stride = 128;
    this.active = true;
    this.loop = true;
    this.step = 0.25;
    this.currentStep = 0;
  }
}