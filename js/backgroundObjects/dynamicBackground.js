class DynamicBackground extends Background {

  constructor(args){
    super(args)
  }

  render = (dt)=>{

    this.context.drawImage(this.image,this.x,this.y, this.width,this.height);
    if (this.doubleDraw) {
      this.context.drawImage(this.image,this.x+this.width, this.y, this.width,this.height);
    }
    if (this.x < 0-this.width){
      if (this.doubleDraw === true ) {
        this.x = 0;
      } else {
        this.callback();
      }
    }
    if (this.step !== 0) {
      this.x -=(this.step);
    }
  }
}