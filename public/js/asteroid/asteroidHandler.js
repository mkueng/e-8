'use strict'
class AsteroidHandler {

  #resourceHandler;
  #resizeImageWorker;
  #asteroids = [];
  #canvases = {};

  constructor({
                canvasHandler,
                resourceHandler,
                resizeImageWorker
  }){
    this.#canvases['far'] = canvasHandler.getCanvas("backgroundFar").canvas;
    this.#canvases['middle'] = canvasHandler.getCanvas("backgroundMiddleFar").canvas;
    this.#canvases['front'] = canvasHandler.getCanvas("backgroundFace").canvas;

    this.#resourceHandler = resourceHandler;
    this.#resizeImageWorker = resizeImageWorker;
  }

  /**
   *
   * @returns {Promise<void>}
   */
  invoke = async ()=>{
    const asteroidResourceObjects = await this.#resourceHandler.fetchResourceBatch({
      category: "asteroid",
      fileName : "A",
      fileType : "png",
      filePath :  "/resources/asteroids/",
      lowerLimit : 1,
      upperLimit : 13
    })

    for (const asteroidResourceObject of asteroidResourceObjects) {
      const width = asteroidResourceObject.image.width;
      const height = asteroidResourceObject.image.height;
      const velX = -1 * (Math.random() * 6);
      let canvas = null;

      switch (true) {
        case (velX > -2) : {
          canvas = this. #canvases["far"]; break
        }
        case (velX >= -4 && velX < -2) : {
         canvas = this.#canvases['middle']; break
        }
        case (velX <= -4) : {
          canvas = this.#canvases['front']; break
        }
      }

      const asteroid = new GameObject({
        canvas: canvas,
        height: height,
        identification: "asteroid",
        image: asteroidResourceObject.image,
        posDX: 0,
        posDY: 0,
        posX: e8.global.screenWidth,
        posY: Math.random()*e8.global.screenHeight,
        subscriber: this,
        velX: 0,
        velY: 0,
        width: width,
        isActive: true,
      })
      this.#asteroids.push(asteroid);
    }
  }

  /**
   *
   * @param message
   * @param asteroid
   */
  subscriptionsUpdate = (message, asteroid) => {
    this.#asteroids.push(asteroid);
  }

  /**
   *
   * @param interval
   * @param amount
   */
  createAsteroid = (interval,amount) => {
    let ticker = 0;

    const createBatch = (interval) => {
      let currentInterval = setInterval(() => {
        if (this.#asteroids.length > 0) {
          const asteroid = this.#asteroids.splice(Math.floor(Math.random() * this.#asteroids.length), 1)[0];

          asteroid.posX = e8.global.screenWidth;
          asteroid.posY = Math.random() * (e8.global.screenHeight - 200);
          asteroid.velX = -1 * (Math.random() * 6 + 1);

          GameObjectsHandler.instance.addGameObject(asteroid);
          clearInterval(currentInterval);
          ticker++;
          if (ticker < amount) {
            createBatch(Math.floor(Math.random()*1000 + 1000))
          } else {
            this.createAsteroid(Math.floor(Math.random()*10000+10000),Math.floor(Math.random()*5)+5)
          }

        }
      }, interval);
    }
   createBatch(interval);
  }
}