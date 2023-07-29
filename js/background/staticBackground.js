class StaticBackground extends Background {

  constructor(args){
    super(args)
  }

  render = (dt)=>{
    this.context.drawImage(this.image,this.x,this.y, this.width,this.height);
  }
}