class Background {

  constructor(props){
    this.id = props.id;
    this.image = props.image;
    this.width = props.width;
    this.height = props.height;
    this.x = props.x;
    this.y = props.y;
    this.step = props.step;
    this.context = props.context;
    this.doubleDraw = props.doubleDraw || false;
    this.callback = props.callback;
  }

  render = (dt)=>{

 //   this.context.clearRect(0,0,window.global.gameWidth, window.global.gameHeight);
    this.context.drawImage(this.image,this.x,this.y, this.width,this.height);
    if (this.doubleDraw)  this.context.drawImage(this.image,this.x+this.width, this.y, this.width,this.height);

    if (this.x < 0-this.width){
      if (this.doubleDraw === true ) {
        this.x = 0;
      } else {
        this.callback();
      }
    }
    if (this.step !== 0) {
      this.x -=(this.step/2);
    }
  }
}