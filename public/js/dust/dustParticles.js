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

  update = (dt) => {
    for (const particle of this.particles) {
      if (particle.posX < 0 ) {
        particle.posX = e8.global.screenWidth;
      } else {
        if (PlayerShip.velX) {
          particle.posX = particle.posX + particle.velX*dt+(PlayerShip.velX*particle.posZ);

        }

        if (PlayerShip.velY) {
            particle.posY = particle.posY + PlayerShip.velY*particle.posZ;


        }
        //console.log(PlayerShip.velY);
        //particle.posY = particle.posY + PlayerShip.velY;
       // console.log(particle.posY);
      }
    }
  }
}