'use strict'
class Galaxy {

  #planetDistributionArray = [];
  #planetDistributionObject ={};
  #clonedPlanetDistribution = [];
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
      {...e8.global.planetDistribution})


    this.#planetDistributionArray =  pseudoRandomClusteredDistribution["clustersArray"];
    this.#planetDistributionObject = pseudoRandomClusteredDistribution["clustersObject"];
    this.#planetDistributionObjectKeys = Object.keys(this.#planetDistributionObject).map(Number);

    this.#sunDistribution = Util.pseudoRandomNumbersWithinRange({
      min: 1,
      max: 1000000000,
      amount: 500,
      seed: 1289821937
    })

    this.#planetMap = this.createPlanetMap(this.#planetDistributionArray);
    //console.log("this.#planetMap:",  this.#planetMap);
    
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
  updateFromGameLoop = async (data)=>{
    //console.log("this.#planetObjects:", this.#planetObjects);
    //console.log("this.#clonedPlanetDistribution", this.#clonedPlanetDistribution[this.#planetIndex]);

    let playerShipSnapCoordinates = PlayerShip.coordinates - (PlayerShip.coordinates % 10000);
    const filteredKeys = this.#planetDistributionObjectKeys.filter(key => key >= playerShipSnapCoordinates-1000000 && key <= playerShipSnapCoordinates+1000000);
    const setObj = new Set(filteredKeys);
    for(const obj of setObj) {
      if (!this.#visiblePlanets.has(obj)) {
        this.#visiblePlanets.add(obj);
        await this.#createPlanet(obj);
      }
    }

    if (PlayerShip.coordinates > this.#sunDistribution[0]) {
      //this.#createSun();
    }


/*
    if (PlayerShip.coordinates > this.#upcomingPlanetCoordinates) {
      console.log("SHOWING PLANET");
      let positionZFixed = this.#planetObjects[this.#clonedPlanetDistribution[this.#planetIndex]].posZfixed;
      console.log("positionZFixed:", positionZFixed);
      console.log("PlayerShip.coordinates:", PlayerShip.coordinates);
      console.log("this.#upcomingPlanetCoordinates:", this.#upcomingPlanetCoordinates);
      let relativePlanetPositionX = e8.global.screenWidth - ((PlayerShip.coordinates-this.#upcomingPlanetCoordinates) * positionZFixed);
      console.log("relativePlanetPositionX:", relativePlanetPositionX);
      try {
        this.#planetObjects[this.#clonedPlanetDistribution[this.#planetIndex]].posX = relativePlanetPositionX;
        GameObjectsHandler.instance.addGameObject(this.#planetObjects[this.#clonedPlanetDistribution[this.#planetIndex]]);
      } catch(e){console.error(e)}

      //this.#clonedPlanetDistribution.shift();
      this.#planetIndex++;
      this.#upcomingPlanetCoordinates = this.#clonedPlanetDistribution[this.#planetIndex];
      this.#createPlanet().then(() => {
        console.log("planet created")
      });


    } */
  }

  #createSun = () =>{
    console.log("Creating SUN");
    const distributionEntry = this.#sunDistribution[this.#sunIndex];
    this.#sunDistribution.shift()
    let size = Math.max(Util.getLastNDigits(distributionEntry, 2) * 3, 200);
    console.log("sun distributionEntry:", distributionEntry);
    console.log("sun size: ", size);
    const sun = new Sun({
      width: size,
      height: size,
      posX:  e8.global.screenWidth + size,
      posY: e8.global.screenHeight / Util.getLastNDigits(distributionEntry, 1)
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
    let planetData = this.#planetMap[coordinates];
    let planetObject = await this.generatedPlanet.create(planetData);
    let relativePlanetPositionX = e8.global.screenWidth// - ((PlayerShip.coordinates-coordinates) * planetObject.posZFixed);
    planetObject.posX = relativePlanetPositionX;

    //let positionZFixed = this.#planetObjects[this.#clonedPlanetDistribution[this.#planetIndex]].posZfixed;
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

    for (const coordinate of distribution){
      if (planetSizeCounter > 6) {
        planetSizeCounter = 1;
      }
      if (planetSizeCounter >= 2 && planetSizeCounter <= 5) {
        radius = Math.floor(Util.createNumericHash(coordinate,3) / 4);
      } else if (planetSizeCounter < 2) {
        radius = Math.floor(Util.createNumericHash(coordinate,3) / 0.7);
      } else {
        radius = Math.floor(Util.createNumericHash(coordinate,3) / 2);
      }

      const oneDigit = Util.createNumericHash(coordinate,1);
      const twoDigits = Util.createNumericHash(coordinate,2);
      const threeDigits = Util.getLastNDigits(coordinate,3);

      let r = parseInt(threeDigits % 120);
      let g = parseInt(threeDigits % 142);
      let b = parseInt(threeDigits % 109);
      let q = parseInt(threeDigits % 100);


      //console.log("rgbq:", r,g,b,q);
       // let stripeFactor = lastDigit / 7+1;

      let stripeFactor = twoDigits / Util.createPseudoRandomNumber({seed:32783827,length:2})+0.5
      if (oneDigit > 8 ) {
        stripeFactor = twoDigits*Util.createPseudoRandomNumber({seed:32783827,length:3}) % 522 / 5;
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
      //console.log("rgbq:", r,g,b,q);
      planetSizeCounter++;
    }
    return planetMap;
  }
}