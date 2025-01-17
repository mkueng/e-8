'use strict'

/**
 * @name AsteroidHandler
 */
class AsteroidHandler extends Handler{
  #asteroids = [];
  #canvases = {};
  #contexts = {};
  #upcoming = 10000;

  constructor(){
    super ()
  }

  /**
   * @name init
   * @returns {Promise<void>}
   */
  init = async ()=>{

    this.#canvases['far'] = e8.global.canvasHandler.getCanvas("backgroundFar").canvas;
    this.#canvases['middle'] = e8.global.canvasHandler.getCanvas("backgroundMiddle").canvas;
    this.#canvases['front'] = e8.global.canvasHandler.getCanvas("backgroundFace").canvas;

    this.#contexts['far'] = this.#canvases['far'].getContext('2d');
    this.#contexts['middle'] = this.#canvases['middle'].getContext('2d');
    this.#contexts['front'] = this.#canvases['front'].getContext('2d');

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

      this.heartBeat.timeout = 1000;
      this.heartBeat.callback = this.heartBeatCallback
    }
  }

  /**
   * @name heartBeat
   */
  heartBeatCallback = () => {
    if (PlayerShip.coordinates > this.#upcoming) {
      this.#upcoming = PlayerShip.coordinates + Math.floor(Math.random() * 50000 + 10000);
      this.invokeAsteroids(Math.floor(Math.random() * 10 + 10));
    }
  }

  /**
   * @name updateFromGameObjectsHandler
   * @param message
   * @param asteroid
   */
  updateFromGameObjectsHandler = (message, asteroid) => {
    this.#asteroids.push(asteroid);
  }

  /**
   * @name invokeAsteroids
   * @param amount
   */
  invokeAsteroids = (amount) => {
    let counter = 0;
    for (let i = 0; i < amount && this.#asteroids.length > 0; i++) {
      const asteroidIndex = Math.floor(Math.random() * this.#asteroids.length);
      const asteroid = this.#asteroids.splice(asteroidIndex, 1)[0];
      asteroid.posX = asteroid.previousPosX = e8.global.screenWidth+Math.floor(Math.random()*2000);
      asteroid.posY = asteroid.previousPosY = Math.random() * (e8.global.screenHeight - asteroid.width);
      asteroid.posZ = Math.random() * 5+1;

      const canvasLayer = asteroid.posZ > 3 ? 'far'
        : asteroid.posZ > 1 ? 'middle'
          : 'front';

      asteroid.canvas = this.#canvases[canvasLayer];
      asteroid.context = this.#contexts[canvasLayer];
      asteroid.isActive = true;
      GameObjectsHandler.instance.addGameObject(asteroid);
    }
  }
}