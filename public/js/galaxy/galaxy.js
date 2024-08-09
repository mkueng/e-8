'use strict'
class Galaxy {

  #planetDistribution = [];
  #clonedPlanetDistribution = [];
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

  get distribution() {
    return this.#planetDistribution;
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

    this.#planetDistribution =  Util.pseudoRandomClusteredDistribution(
    {...e8.global.planetDistribution}
    )

    this.#clonedPlanetDistribution = [...this.#planetDistribution];
    this.#upcomingPlanetCoordinates = this.#clonedPlanetDistribution[this.#planetIndex];
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
    console.log("this.#planetDistribution:", this.#planetDistribution);
    console.log("this.#sunDistribution:", this.#sunDistribution);

    this.#planetMap = this.createPlanetMap(this.#planetDistribution);

    this.upcomingPlanetCoordinates = this.#planetDistribution[this.#planetIndex];
    this.upcomingSunCoordinates = this.#sunDistribution[this.#sunIndex];

    e8.global.gameLoop.subscribe(this);

    for (let i = 0; i < this.#planetQueueBufferSize; i++) {
      await this.#createPlanet();
    }
  }

  /**
   *
   * @param subscriber
   */
  subscribe =(subscriber)=>{
    this.#subscribers.push(subscriber);
  }

  /**
   *
   * @param data
   */
  updateFromGameLoop = (data)=>{
    //console.log("this.#planetObjects:", this.#planetObjects);
    //console.log("this.#clonedPlanetDistribution", this.#clonedPlanetDistribution[this.#planetIndex]);

    if (PlayerShip.coordinates > this.#sunDistribution[0]) {
      this.#createSun();
    }



    if (PlayerShip.coordinates > this.#upcomingPlanetCoordinates) {
      console.log("SHOWING PLANET");
      try {
        this.#planetObjects[this.#clonedPlanetDistribution[this.#planetIndex]].posX = e8.global.screenWidth;
        GameObjectsHandler.instance.addGameObject(this.#planetObjects[this.#clonedPlanetDistribution[this.#planetIndex]]);
      } catch(e){console.error(e)}

      //this.#clonedPlanetDistribution.shift();
      this.#planetIndex++;
      this.#upcomingPlanetCoordinates = this.#clonedPlanetDistribution[this.#planetIndex];
      this.#createPlanet().then(() => {
        console.log("planet created")
      });
    }
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


  #createPlanet = async () => {
    let planetData = this.#planetMap[this.#planetDistribution.shift()];

    if (planetData.type === "preRendered") {
      //await this.#createPreRenderedPlanet(planetData);
    } else {
      let planetObject = await this.generatedPlanet.create(planetData);
      this.#planetObjects[planetObject.coordinates] = planetObject;

      this.#subscribers.forEach(subscriber => {
        try {
          subscriber.updateFromGalaxy({ message: "planetObjects", payload: this.#planetObjects });
        } catch (e) {
          console.error(e);
        }
      });
    }
  }

  /**
   *
   * @param distribution
   * @returns {{}}
   */
  createPlanetMap = (distribution) =>{
    let planetMap = {};
    let ticker = Util.getLastNDigits(distribution[0], 1);
    let planetSizeCounter = 1
    for (const value of distribution){
      if (planetSizeCounter >= 5) {
        planetSizeCounter = 1;
      }

      // preRenderedPlanet
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
        const lastDigit = Util.getLastNDigits(value,1);
        const last2Digits = Util.getLastNDigits(value,2);
        const last3Digits = Util.getLastNDigits(value,3);

        let r = parseInt(last3Digits % 120);
        let g = parseInt(last3Digits % 142);
        let b = parseInt(last3Digits % 109);
        let q = parseInt(last3Digits % 10);

       // let stripeFactor = lastDigit / 7+1;

        let stripeFactor = lastDigit / 6;
        if (lastDigit > 6 ) stripeFactor = value % 20;

        planetMap[value.toFixed(0)]= {
          type : "generated",
          coordinates: value,
          radius: parseInt((Util.getLastNDigits(value, 3)/2+10).toFixed(0))*0.5,
          noiseRange : last2Digits * 2 ,
          octavesRange : lastDigit,
          lacunarityRange : lastDigit / 4,
          persistenceOffset : lastDigit / 10,
          baseFrequencyOffset : last3Digits,
          stripeFactor : stripeFactor,
          r: r,
          g: g,
          b: b,
          q: q
        }
        //console.log("rgbq:", r,g,b,q);
        planetSizeCounter++;
      }
      ticker = Util.getLastNDigits(value, 1);
    }
    console.log("planetMap:", planetMap);
    return planetMap;
  }
}