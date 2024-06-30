class Scanner extends GameObject {

  #preFactor = null;
  #zeroPoint = null;


  constructor({galaxy}){

  super({
      canvas: e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.hudDynamicMiddle).canvas
    });
    this.galaxy = galaxy;
  }

  init = async()=>{
    this.offscreenCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
    this.offscreenContext = this.offscreenCanvas.getContext('2d');
    this.offscreenContext.fillStyle = e8.global.colors.vanilla
    this.#preFactor = 0.6 / this.canvas.width;

    this.#zeroPoint = this.canvas.width / 2;
    for (let i= - this.canvas.width / 2; i < this.canvas.width / 2; i+=1){
      let x = i;
      let y = this.canvas.height - this.#preFactor * Math.pow(x, 2);
      this.offscreenContext.fillRect(this.#zeroPoint + x, y-4,   2, 2);
      this.offscreenContext.fillRect(this.#zeroPoint + x, y-14,   4, 4);
    }
    //this.scannerImage = document.querySelector("#hud");
    this.context.globalAlpha = 0.9;
    this.context.strokeStyle = e8.global.colors.lightVanilla
    this.context.fillStyle = e8.global.colors.auburn;
    GameObjectsHandler.instance.addGameObject(this);
  }

  update = ()=>{
  }

  render() {
   const {context: ctx, canvas} = this;
    ctx.drawImage(this.offscreenCanvas, 0, 0);
    let x = -1 *PlayerShip.coordinates/1000;
    let y = canvas.height - this.#preFactor * Math.pow(x, 2);
    ctx.fillRect(this.#zeroPoint + x, y-10, 10, 10);
    /*

    let zeroPint = canvas.width / 2;

for (let i=-canvas.width/2; i <canvas.width/2 ; i=i+10){
 // Adjust this value to change the curvature of the parabola
  let x = i;
  let y =  canvas.height - a* Math.pow(x, 2); // y = ax^2

  ctx.strokeRect(zeroPint + x, y-10, 10, 10);
}*/

  }
}