class Shield_01 extends Shield{
  constructor(params) {
    super(params);

    this.id = "shield_01";
    this.imageId = "shield_01";
    this.width = 470;
    this.height = 80;
    this.spriteSheet = true;
    this.frames = 14;
    this.currentFrame = 0;
    this.stride = 101.8;
    this.loop = false;
    this.step = 0;
    this.currentStep = 0;
  }
}