class InfoHandler {


  static context;
  static render = function(renderTime){
    InfoHandler.context.clearRect(0,0,window.global.gameWidth, window.global.gameHeight);
    InfoHandler.context.fillText("render performance: "+renderTime+" ms", 30, 20);
  }

  constructor(canvasHandler){
    InfoHandler.context = canvasHandler.getCanvas("performanceInfo").context;
    InfoHandler.context.font = "15px Helvetica";
    InfoHandler.context.fillStyle = "white";
  }


}