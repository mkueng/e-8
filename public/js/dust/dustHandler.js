class DustHandler {

  #canvas;
  #context;
  #particles = [];

  /**
   *
   * @param canvasHandler
   * @param resourceHandler
   */
  constructor({canvasHandler, resourceHandler}){
    this.canvasHandler = canvasHandler;
    this.resourceHandler = resourceHandler;
    this.#canvas =  this.canvasHandler.getCanvas(CanvasHandler.canvasTypes.dust).canvas;
    this.#context = this.canvasHandler.getCanvas(CanvasHandler.canvasTypes.dust).context;
    this.#createParticles({amount:150});
    this.dustParticles = new DustParticles({
      particles: this.#particles,
      canvas: this.#canvas,
      context: this.#context
    })
    GameObjectsHandler.instance.addGameObject(this.dustParticles);
  }



  /**
   *
   * @param amount
   */
  #createParticles = ({amount}) => {

    for (let i=0; i < amount; i++) {
      this.#particles.push({
        color: this.#getRandomGrayscaleColor(),
        posX: Math.random()*e8.global.screenWidth,
        posY: Math.floor(Math.random()*e8.global.screenHeight),
        velX: -1 * (Math.random()*3+1),
        width: Math.floor(Math.random()*5+1),
        height: Math.floor(Math.random()*3+1)
      })
    }
  }

  #getRandomGrayscaleColor() {
    // Generate a random value between 0 and 255 for the grayscale component
    const grayscaleValue = Math.floor(Math.random() * 100+30);

    // Create an RGB color with equal values for red, green, and blue
    return  `rgb(${grayscaleValue}, ${grayscaleValue}, ${grayscaleValue})`;
  }
}