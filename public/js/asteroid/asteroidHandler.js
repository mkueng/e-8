class AsteroidHandler {

  #canvasMiddle;
  #canvasFace;
  #resourceHandler;
  #resizeImageWorker;
  #gameLoop;
  #asteroidObjects = [];



  constructor({gameLoop, canvasHandler, resourceHandler, resizeImageWorker}){
    this.#gameLoop = gameLoop;
    this.#canvasMiddle = canvasHandler.getCanvas("backgroundMiddleFar").canvas;
    this.#canvasFace = canvasHandler.getCanvas("backgroundFace").canvas;
    this.#resourceHandler = resourceHandler;
    this.#resizeImageWorker = resizeImageWorker;
  }


  invoke = async ()=>{
    const asteroidResourceObjects = await this.#resourceHandler.fetchResourceBatch({
      category: "asteroid",
      filename : "A",
      fileType : "png",
      filePath :  "/resources/asteroids/",
      lowerLimit : 1,
      upperLimit : 13
    })


    for (const asteroidResourceObject of asteroidResourceObjects) {
      const asteroidObject = new GameObject({
        identification : "asteroid",
        image : asteroidResourceObject.image,
        width : asteroidResourceObject.image.width,
        height : asteroidResourceObject.image.height,
        posX : window.global.screenWidth,
        posY : Math.random()*window.global.screenHeight,
        posDX : 0,
        posDY : 0,
        velX : 0,
        velY : 0,
        canvas : this.#canvasFace,
        subscriber : this
      })


      this.#asteroidObjects.push(asteroidObject);
    }

    console.log("asteroidObjects:", this.#asteroidObjects);
  }

  subscriptionsUpdate = (message, asteroid)=>{
    this.#asteroidObjects.push(asteroid);
  }

  createAsteroid = (interval,amount) => {
    let ticker =0;

    const createBatch = (interval)=>{
      let currentInterval = setInterval(() => {
        if (this.#asteroidObjects.length > 0) {
          const asteroid = this.#asteroidObjects.splice(Math.floor(Math.random() * this.#asteroidObjects.length), 1)[0];

          //console.log("asteroidObjects:", this.#asteroidObjects);

          asteroid.posX = window.global.screenWidth;
          asteroid.posY = Math.random() * (window.global.screenHeight - 200);
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

  createAsteroidField = ()=>{

  }



}