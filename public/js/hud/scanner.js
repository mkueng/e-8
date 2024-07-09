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
    this.galaxy.subscribe(this);
    this.pis = 10; // planet icon size
    this.pisDouble = this.pis*2;

    this.piCanvas = new OffscreenCanvas( this.pis*2,  this.pis*2);
    this.piCtx = this.piCanvas.getContext('2d');
    this.piCtx.fillStyle = e8.global.colors.lightVanilla;
    this.piCtx.beginPath();
    this.piCtx.arc( this.pis,  this.pis,  this.pis, 0, 2 * Math.PI);
    this.piCtx.fill();

    this.arcCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
    this.arcContext = this.arcCanvas.getContext('2d');
    this.arcContext.fillStyle = e8.global.colors.lightVanilla
    this.#preFactor = 0.6 / this.canvas.width; // 0.6 is the height of the parabola
    this.#zeroPoint = this.canvas.width / 2;

    for (let i= - this.canvas.width / 2; i < this.canvas.width / 2; i+=1){
      let x = i;
      let y = this.canvas.height - (this.#preFactor * Math.pow(x, 2))-10;
      this.arcContext.fillRect(this.#zeroPoint + x, y-4, 2, 2);
      this.arcContext.fillRect(this.#zeroPoint + x, y-14, 4, 4);
    }
    this.context.globalAlpha = 0.7;
    this.context.strokeStyle = e8.global.colors.lightVanilla
    this.context.fillStyle = e8.global.colors.darkCyan;
    GameObjectsHandler.instance.addGameObject(this);
  }

  updateFromGalaxy =(data) =>{

  }

  update = ()=>{
  }

  render() {
    const {context: ctx, canvas} = this;
    let x = -1 *PlayerShip.coordinates/100;
    let y = canvas.height - this.#preFactor * Math.pow(x, 2);
    ctx.drawImage(this.arcCanvas, 0, 0);
    ctx.drawImage(this.piCanvas, this.#zeroPoint +  x, y - this.pisDouble);
  }
}