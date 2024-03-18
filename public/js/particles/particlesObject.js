class ParticlesObject {

  constructor({particles, context, canvas}){
    this.id = crypto.randomUUID();
    this.posX = null;
    this.posY = null;
    this.velX = null;
    this.velY = null;
    this.particles = particles;
    this.context = context;
    this.context.shadowBlur = 2;
    this.context.shadowColor = "green";
    this.canvas = canvas;
  }

  update = () => {
  }

  render = () => {

    // posY = this.particles[i];
    // posX = this.particles[i-1];
    // velY = this.particles[i-2];
    // velX = this.particles[i-3];
    // height = this.particles[i-4];
    // width = this.particles[i-5];
    // color =  this.particles[i-6];
    // opacity =  this.particles[i-7];
    if (this.particles.length > 0) {
      for (let i = this.particles.length - 1; i >= 0; i -= 8) {
        this.particles[i - 7] -= 1.5;
        if (this.particles[i - 7] / 100 >= 0) {
          this.particles[i - 1] += this.particles[i - 3] + this.velX;
          this.particles[i] += this.particles[i - 2] + this.velY;
          this.context.fillStyle = `rgb(
            ${this.particles[i - 6]}, 
            ${this.particles[i - 6]}, 
            ${this.particles[i - 6]},
            ${this.particles[i - 7] / 100}
          )`;
          this.context.fillRect(
            this.posX + this.particles[i-1],
            this.posY + this.particles[i],
            this.particles[i-5],
            this.particles[i-4]);
        } else {
          this.particles.splice(i-7, 8);
        }
      }
    } else {
      this.particles = null;
      GameObjectsHandler.instance.addGameObjectToRemoveQueue(this.id);
    }
  }
}


