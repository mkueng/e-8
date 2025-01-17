'use strict'
class DustHandler extends Handler {

  #canvas;
  #context;
  #amountOfParticles = 50;
  #dustParticles = [];

  constructor(){
    super();
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
      let velocity = -1 * (Math.random()*20+0.5);

      particles.push({
        color: this.#getRandomGrayscaleColor(velocity),
        posX: Math.random()*e8.global.screenWidth,
        posY: Math.floor(Math.random()*e8.global.screenHeight),
        posZ: 0.03 * velocity,
        velX: 0,
        width: Math.floor(Math.random()*3+2),
        height: Math.floor(Math.random()*2+1)
      })
    }
    return particles;
  }

  #getRandomGrayscaleColor(velocity) {
    const grayscaleValue = Math.floor(Math.random() * (velocity*-1)*6+110);
    return `rgb(${grayscaleValue}, ${grayscaleValue}, ${grayscaleValue})`;
  }
}