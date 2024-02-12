'use strict'
class ParticleGenerator {

  constructor(){
  }

  /**
   *
   * @param imageData
   * @param stride
   * @param particleWidthRange
   * @param particleHeightRange
   * @param velocityRangeX
   * @param velocityRangeY
   * @param colorRange
   * @param colorOffset
   * @returns {*[]}
   */
  createParticles = ({imageData, stride, particleWidthRange, particleHeightRange, velocityRangeX, velocityRangeY, colorRange, colorOffset }) => {
    let particles = [];


    //0000 0000 color
    //0000 opacity
    //0000 0000 0000 0000 x
    //0000 0000 0000 0000 y
    //0000 width
    //0000 height
    //0000 velX
    //0000 velY

    const convertTo8BitBinary = (valueDecimal= 0) => {
      return valueDecimal.toString(2).padStart(8, '0');
    }


    for (let posY = 0, y2 = imageData.height; posY < y2; posY+=stride) {
      for (let posX = 0, x2 = imageData.width; posX < x2; posX += stride) {
        if (imageData.data[(posX * 4 + posY * 4 * imageData.data.width)] !== 0) {
          let opacity = Math.floor(((Math.random() * 0.5 + 0.5).toFixed(2))*100);
          let color = Math.floor(Math.random() * colorRange + colorOffset);
          let width = Math.floor(Math.random()*particleWidthRange+1);
          let height = Math.floor(Math.random()*particleHeightRange+1);
          let velX =  Math.floor(velocityRangeX * ((Math.random() * 2) - 1));
          let velY = Math.floor(velocityRangeY * ((Math.random() * 2) - 1));
          particles.push(opacity,color,width, height, velX, velY, posX, posY)
        }
      }
    }


    return particles;
  }
}