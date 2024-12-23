'use strict'

class AsteroidHandler {
  #asteroids = [];
  #canvases = {};

  constructor(){}

  /**
   *
   * @returns {Promise<void>}
   */
  init = async ()=>{

    this.#canvases['far'] = e8.global.canvasHandler.getCanvas("backgroundFar").canvas;
    this.#canvases['middle'] = e8.global.canvasHandler.getCanvas("backgroundMiddle").canvas;
    this.#canvases['front'] = e8.global.canvasHandler.getCanvas("backgroundFace").canvas;

    const asteroidResourceObjects = await e8.global.resourceHandler.fetchResourceBatch({
      category: "asteroid",
      fileName : "A",
      fileType : "png",
      filePath :  "/resources/asteroids/",
      lowerLimit : 0,
      upperLimit : 14
    })

    for (const asteroidResourceObject of asteroidResourceObjects) {
      const width = asteroidResourceObject.image.width;
      const height = asteroidResourceObject.image.height;

      const asteroid = new Asteroid({
        canvas: null,
        height: height,
        image: asteroidResourceObject.image,
        posDX: 0,
        posDY: 0,
        posX: null,
        posY: null,
        posZ: null,
        subscriber: this,
        velX: 0,
        velY: 0,
        width: width,
        rotation : 5,
      })
      this.#asteroids.push(asteroid);
    }
  }

  /**
   *
   * @param message
   * @param asteroid
   */
  updateFromGameObjectsHandler = (message, asteroid) => {
    this.#asteroids.push(asteroid);
  }

  /**
   *
   * @param interval
   * @param amount
   */
  invokeAsteroids = (interval, amount) => {
    let ticker = 0;

    const createBatch = (interval) => {
      let currentInterval = setInterval(() => {
        if (this.#asteroids.length > 0) {
          const asteroid = this.#asteroids.splice(Math.floor(Math.random() * this.#asteroids.length), 1)[0];
          asteroid.posX = asteroid.previousPosX = e8.global.screenWidth;
          asteroid.posY = asteroid.previousPosY = Math.random() * (e8.global.screenHeight - 200);
          asteroid.posZ = Math.random()*6;
          asteroid.canvas = asteroid.posZ > 3 ? this.#canvases['far']
            : asteroid.posZ > 1 ? this.#canvases['middle']
              : this.#canvases['front'];
          asteroid.context = asteroid.canvas.getContext('2d');
          asteroid.isActive = true;
          GameObjectsHandler.instance.addGameObject(asteroid);
          clearInterval(currentInterval);
          ticker++;
          if (ticker < amount) {
            createBatch(Math.floor(Math.random()*1000))
          } else {
            this.invokeAsteroids(Math.floor(Math.random()*5000+5000),Math.floor(Math.random()*10)+10)
          }

        }
      }, interval);
    }
   createBatch(interval);
  }
}