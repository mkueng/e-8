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
    this.#planetQueueBufferSize = 5;
    this.#planetIndex = 0;
    this.#sunIndex = 0;

    let pseudoRandomClusteredDistribution = Util.pseudoRandomClusteredDistribution(
      {...e8.global.planetDistribution}
    );


    this.#planetDistributionArray =  pseudoRandomClusteredDistribution["clustersArray"];
    this.#planetDistributionObject = pseudoRandomClusteredDistribution["clustersObject"];

    this.#planetDistributionObjectKeys = Object.keys(this.#planetDistributionObject).map(Number);
    console.log("this.#planetDistributionObjectKeys:", this.#planetDistributionObjectKeys);
    console.log(" this.#planetDistributionArray:", this.#planetDistributionArray);

    //this.#clonedPlanetDistribution = [...this.#planetDistribution];
    //this.#upcomingPlanetCoordinates = this.#clonedPlanetDistribution[this.#planetIndex];
    this.#sunDistribution = Util.pseudoRandomNumbersWithinRange({
      min: 1,
      max: 1000000000,
      amount: 500,
      seed: 1289821937
    })

    /*
    this.#sunDistribution =  Util.pseudoRandomClusteredDistribution({
      seed: 8998492304982,
      amountOfClusters: 1000,
      range: 100000000,
      rangeWithinCluster: 300000
    })*/
    console.log("this.#planetDistribution:", this.#planetDistributionArray);
    console.log("this.#sunDistribution:", this.#sunDistribution);

    this.#planetMap = this.createPlanetMap(this.#planetDistributionArray);
    console.log("this.#planetMap:",  this.#planetMap);

    this.upcomingPlanetCoordinates = this.#planetDistributionArray[this.#planetIndex];
    this.upcomingSunCoordinates = this.#sunDistribution[this.#sunIndex];

    e8.global.gameLoop.subscribe(this);
/*
    for (let i = 0; i < this.#planetQueueBufferSize; i++) {
      await this.#createPlanet();
    }*/
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
    console.log("obj:", coordinates);
    let planetData = this.#planetMap[coordinates];
    console.log("planetData:", planetData);
    let planetObject = await this.generatedPlanet.create(planetData);
    console.log("planetObject", planetObject);
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
    let ticker = Util.getFirstNDigits(distribution[0], 1);
    let planetSizeCounter = 1
    for (const value of distribution){
      if (planetSizeCounter >= 5) {
        planetSizeCounter = 1;
      }

      // preRenderedPlanet
      /*
      if ((ticker % 40) === 0) {
        let planetImageNr = Util.getLastNDigits(value, 2) % 15;


        let imageResourceObject = new ResourceObject({
          name : "planet_"+planetImageNr,
          fileName : "planet_"+planetImageNr,
          fileType : ResourceObject.TYPES.png,
          resourcePath : "/resources/planets/"

        })
        planetMap[value.toFixed(0)] = {
          type: "preRendered",
          imageResourceObject: imageResourceObject
        }

        ticker = Util.getLastNDigits(value, 1);

        // generated Planet
      } else {
      */
      {
        const firstDigit = Util.createNumericHash(value,1);
        const first2Digits = Util.createNumericHash(value,2);
        const first3Digits = Util.createNumericHash(value,3);

        let r = parseInt(first3Digits % 120);
        let g = parseInt(first3Digits % 142);
        let b = parseInt(first3Digits % 109);
        let q = parseInt(first3Digits % 10);

       // let stripeFactor = lastDigit / 7+1;

        let stripeFactor = firstDigit;
        if (firstDigit > 4 ) stripeFactor = value % 20;

        let radius = Util.createNumericHash(value,3);
        console.log("radius:", radius);


        planetMap[value.toFixed(0)]= {
          type : "generated",
          coordinates: value,
          radius: radius / 4,
          noiseRange : first2Digits * 2 ,
          octavesRange : firstDigit,
          lacunarityRange : firstDigit / 2,
          persistenceOffset : firstDigit / 5,
          baseFrequencyOffset : first3Digits,
          stripeFactor : stripeFactor,
          r: r,
          g: g,
          b: b,
          q: q
        }
        //console.log("rgbq:", r,g,b,q);
        planetSizeCounter++;
      }
      ticker = Util.getFirstNDigits(value, 1);
    }
    console.log("planetMap:", planetMap);
    return planetMap;
  }
}