class SpriteComp extends GameObjectInterface {

  constructor(spriteComp){
    super();

    this.id = spriteComp.id;
    this.context = spriteComp.context;
    this.height = spriteComp.height;
    this.width = spriteComp.width;
    this.x = spriteComp.x;
    this.y = spriteComp.y;
    this.vx = spriteComp.vx;
    this.vy = spriteComp.vy;
    this.spriteTemplates = spriteComp.spriteTemplates;
    this.sT = [];
    this.keyEvents = spriteComp.keyEvents;
    for (const template in  this.spriteTemplates) {
      this.sT.push(this.spriteTemplates[template]);
    }
    return this;
  }


  render = ()=>{

    this.context.clearRect(0,0, window.global.gameWidth, window.global.gameHeight);
    for (let i = 0; i <  this.sT.length; i++) {

      if (this.sT[i].active === true) {

        if (this.sT[i].spriteSheet === true) {
          if (this.sT[i].repeatY) {

          } else {
            this.context.drawImage(
              this.sT[i].image,
              0, this.sT[i].currentFrame * this.sT[i].stride,
              this.sT[i].stride, this.sT[i].stride,
              this.x + this.sT[i].dx, this.y + this.sT[i].dy,
              this.sT[i].width, this.sT[i].height
            );
            if (this.sT[i].currentFrame < this.sT[i].frames) {

              this.sT[i].currentFrame++
            } else {
              this.sT[i].currentFrame = 0;

            }
          }
        } else {

          this.context.drawImage(
            this.sT[i].image,
            this.x + this.sT[i].dx, this.y + this.sT[i].dy,
            this.sT[i].width, this.sT[i].height
          )
        }
      }
    }
  }
}