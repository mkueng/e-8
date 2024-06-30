class Scanner extends GameObject {
  constructor({galaxy}){
  super({
      canvas: e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.hudDynamicMiddle).canvas
    });
    this.galaxy = galaxy;
  }

  init = async()=>{
    this.offscreenCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
    this.offscreenContext = this.offscreenCanvas.getContext('2d');
    this.scannerImage = document.querySelector("#hud");
    this.context.strokeStyle = e8.global.colors.lightVanilla;
    GameObjectsHandler.instance.addGameObject(this);
  }

  update = ()=>{
  }

  render() {
   const {context: ctx, canvas} = this;
ctx.drawImage(this.scannerImage, 0, 0, canvas.width, canvas.height);
let zeroPint = canvas.width / 2;
    let a = 0.6 / canvas.width
    console.log(a);
for (let i=-canvas.width/2; i <canvas.width/2 ; i=i+10){
 // Adjust this value to change the curvature of the parabola
  let x = i;
  let y =  canvas.height - a* Math.pow(x, 2); // y = ax^2

  ctx.strokeRect(zeroPint + x, y-10, 10, 10);
}

  }
}