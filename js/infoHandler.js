class InfoHandler {

  //singleton
  static instance = new this();

  static context;
  static render = function(renderTime, fps, coordinate){
    InfoHandler.context.clearRect(0,window.global.screenHeight-100,window.global.screenWidth, 100);
    InfoHandler.context.fillText("render time: "+renderTime+" ms", window.global.centerHorizontal-400, window.global.screenHeight-20);
    InfoHandler.context.fillText("/ fps: "+fps, window.global.centerHorizontal-100, window.global.screenHeight-20);
    InfoHandler.context.fillText("/ coordinate: "+coordinate, window.global.centerHorizontal+100, window.global.screenHeight-20);
  }

  invoke(){


    InfoHandler.context = CanvasHandler.instance.getCanvas("performanceInfo").context;
    InfoHandler.context.setTransform(1, 0, 0, 1, 0, 0);
    InfoHandler.context.font = "15px myFont";
    InfoHandler.context.fillStyle = "white";
  }
}