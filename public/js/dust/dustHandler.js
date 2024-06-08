'use strict'

class DustHandler {

  #canvas;
  #context;
  #amountOfParticles = 60;
  #dustParticles = [];

  constructor(){
    this.#canvas =  e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.dust).canvas;
    this.#context = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.dust).context;
  }

  init = async ()=>{
    let particles = this.#createParticles({amount: this.#amountOfParticles});

    this.#dustParticles = new DustParticles({
      particles: particles,
      canvas: this.#canvas,
      context: this.#context
    })
  }

  invokeDust = () =>{
    GameObjectsHandler.instance.addGameObject(this.#dustParticles);
  }

  /**
   *
   * @param amount
   */
  #createParticles = ({amount}) => {

    let particles = [];

    for (let i=0; i < amount; i++) {
      let velocity = -1 * (Math.random()*5+0.5);
      particles.push({
        color: this.#getRandomGrayscaleColor(),
        posX: Math.random()*e8.global.screenWidth,
        posY: Math.floor(Math.random()*e8.global.screenHeight),
        posZ : 0.05* velocity,
        velX: velocity,
        width: Math.floor(Math.random()*5+1),
        height: Math.floor(Math.random()*3+1)
      })
    }
    console.log(particles);
    return particles;

  }

  #getRandomGrayscaleColor() {
    // Generate a random value between 0 and 255 for the grayscale component
    const grayscaleValue = Math.floor(Math.random() * 120+30);

    // Create an RGB color with same values for red, green, and blue
    return `rgb(${grayscaleValue}, ${grayscaleValue}, ${grayscaleValue})`;
  }
}