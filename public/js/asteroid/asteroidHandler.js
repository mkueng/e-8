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
      const size = width * height;
      let velX = -1*size/30000;
      if (velX < -4) {
        velX = -4;
      }
      let canvas= null;

      switch (true) {
        case (velX > -1.5) : {
          canvas = this. #canvases["far"]; break
        }
        case (velX >= -2.5 && velX < -1.5) : {
         canvas = this.#canvases['middle']; break
        }
        case (velX <= -2.5) : {
          canvas = this.#canvases['front']; break
        }
      }

      let zPosition =  velX/6;
     // if (zPosition > 1) zPosition = 1;

      const asteroid = new GameObject({
        canvas: canvas,
        height: height,
        identification: "asteroid",
        image: asteroidResourceObject.image,
        posDX: 0,
        posDY: 0,
        posX: e8.global.screenWidth,
        posY: Math.random()*e8.global.screenHeight,
        posZ: zPosition,
        subscriber: this,
        velX: 0,
        velY: 0,
        width: width,
        rotation : 5,
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

          asteroid.posX = e8.global.screenWidth;
          asteroid.posY = Math.random() * (e8.global.screenHeight - 200);
          asteroid.posZ = -1*Math.random()-0.05;
          //console.log("asteroid.posZ:", asteroid.posZ);

          GameObjectsHandler.instance.addGameObject(asteroid);
          clearInterval(currentInterval);
          ticker++;
          if (ticker < amount) {
            createBatch(Math.floor(Math.random()*1000))
          } else {
            this.invokeAsteroids(Math.floor(Math.random()*10000+10000),Math.floor(Math.random()*10)+10)
          }

        }
      }, interval);
    }
   createBatch(interval);
  }
}