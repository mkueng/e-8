class Hud extends GameObject {


  constructor({canvas}){

    super({
      canvas
    });
  }

  initStaticHud = ()=>{
    this.offscreenCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
    this.offscreenContext = this.offscreenCanvas.getContext('2d');
    this.offscreenContext.globalAlpha = 0.2;
    this.offscreenContext.lineWidth = 8;
    this.offscreenContext.fillStyle = e8.global.colors.lightVanilla;
    this.offscreenContext.strokeStyle = e8.global.colors.lightVanilla;
    this.offscreenContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.offscreenContext.beginPath();
    this.offscreenContext.moveTo(0,0);
    this.offscreenContext.lineTo(this.canvas.width, 0);
    this.offscreenContext.stroke();
  }
}