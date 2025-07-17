'use strict'

/**
 * @name Galaxy
 */
class Galaxy {

  #planetDistributionArray = [];
  #planetDistributionObject = {};
  #planetDistributionObjectKeys = [];
  #planetMap = {};
  #planetIndex = 0;
  #subscribers = [];
  #planetObjects = {};
  #sunDistribution = [];
  #visiblePlanets = new Set();
  #sunColorKeys = [];
  #galaxyMap = null;

  get distribution() {
    return this.#planetDistributionArray;
  }

  get planetIndex() {
    return this.#planetIndex;
  }

  constructor({
                scale,
                canvasHandler,
                inputHandler
  }){
    Object.assign(this, {
      canvasHandler,
      scale,
      inputHandler
    })
  }

  init = async () => {

    this.canvas = this.canvasHandler.getCanvas(CanvasHandler.canvasTypes.planets).canvas;
    this.galaxyWorker = new Worker("../../js/workers/galaxy/galaxyWorker.js");
    this.proceduralPlanet = new ProceduralPlanet({canvas:this.canvas, galaxyWorker:this.galaxyWorker});

    let pseudoRandomClusteredDistribution = Util.pseudoRandomClusteredDistribution(
      {...e8.global.planetDistribution}
    )

    this.#planetDistributionArray =  pseudoRandomClusteredDistribution["clustersArray"];
    this.#planetDistributionObject = pseudoRandomClusteredDistribution["clustersObject"];
    this.#planetDistributionObjectKeys = Object.keys(this.#planetDistributionObject).map(Number);

    let pseudoRandomClusteredDistributionSun = Util.pseudoRandomClusteredDistribution(
      {...e8.global.sunDistribution}
    )
    this.#sunDistribution = pseudoRandomClusteredDistributionSun["clustersArray"];
    this.#sunColorKeys = Object.keys(e8.global.sunColors);

    this.#planetMap = this.createPlanetMap(this.#planetDistributionArray);
    this.#galaxyMap = new GalaxyMap({
      planetMap: this.#planetMap,
      sunMap: this.#sunDistribution,
      inputHandler: this.inputHandler
    });

    await this.heartBeat();

  }

  /**
   *
   * @param subscriber
   */
  subscribe =(subscriber)=>{
    this.#subscribers.push(subscriber);
  }

  /**
   * @name heartBeat
   * @returns {Promise<void>}
   */
  heartBeat = ()=> {

    console.log("Galaxy heartBeat started");
    setInterval(() => {
      let playerShipSnapCoordinates = PlayerShip.coordinates;
      const filteredKeys = this.#planetDistributionObjectKeys.filter(key => key >= playerShipSnapCoordinates && key <= playerShipSnapCoordinates + 100000);
      const setObj = new Set(filteredKeys);
      for(const obj of setObj) {
        if (!this.#visiblePlanets.has(obj)) {
          this.#visiblePlanets.add(obj);
          this.#createProceduralPlanet(obj).then(() => {
            console.log("Planet created");
          });
        }
      }

      if (PlayerShip.coordinates > this.#sunDistribution[0]) {
        this.#createSun();
      }
    },1000)

  }

  /**
   * @name createSun
   */
  #createSun = () => {

    console.log("Creating SUN");
    const distributionEntry = this.#sunDistribution[0];
    this.#sunDistribution.shift()
    let size = Math.min(Util.getLastNDigits(distributionEntry, 2) * 4, 200);
    if (size < 50) size = 50;
    const sun = new Sun({
      width: size,
      height: size,
      posX:  e8.global.screenWidth + size,
      posY: e8.global.screenHeight / Util.getLastNDigits(distributionEntry, 1)+size,
      color: e8.global.sunColors[this.#sunColorKeys[Math.floor(Math.random()*this.#sunColorKeys.length)]],
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

  /**
   * @name createPlanet
   * @param coordinates
   * @returns {Promise<void>}
   */
  #createProceduralPlanet = async (coordinates) => {

    console.log("creating planet");
    let planetObject = await this.proceduralPlanet.create({planetData: this.#planetMap[coordinates]});
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
    let previousPlanetRadius = 150;

    const divisors = {
      0: 2.5,
      1: 3.5,
      2: 4.5,
      3: 2
    };

    for (const coordinate of distribution) {
      planetSizeCounter = (planetSizeCounter + 1) % 4;

      const divisor = divisors[planetSizeCounter];
      radius = Math.max(Math.floor(Util.createNumericHash(coordinate, 3) / divisor), 80);
      if (radius + 50 > previousPlanetRadius && radius - 50 < previousPlanetRadius) {
        radius = previousPlanetRadius - 30;
      }
      previousPlanetRadius = radius;

      const oneDigit = Util.createNumericHash(coordinate,1);
      const twoDigits = Util.createNumericHash(coordinate,2);
      const threeDigits = Util.getLastNDigits(coordinate,3);

      let r = parseInt(threeDigits % Util.createPseudoRandomNumber({seed : coordinate % 23 ,length:3})) || 1;
      let g = parseInt(threeDigits % Util.createPseudoRandomNumber({seed : coordinate % 131, length:3})) || 1;
      let b = parseInt(threeDigits % Util.createPseudoRandomNumber({seed : coordinate % 157, length: 3})) || 1;
      let q = parseInt(threeDigits % 100) || 1;

      let stripeFactor = twoDigits / Util.createPseudoRandomNumber({seed : 32783827, length : 2}) + 0.5
      if (oneDigit > 6 ) {
        stripeFactor = twoDigits*Util.createPseudoRandomNumber({seed : coordinate, length : 3}) % 522 / 5;
      }

      planetMap[coordinate]= {
        type : "generated",
        coordinates : coordinate,
        radius : radius,
        noiseRange : twoDigits / 1.2 ,
        octavesRange : oneDigit,
        lacunarityRange : 0.25,
        persistenceOffset : oneDigit / 5,
        baseFrequencyOffset : threeDigits * 4,
        stripeFactor : stripeFactor,
        r : r,
        g : g,
        b : b,
        q : q
      }
    }
    return planetMap;

  }
}