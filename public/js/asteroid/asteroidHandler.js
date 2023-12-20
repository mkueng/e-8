class AsteroidHandler {

  #canvasMiddle;
  #canvasFace;
  #resourceHandler;
  #resizeImageWorker;
  #gameLoop;
  #ticker;
  #upcoming = Math.floor(Math.random()*30+30);
  #asteroidObjects = [];
  #asteroidObjectsPool;
  #asteroidObjectsInUse = {}



  #resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.asteroidField,
    filename : "asteroidField_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/asteroids/asteroidField_01/images/asteroidField_01.png"
  })

  constructor({gameLoop, canvasHandler, resourceHandler, resizeImageWorker}){
    this.#gameLoop = gameLoop;
    this.#canvasMiddle = canvasHandler.getCanvas("backgroundMiddle").canvas;
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

    //console.log("asteroids:", asteroidResourceObjects);

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
        velX : (-1)*(Math.random()*4+4),
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
          asteroid.velX = -1 * (Math.random() * 4 + 2);

          GameObjectsHandler.instance.addGameObject(asteroid);
          clearInterval(currentInterval);
          ticker++;
          if (ticker < amount) {
            createBatch(Math.floor(Math.random()*1000 + 1000))
          } else {
            this.createAsteroid(Math.floor(Math.random()*10000+10000),Math.floor(Math.random()*10)+5)
          }

        }
      }, interval);
    }
   createBatch(interval);
  }

  createAsteroidField = ()=>{

  }



}