class Sprite {

  constructor(sprite){
    this.type = sprite.type;
    this.id = crypto.randomUUID();
    this.context = sprite.context;
    this.height = sprite.height;
    this.width = sprite.width;
    this.x = 0;
    this.y = 0;
    this.dy = sprite.dy;
    this.dx = sprite.dx;
    this.vx = sprite.vx;
    this.vy = sprite.vy;
    this.image = sprite.image;
    this.active = sprite.active;
    this.spriteSheet = sprite.spriteSheet;
    this.stride = sprite.stride;
    this.frames = sprite.frames;
    this.loop = sprite.loop;
    this.currentFrame = sprite.currentFrame;
    this.currentStep = sprite.currentStep;
    this.step = sprite.step;
    this.callback = sprite.callback;
    this.animationCounter = 100;
    this.stage = sprite.stage;
    return this;
  }

  render = ()=> {
    if (this.active) {
      if (this.spriteSheet === true) {


        this.context.drawImage(
          this.image,
          0, this.currentFrame * this.stride,
          this.stride, this.stride,
          this.x + this.dx, this.y + this.dy,
          this.width, this.height
        )
        if (this.currentFrame < this.frames) {
          if (this.currentStep < this.animationCounter) {
            this.currentStep = this.currentStep + this.step;
          } else {
            this.currentStep = 0;
            this.currentFrame++
          }
        } else {
          if (this.loop === true) {
            this.currentFrame = 0;
          } else {
            this.destroy();
          }
        }
      } else {
        this.context.fillStyle = "white";
        this.context.fillRect(this.x, this.y,this.width, this.height);
        this.context.drawImage(
          this.image,
          this.x+this.dx,
          this.y+this.dy,
          this.width,
          this.height
        )
      }
    }
  }
}