'use strict'

class DustParticles  {

  constructor({particles, canvas, context}) {
    this.id = crypto.randomUUID();
    this.particles = particles;
    this.context = context;
    this.canvas = canvas;
  }


  render = () => {
    for (const particle of this.particles) {
      this.context.fillStyle = particle.color;
      this.context.fillRect(particle.posX,particle.posY,particle.width,particle.height);
    }
  }

  update = (deltaTime) => {

    for (const particle of this.particles) {
      if (particle.posX < 0 ) {
        particle.posX = e8.global.screenWidth;
      } else {
        particle.posX = particle.posX + particle.velX*deltaTime;
      }
    }
  }
}