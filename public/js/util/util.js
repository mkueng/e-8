class Util {

  static instance = new this();


  // objects

  /**
   *
   * @param obj
   * @returns {Map<string, unknown>|null}
   */
  static nestedObjectToFlattenedMap  = function (obj) {
    const flattenedMap = {};

    function flattenObject(object) {
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const value = object[key];
          if (typeof value === 'object' && value !== null) {
            flattenObject(value);
          } else {
            flattenedMap[key] = value;
          }
        }
      }
    }

    flattenObject(obj);
    if (Object.keys(flattenedMap).length > 0) {
      return new Map(Object.entries(flattenedMap));
    }

    return null; // No nested object found
  };

  //hash
  static simpleHash = function(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash &= hash; // Convert to 32bit integer
    }
    return new Uint32Array([hash])[0].toString(36);
  };


  // json

  static fetchJSON = async function (file){
    const response = await fetch(file);
    return await response.json();
  }

  // numbers


  /**
   *
   * @param range
   * @param offset
   * @returns {number}
   */
  static randomIntInRange = (range, offset=0) =>
  Math.floor(Math.random() * range + offset);


  /**
   *
   * @param number
   * @param n
   * @returns {number|number}
   */
  static getLastNDigits = (number, n) => {
    const numberString = number.toString();
    const lastNDigits = parseInt(numberString.slice(-n));
    return isNaN(lastNDigits) ? 0 : lastNDigits;
  }


  static pseudoRandomNumbers = ({seed, length, amount}) => {
    if (seed === undefined || length === undefined || amount === undefined) {
      throw new Error('All arguments (seed, length, amount) are required.');
    }
    const randomNumbers = [];
    if (seed.toString().length < length) {
      seed = parseInt(seed.toString().padEnd(length, '0'));
    }

    for (let i = 0; i < amount; i++) {
      const number = seed * seed;
      const truncate = number.toString().slice(0, length);
      const int = parseInt(truncate);
      randomNumbers.push(int);
      seed = int;
    }
    return randomNumbers;
  }


  /**
   *
   * @param range
   * @param amount
   * @param seed
   * @returns {*[]}
   */
  static pseudoRandomNumbersWithinRange({ min, max, amount, seed }) {
    let randomNumbers = [];
    let currentSeed = seed;
    const rangeSize = max - min; // Calculate the size of the range
    for (let i = 0; i < amount; i++) {
      currentSeed = (currentSeed * 9301 + 49297) % 233280; // Linear congruential generator formula
      const randomNumber = Math.floor((currentSeed / 233280) * (rangeSize + 1)) + min; // Scale and shift to fit the range
      randomNumbers.push(randomNumber);
    }
    return randomNumbers.sort((a, b) => a - b);
  }

  /**
   *
   * @param range
   * @param amountOfClusters
   * @param rangeWithinCluster
   * @param seed
   * @returns {*[]}
   */
  static pseudoRandomClusteredDistribution (
    {
      range,
      amountOfClusters,
      rangeWithinCluster,
      seed
    }) {
    let clusters = [];
    let distribution = Util.pseudoRandomNumbersWithinRange({
      min: 1,
      max: range,
      amount: amountOfClusters,
      seed: seed
    });



    distribution.forEach((cluster, index) => {
      const amount = Util.pseudoRandomNumbersWithinRange({
        min: 1,
        max: 2,
        amount: 1,
        seed: seed+index
      })

      const clusterOffset = Util.pseudoRandomNumbersWithinRange({
        min: 50000,
        max: 100000,
        amount: amount[0],
        seed: seed + index
      })

      clusterOffset.forEach((offset) => {
        clusters.push(cluster + offset);
      })
    })
    return clusters.sort((a, b) => a - b);
  }


  static clusterDistribution (dimension, amount, seed, clusterSeed) {
    let coordinates = [];
    let randomNumbers = Util.pseudoRandomNumbers({
      seed: seed,
      length: 5,
      amount: amount
    })
    let previousClusterCoordinates = 0;
    for (let i=0; i < amount; i++) {
      console.log("i:", i);
      const clusterCoordinateInterval = Util.pseudoRandomNumbers({
        seed: randomNumbers[i],
        length: 5,
        amount: 1
      });
      let newClusterCoordinates = previousClusterCoordinates + clusterCoordinateInterval[0];
      previousClusterCoordinates = newClusterCoordinates;


      let amountOfClusterPlanets = Util.pseudoRandomNumbers({
        seed: clusterSeed,
        length: 1,
        amount: 1
      })

      clusterSeed = clusterSeed % 1000000000;


      if (amountOfClusterPlanets[0]>4) amountOfClusterPlanets[0] = 4;
      for (let j=0; j < amountOfClusterPlanets[0]; j++) {
        let planetCoordinatesOffset = Util.pseudoRandomNumbers({
          seed: randomNumbers[j],
          length: 4,
          amount: 1
        });
        const planetCoordinates = newClusterCoordinates + planetCoordinatesOffset[0];
        clusterSeed = clusterSeed +clusterSeed;
        coordinates.push(planetCoordinates);
      }
    }
    return coordinates;
  }


  static pseudoRandomNumbers_old = ({seed, length, amount}) => {
    const randomNumbers = [];
    for (let i = 0; i < amount; i++) {
      seed = Math.sin(seed) * length;
      let randomNumber = (seed - Math.floor(seed));
      console.log("randomNumber:", randomNumber);
      randomNumber = randomNumber*1000000000;
      randomNumbers.push(parseInt(randomNumber.toFixed(0)));
    }
    return randomNumbers;
  }

  // graphics


  /**
   *
   * @param rgb
   * @returns {*}
   */
  static createRandomRGB = (rgb)=>{
    // Check if the input array has at least 3 elements
    if (rgb && rgb.length >= 3) {
      return rgb; // If yes, return the input array
    } else {
      // If not, generate a random RGB value and push it into the array
      if (!rgb) {
        rgb = []; // Initialize the array if it doesn't exist
      }
      rgb.push(Util.randomIntInRange(256)); // Random value between 0 and 255
      return this.createRandomRGB(rgb); // Recursively call the function with the updated array
    }
  }
}