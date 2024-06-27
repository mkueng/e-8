'use strict'
class Galaxy {

  #distribution = [];
  #galaxyMap = {};
  #galaxyWorker = null;
  #galaxyIndex = 0;
  #subscribers = [];
  #scale;

  constructor({
                scale
  }){
    this.#scale = scale;
  }

  init = async () =>{
    this.#distribution = this.#createPseudoRandomDistribution(this.#scale).reverse();
    console.log(this.#distribution);
    this.#galaxyMap = this.#createGalaxyMap(this.#distribution);
    this.#galaxyWorker = new Worker("js/workers/galaxy/galaxyWorker.js");
    this.upcoming = this.#distribution[this.#galaxyIndex];
    this.canvas = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.planets).canvas;

    e8.global.gameLoop.subscribe(this);

    this.#galaxyWorker.postMessage({
      type : "init"
    })

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
      console.log("planetData", planetData);
      img.onload = () => {

        let planetObject = new Planet({
          image: img,
          width: img.width/2,
          height: img.height/2,
          posX: e8.global.screenWidth,
          posY: e8.global.screenHeight-(e8.global.screenHeight / 50 * planetData.q),
          posDX: 0,
          posDY: 0,
          velX: 0,
          posZ: -1 * planetData.radius / 10 * 0.0001,
          velY: 0,
          canvas: this.canvas
        })
        console.log("planet created", planetObject.posY);
        GameObjectsHandler.instance.addGameObject(planetObject);
        for(const subscriber of this.#subscribers) {
          subscriber.update({planetObject});
        }
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
    if (PlayerShip.coordinates > this.upcoming) {
      this.#galaxyIndex++
      console.log("creating planet");
      let randomDistributionEntry = this.#distribution[this.#galaxyIndex];
      let randomPlanetData = this.#galaxyMap[randomDistributionEntry];
      console.log("randomPlanetData", randomPlanetData);
      this.#createPlanet(randomPlanetData);
      this.upcoming = this.#distribution[this.#galaxyIndex].toFixed(0);
    }
  }

  /**
   *
   * @param planetData
   */
  #createPlanet = (planetData) => {
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
  #createGalaxyMap = (distribution) =>{
    let galaxyMap = {};
    for (const value of distribution){
      const lastDigit = this.#getLastNDigits(value,1);
      const last2Digits = this.#getLastNDigits(value,2);
      const last3Digits = this.#getLastNDigits(value,3);

      galaxyMap[value.toFixed(0)]= {
        radius: parseInt((this.#getLastNDigits(value, 2) * 8+40).toFixed(0)),
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
    return galaxyMap;
  }

  /**
   *
   * @param scale
   * @returns {number[]}
   */
  #createPseudoRandomDistribution = (scale)=> {
    return Array.from({ length: scale }, (_, i) => i)
      .map(i => Math.floor((i * 9301 + 49297) % 233280 / 233280 * 100000000))
      .sort((a, b) => b - a);
  }
}