class InfoHandler {

  constructor(canvasHandler){
    this.context = canvasHandler.getCanvas("performanceInfo").context;
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.font = "15px myFont";
    this.context.fillStyle = "white";
  }

  render = function(renderTime, fps, coordinate){
    this.context.clearRect(0,window.global.screenHeight-100,window.global.screenWidth, 100);
    this.context.fillText("render time: "+renderTime+" ms", window.global.centerHorizontal-400, window.global.screenHeight-20);
    this.context.fillText("/ fps: "+fps, window.global.centerHorizontal-100, window.global.screenHeight-20);
    this.context.fillText("/ coordinate: "+coordinate, window.global.centerHorizontal+100, window.global.screenHeight-20);
  }
}