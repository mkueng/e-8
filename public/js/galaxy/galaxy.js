'use strict'
class Galaxy {

  #planetDistribution = [];
  #planetMap = {};
  #galaxyWorker = null;
  #planetIndex = 0;
  #sunIndex = 0;
  #subscribers = [];
  #scale;
  #planetObjects = {};
  #sunDistribution = [];

  get distribution() {
    return this.#planetDistribution;
  }

  get planetIndex() {
    return this.#planetIndex;
  }

  constructor({
                scale
  }){
    this.#scale = scale;
  }

  init = async () =>{
    this.#planetDistribution = this.#createPseudoRandomDistribution(this.#scale).reverse();
    this.#sunDistribution = this.#createPseudoRandomDistribution(this.#scale*2).reverse();

    console.log("planetDistribution:", this.#planetDistribution);
    console.log("sunDistribution:", this.#sunDistribution);

    this.#planetMap = this.#createPlanetMap(this.#planetDistribution);
    this.#galaxyWorker = new Worker("js/workers/galaxy/galaxyWorker.js");
    this.upcomingPlanet = this.#planetDistribution[this.#planetIndex];
    this.upcomingSun = this.#sunDistribution[this.#sunIndex];
    console.log("this.upcomingSun:", this.upcomingSun);
    console.log("this.upcomingPlanet:", this.upcomingPlanet);
    this.canvas = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.planets).canvas;

    e8.global.gameLoop.subscribe(this);

    this.#galaxyWorker.postMessage({
      type : "init"
    })

    this.#createPlanet();
    this.#planetIndex++

    this.#galaxyWorker.onmessage = (event)=> {
      const dataFromWorker = event.data;
      this.#createGameObjectFromWorkerData(dataFromWorker)
    }
  }

  /**
   *
   * @param dataFromWorker
   */
  #createGameObjectFromWorkerData = (dataFromWorker) =>{
      let img = new Image();
      let planetData = dataFromWorker.planetData;
      img.onload = () => {

        let planetObject = new Planet({
          coordinates: planetData.coordinates,
          image: img,
          width: img.width,
          height: img.height,
          posX: e8.global.screenWidth,
          posY: e8.global.screenHeight-(e8.global.screenHeight / 60 * planetData.q),
          posDX: 0,
          posDY: 0,
          velX: 0,
          posZ: -1 * planetData.radius / 10 * 0.0002,
          velY: 0,
          canvas: this.canvas
        })
        this.#planetObjects[planetObject.coordinates]= planetObject;
        console.log("this.#planetObjects:", this.#planetObjects);
        URL.revokeObjectURL(img.src);
      }
      img.src = URL.createObjectURL(dataFromWorker.imageBlob)
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
    if (PlayerShip.coordinates > this.upcomingSun) {
      this.#createSun();
      this.#sunIndex++
      this.upcomingSun = this.#sunDistribution[this.#sunIndex];

    }

    if (PlayerShip.coordinates > this.upcomingPlanet) {
      GameObjectsHandler.instance.addGameObject(this.#planetObjects[this.upcomingPlanet]);
      this.#createPlanet();
      this.upcomingPlanet = this.#planetDistribution[this.#planetIndex];
      this.#planetIndex++
    }
  }

  #createSun = () =>{
    console.log("CREATE SUN");
    const distributionEntry = this.#sunDistribution[this.#sunIndex];
    let size = Math.max(this.#getLastNDigits(distributionEntry, 2) * 15, 200);
    console.log("sun distributionEntry:", distributionEntry);
    console.log("sun size: ", size);
    const sun = new Sun({
      width: size,
      height: size,
      posX:  e8.global.screenWidth + size,
      posY: e8.global.screenHeight / this.#getLastNDigits(distributionEntry, 1)
    })

    GameObjectsHandler.instance.addGameObject(sun);
    this.#subscribers.forEach(subscriber => {
      try {
        subscriber.updateFromGalaxy(sun);
      } catch(e) {
        console.error(e);
      }

    })
  }


  #createPlanet = () => {
    let distributionEntry = this.#planetDistribution[this.#planetIndex];
    let planetData = this.#planetMap[distributionEntry];
    planetData["coordinates"] = distributionEntry;
    console.log("creating planet: ", planetData);

    this.#galaxyWorker.postMessage({
      type : "create",
      payload : planetData
    })
  }

  /**
   *
   * @param number
   * @param n
   * @returns {number|number}
   */
  #getLastNDigits = (number, n)=> {
    const numberString = number.toString();
    const lastNDigits = parseInt(numberString.slice(-n));
    return isNaN(lastNDigits) ? 0 : lastNDigits;
  }

  /**
   *
   * @param distribution
   * @returns {{}}
   */
  #createPlanetMap = (distribution) =>{
    let planetMap = {};
    for (const value of distribution){
      const lastDigit = this.#getLastNDigits(value,1);
      const last2Digits = this.#getLastNDigits(value,2);
      const last3Digits = this.#getLastNDigits(value,3);

      planetMap[value.toFixed(0)]= {
        radius: parseInt((this.#getLastNDigits(value, 2) * 4+40).toFixed(0)),
        noiseRange : lastDigit,
        octavesRange : lastDigit,
        lacunarityRange : lastDigit / 4,
        persistenceOffset : lastDigit / 10,
        baseFrequencyOffset : lastDigit / 3,
        r: parseInt((last2Digits*(Math.random()*2)).toFixed(0)),
        g: parseInt((last2Digits*(Math.random()*2)).toFixed(0)),
        b: parseInt((last3Digits / 4).toFixed(0)),
        q: last2Digits
      }
    }
    return planetMap;
  }

  /**
   *
   * @param scale
   * @returns {number[]}
   */
  #createPseudoRandomDistribution = (scale)=> {
    return Array.from({ length: scale }, (_, i) => i)
      .map(i => Math.floor((i * 9301 + 49297) % 233280 / 233280 * 200000000))
      .sort((a, b) => b - a);
  }
}