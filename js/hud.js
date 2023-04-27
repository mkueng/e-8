class Hud {

  static props = {
    shotsFired : 0
  }



  static updateHud=(props)=>{
    Hud.props["shotsFired"]=props.shotsFired;
  }

  constructor(canvas){
    this.context = canvas.context;
    this.context.font = "15px Helvetica";
    this.context.fillStyle = "white";
    this.image = document.querySelector("#hud");
    this.width =  window.global.gameWidth/1.5;
    this.height= 150;
    this.x=  window.global.gameWidth/6;
    this.y= window.global.gameHeight-150;
    this.counter = 0;
    this.context.textAlign="left"
    this.shotsFired = 0;
  }


  render = (dt)=>{
    this.counter++;
    this.context.clearRect(0,0,window.global.gameWidth, window.global.gameHeight);
    this.context.drawImage(this.image, this.x,this.y, this.width,this.height);
    //this.context.fillText("GAMETIME: "+this.counter, 30, window.global.gameHeight-20);
    //this.context.fillText("FIRED: "+ Hud.props["shotsFired"], window.global.gameWidth-100, window.global.gameHeight-20);
  }


}