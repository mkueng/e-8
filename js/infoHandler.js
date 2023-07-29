class InfoHandler {


  static context;
  static render = function(renderTime){
    InfoHandler.context.clearRect(0,0,300, 100);
    InfoHandler.context.fillText("render performance: "+renderTime+" ms", 30, 20);
  }

  constructor(canvasHandler){
    InfoHandler.context = canvasHandler.getCanvas("performanceInfo").context;
    InfoHandler.context.setTransform(1, 0, 0, 1, 0, 0);
    InfoHandler.context.font = "10px myFont";
    InfoHandler.context.fillStyle = "white";
  }


}