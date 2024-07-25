class Scanner extends GameObject {

  #preFactor = null;
  #zeroPoint = null;
  #ticker = -1;
  #planets = {};

  constructor({galaxy}){

  super({
      canvas: e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.planetScanner).canvas,
      isContextPreventedOfBeingCleared: true
    });
    this.galaxy = galaxy;
  }

  init = async()=>{
    this.galaxy.subscribe(this);
    this.pis = 10; // planet icon size

    // create planet icon
    this.piCanvas = new OffscreenCanvas( this.pis*2,  this.pis*2);
    this.piCtx = this.piCanvas.getContext('2d');
    this.piCtx.fillStyle = e8.global.colors.lightVanilla;
    this.piCtx.beginPath();
    this.piCtx.arc( this.pis,  this.pis,  this.pis, 0, 2 * Math.PI);
    this.piCtx.fill();

    // create scanner arc
    this.arcCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
    this.arcContext = this.arcCanvas.getContext('2d');
    this.arcContext.fillStyle = e8.global.colors.lightVanilla
    this.arcContext.globalAlpha = 0.7;
    this.#preFactor = 0.4 / this.canvas.width; // 0.6 is the height of the parabola
    this.#zeroPoint = this.canvas.width / 2;

    for (let i= - this.canvas.width / 2; i < this.canvas.width / 2-10; i+=1){
      let x = parseInt(i.toFixed(2));
      let y = parseInt(this.canvas.height - this.#preFactor * Math.pow(x.toFixed(0), 2)).toFixed(2);

      this.arcContext.fillRect(this.#zeroPoint + x+5, y-24, 2, 2);
      this.arcContext.fillRect(this.#zeroPoint + x+5, y-34, 5, 5);
    }
    this.context.globalAlpha = 0.7;
    this.context.strokeStyle = e8.global.colors.lightVanilla
    this.context.fillStyle = e8.global.colors.darkCyan;

    this.#preFactor = 0.405 / this.canvas.width;
    GameObjectsHandler.instance.addGameObject(this);
  }

  updateFromGalaxy =(data) =>{
    this.#planets = data.payload;
  }

  update = ()=>{
    this.#ticker++;
  }

  render() {

    if (this.#ticker % 3 === 0) {
      const {context: ctx, canvas} = this;
      const planets = Object.values(this.#planets); // Cache this if planets don't change often
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this.arcCanvas, 0, 0);
      planets.forEach(planet => {
        let x = (planet.coordinates-PlayerShip.coordinates) /1000;
        let y = canvas.height - this.#preFactor * Math.pow(x, 2);
        ctx.drawImage(this.piCanvas, this.#zeroPoint+x, y-33);
      });
    }
  }
}