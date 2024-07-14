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
  #sunObjects = {};
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
    this.#sunDistribution = this.#createPseudoRandomDistribution_old(this.#scale/3).reverse();

    this.pseudoRandomNumbers = Util.pseudoRandomNumbers(1224,16,500);
    console.log("this.pseudoRandomNumbers:", this.pseudoRandomNumbers);

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

        let posY = e8.global.screenHeight-(e8.global.screenHeight / 100 * planetData.q);
        if (posY >= e8.global.screenHeight) {
          posY = e8.global.screenHeight - img.height;
        }

        console.log("posYGenerated", posY);

        let planetObject = new Planet({
          coordinates: planetData.coordinates,
          image: img,
          width: img.width,
          height: img.height,
          posX: null,
          posY: posY,
          posDX: 0,
          posDY: 0,
          velX: 0,
          // posZ: -1 * planetData.radius / 10 * 0.0003,
          posZ: 0,
          velY: 0,
          canvas: this.canvas
        })

        console.log("POSY:", planetObject.posY);
        this.#planetObjects[planetObject.coordinates]= planetObject;
        console.log("this.#planetObjects:", this.#planetObjects);
        this.#subscribers.forEach(subscriber => {
          try {
            subscriber.updateFromGalaxy({message:"planets", payload: this.#planetObjects});
          } catch(e) {
            console.error(e);
          }

        })

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

      this.#planetObjects[this.upcomingPlanet].posX = e8.global.screenWidth;
      GameObjectsHandler.instance.addGameObject(this.#planetObjects[this.upcomingPlanet]);
      this.#createPlanet();
      this.upcomingPlanet = this.#planetDistribution[this.#planetIndex];
      this.#planetIndex++
    }
  }

  #createSun = () =>{
    console.log("CREATE SUN");
    const distributionEntry = this.#sunDistribution[this.#sunIndex];
    let size = Math.max(this.#getLastNDigits(distributionEntry, 2) * 5, 200);
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
        subscriber.updateFromGalaxy({message:"sun created", payload:  this.#planetObjects});
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

    if (planetData.type === "beauty") {
      let planetImage = this.#createBeautyPlanet(planetData);
    } else {
      this.#galaxyWorker.postMessage({
        type : "create",
        payload : planetData
      })
    }
  }

  #createBeautyPlanet = async (planetData) => {
    console.log("planetData:", planetData);
    let planetImage = await e8.global.resourceHandler.fetchImageResource({resourceObject:planetData.imageResourceObject});
    let planetObject = new Planet({
      coordinates: planetData.coordinates,
      image: planetImage.image,
      width: planetImage.image.width,
      height: planetImage.image.height,
      posX: null,
      posY: 300,
      posDX: 0,
      posDY: 0,
      velX: 0,
      posZ: -1 * planetImage.image.width/2 / 10 * 0.0003,
      velY: 0,
      canvas: this.canvas
    })
    this.#planetObjects[planetObject.coordinates]= planetObject;
    console.log("this.#planetObjects:", this.#planetObjects);
    this.#subscribers.forEach(subscriber => {
      try {
        subscriber.updateFromGalaxy({message:"planets", payload: this.#planetObjects});
      } catch(e) {
        console.error(e);
      }

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
    let ticker = 0;
    let beautyPlanetTicker = Math.floor(Math.random()*2+1);

    for (const value of distribution){

      if (ticker === beautyPlanetTicker) {
        let planetImageNr = Math.floor(Math.random()*10);
        let imageResourceObject = new ResourceObject({
          name : "planet_"+planetImageNr,
          fileName : "planet_"+planetImageNr,
          fileType : ResourceObject.TYPES.png,
          resourcePath : "/resources/planets/"

        })
        planetMap[value.toFixed(0)] = {
          type: "beauty",
          imageResourceObject: imageResourceObject
        }
        ticker = 0;
        beautyPlanetTicker = Math.floor(Math.random()*2+1);

      } else {
        const lastDigit = this.#getLastNDigits(value,1);
        const last2Digits = this.#getLastNDigits(value,2);
        const last3Digits = this.#getLastNDigits(value,3);

        planetMap[value.toFixed(0)]= {
          type : "generated",
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
      ticker++;
    }
    console.log("planetMap:", planetMap);
    return planetMap;
  }

  /**
   *
   * @param scale
   * @returns {number[]}
   */
  #createPseudoRandomDistribution_old = (scale)=> {
    return Array.from({ length: scale }, (_, i) => i)
      .map(i => Math.floor((i * 9301 + 49297) % 233280 / 233280 * 200000000))
      .sort((a, b) => b - a);
  }

  #createPseudoRandomDistribution = (scale) => {
    const numberOfClusters = Math.floor(Math.random() * 3) + 3; // Randomly choose between 5 to 10 clusters
    const clusters = [];

    // Define clusters with random centers and a narrow width
    for (let i = 0; i < numberOfClusters; i++) {
      const center = Math.random() * 800000; // Example range, adjust as needed
      clusters.push({ center, width:450000 }); // Narrow width for closely packed numbers
    }

    let distribution = [];
    clusters.forEach(cluster => {
      let start = cluster.center - cluster.width / 2;
      let end = 400000000;
      for (let i = start; i <= end; i += 500000 + Math.random() * 500000) { // Ensure at least 500 units apart
        if (i >= start && i <= end) {
          distribution.push(Math.floor(i));
        }
      }
    });

    // Shuffle the distribution to mix numbers from different clusters
    for (let i = distribution.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [distribution[i], distribution[j]] = [distribution[j], distribution[i]];
    }

    // Sort the distribution in ascending order
    distribution.sort((a, b) => a - b);

    // Adjust the distribution so the lowest entry starts at 100000
    const lowestNumber = distribution[0];
    const difference = 100000 - lowestNumber;
    distribution = distribution.map(number => number + difference).reverse();

    return distribution;
  };
}