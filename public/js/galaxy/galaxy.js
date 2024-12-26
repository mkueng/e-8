'use strict'
class Galaxy {

  #planetDistributionArray = [];
  #planetDistributionObject ={};
  #planetDistributionObjectKeys = [];
  #planetMap = {};
  #planetIndex = 0;
  #sunIndex = 0;
  #subscribers = [];
  #scale;
  #planetObjects = {};
  #sunObjects = {};
  #sunDistribution = [];
  #planetQueueBufferSize;
  #upcomingPlanetCoordinates
  #visiblePlanets = new Set();

  get distribution() {
    return this.#planetDistributionArray;
  }

  get planetIndex() {
    return this.#planetIndex;
  }

  constructor({scale}){
    this.#scale = scale;
  }

  init = async () =>{

    this.canvas = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.planets).canvas;
    this.planetWorker = new Worker("../../js/workers/galaxy/planetWorker.js");
    this.generatedPlanet = new GeneratedPlanet({canvas:this.canvas, planetWorker:this.planetWorker});

    let pseudoRandomClusteredDistribution = Util.pseudoRandomClusteredDistribution(
      {...e8.global.planetDistribution}
    )


    this.#planetDistributionArray =  pseudoRandomClusteredDistribution["clustersArray"];
    this.#planetDistributionObject = pseudoRandomClusteredDistribution["clustersObject"];
    this.#planetDistributionObjectKeys = Object.keys(this.#planetDistributionObject).map(Number);

    this.#sunDistribution = Util.pseudoRandomNumbersWithinRange({
      min: 1,
      max: 3700000000,
      amount: 300,
      seed: 72891782182
    })

    this.#planetMap = this.createPlanetMap(this.#planetDistributionArray);
    console.log("this.#planetMap:",  this.#planetMap);
    
    e8.global.gameLoop.subscribe(this);
  }

  /**
   *
   * @param subscriber
   */
  subscribe =(subscriber)=>{
    this.#subscribers.push(subscriber);
  }

  checkForPlanetInFOW = (coordinates) => {

  }

  /**
   *
   * @param data
   */
  heartBeat = async (data)=>{
    let playerShipSnapCoordinates = PlayerShip.coordinates;
    const filteredKeys = this.#planetDistributionObjectKeys.filter(key => key >= playerShipSnapCoordinates && key <= playerShipSnapCoordinates+1000000);
    const setObj = new Set(filteredKeys);
    for(const obj of setObj) {
      if (!this.#visiblePlanets.has(obj)) {
        this.#visiblePlanets.add(obj);
        await this.#createPlanet(obj);
      }
    }

    if (PlayerShip.coordinates > this.#sunDistribution[0]) {
      this.#createSun();
    }
  }

  #createSun = () =>{
    console.log("Creating SUN");
    const distributionEntry = this.#sunDistribution[this.#sunIndex];
    this.#sunDistribution.shift()
    let size = Math.min(Util.getLastNDigits(distributionEntry, 2) * 4, 150);
    if (size < 50) size = 50;
    console.log("sun distributionEntry:", distributionEntry);
    console.log("sun size: ", size);
    const sun = new Sun({
      width: size,
      height: size,
      posX:  e8.global.screenWidth + size,
      posY: e8.global.screenHeight / Util.getLastNDigits(distributionEntry, 1)+size,
    })

    GameObjectsHandler.instance.addGameObject(sun);
    this.#subscribers.forEach(subscriber => {
      try {
        subscriber.updateFromGalaxy({message:"sun created", payload:  this.#planetObjects});
      } catch(e) {
        console.error(e);
      }
    })
  }


  #createPlanet = async (coordinates) => {
    console.log("Creating PLANET");
    let planetData = this.#planetMap[coordinates];
    let planetObject = await this.generatedPlanet.create(planetData);
    planetObject.posX = e8.global.screenWidth;
    planetObject.previousPosX = e8.global.screenWidth;

    this.#planetObjects[planetObject.coordinates] = planetObject;
    GameObjectsHandler.instance.addGameObject(planetObject);

    this.#subscribers.forEach(subscriber => {
      try {
        subscriber.updateFromGalaxy({ message: "planetObjects", payload: this.#planetObjects });
      } catch (e) {
        console.error(e);
      }
    });
  }

  /**
   *
   * @param distribution
   * @returns {{}}
   */
  createPlanetMap = (distribution) =>{
    let planetMap = {};
    let radius;
    let planetSizeCounter = 1

    for (const coordinate of distribution) {
      if (planetSizeCounter > 6) {
        planetSizeCounter = 0;
      }
      if (planetSizeCounter >= 2 && planetSizeCounter <= 4) {
        radius = Math.floor(Util.createNumericHash(coordinate, 3) / 10);
      } else if (planetSizeCounter < 2 && planetSizeCounter > 1) {
        radius = Math.floor(Util.createNumericHash(coordinate, 3) / 4.6);
      } else if (planetSizeCounter > 4 && planetSizeCounter < 6) {
        radius = Math.floor(Util.createNumericHash(coordinate, 3) / 5);
      } else {
        radius = Math.floor(Util.createNumericHash(coordinate, 3) / 2);
      }

      if (radius < 30) {
        radius = 30;
      }
      const oneDigit = Util.createNumericHash(coordinate,1);
      const twoDigits = Util.createNumericHash(coordinate,2);
      const threeDigits = Util.getLastNDigits(coordinate,3);

      let r = parseInt(threeDigits % 140);
      let g = parseInt(threeDigits % 170);
      let b = parseInt(threeDigits % 198);
      let q = parseInt(threeDigits % 98);

      let stripeFactor = twoDigits / Util.createPseudoRandomNumber({seed:32783827,length:2})+0.5
      if (oneDigit > 6 ) {
        stripeFactor = twoDigits*Util.createPseudoRandomNumber({seed:coordinate,length:3}) % 522 / 5;
      }

      planetMap[coordinate]= {
        type : "generated",
        coordinates: coordinate,
        radius: radius,
        noiseRange : twoDigits / 1.2 ,
        octavesRange : oneDigit,
        lacunarityRange : 0.25,
        persistenceOffset : oneDigit / 5,
        baseFrequencyOffset : threeDigits *4,
        stripeFactor : stripeFactor,
        r: r,
        g: g,
        b: b,
        q: q
      }
      planetSizeCounter++;
    }
    return planetMap;
  }
}