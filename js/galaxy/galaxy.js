'use strict'
class Galaxy {

  #distribution = [];
  #galaxyMap = {};
  #galaxyWorker = null;
  #galaxyIndex = 0;

  get galaxyMap() {
    return this.#galaxyMap;
  }

  get distribution(){
    return this.#distribution;
  }

  constructor({
                gameLoop,
                canvasHandler,
                scale
              }){
    this.#distribution = this.#createPseudoRandomDistribution(scale).reverse();
    this.#galaxyMap = this.#createGalaxyMap(this.#distribution);
    this.#galaxyWorker = new Worker("js/workers/galaxy/galaxyWorker.js");
    this.upcoming = this.distribution[this.#galaxyIndex];
    gameLoop.subscribe(this);

    this.#galaxyWorker.postMessage({
      type : "init"
    })

    let canvas = canvasHandler.getCanvas("backgroundFarthest").canvas;

    this.#galaxyWorker.onmessage = function(event) {
      const dataFromWorker = event.data;
      let img = new Image();
      let planetData = dataFromWorker.planetData;
      img.onload =()=>{

        let planetObject = new Planet({
          image : img,
          width : img.width,
          height : img.height,
          posX : window.global.screenWidth,
          posY : Math.floor(Math.random()*window.global.screenHeight)-(planetData.radius*2),
          posDX: 0,
          posDY : 0,
          velX : -0.3* (planetData.radius/200),
          velY : 0,
          canvas : canvas
        })

        GameObjectsHandler.instance.addGameObject(planetObject);
        URL.revokeObjectURL(img.src);
      }
      img.src = URL.createObjectURL(dataFromWorker.imageBlob)
    };
  }

  /**
   *
   * @param coordinate
   */
  update = (coordinate)=>{
    if (coordinate > this.upcoming) {
      this.#galaxyIndex++
      let randomDistributionEntry = this.distribution[Math.floor(Math.random()*99)];
      let randomPlanetData = this.galaxyMap[randomDistributionEntry];
      this.#createPlanet(randomPlanetData);
      this.upcoming = this.distribution[this.#galaxyIndex].toFixed(0);
    }
  }

  /**
   *
   * @param planetData
   */
  #createPlanet = (planetData)=>{
    this.#galaxyWorker.postMessage({
      type : "create",
      payload : planetData
    })
  }

  #getLastNDigits = (number, n)=> {
    const numberString = number.toString();
    const lastNDigits = parseInt(numberString.slice(-n));
    return isNaN(lastNDigits) ? 0 : lastNDigits;
  }

  #createGalaxyMap = (distribution) =>{
    let galaxyMap = {};
    for (const value of distribution){
      const lastDigit = this.#getLastNDigits(value,1);
      const last2Digits = this.#getLastNDigits(value,2);
      const last3Digits = this.#getLastNDigits(value,3);

      galaxyMap[value.toFixed(0)]= {
        radius: parseInt((this.#getLastNDigits(value, 2) * 3+40).toFixed(0)),
        noiseRange : lastDigit,
        octavesRange : lastDigit,
        lacunarityRange : lastDigit / 4,
        persistenceOffset : lastDigit / 10,
        baseFrequencyOffset : lastDigit / 3,
        r :  parseInt((last2Digits*2).toFixed(0)),
        g :  parseInt((last2Digits*2).toFixed(0)),
        b :  parseInt((last3Digits / 4).toFixed(0)),
        q : last2Digits
      }
    }
    return galaxyMap;
  }

  #createPseudoRandomDistribution = (scale)=> {
    return Array.from({ length: scale }, (_, i) => i)
      .map(i => Math.floor((i * 9301 + 49297) % 233280 / 233280 * 10000000))
      .sort((a, b) => b - a);
  }
}