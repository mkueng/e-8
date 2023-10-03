class InfoHandler {

  //singleton
  static instance = new this();

  static context;
  static render = function(renderTime, fps){
    InfoHandler.context.clearRect(0,0,300, 100);
    InfoHandler.context.fillText("render time: "+renderTime+" ms", 20, 20);
    InfoHandler.context.fillText("fps: "+fps, 180, 20);
  }

  invoke(){


    InfoHandler.context = CanvasHandler.instance.getCanvas("performanceInfo").context;
    InfoHandler.context.setTransform(1, 0, 0, 1, 0, 0);
    InfoHandler.context.font = "10px myFont";
    InfoHandler.context.fillStyle = "white";
  }
}