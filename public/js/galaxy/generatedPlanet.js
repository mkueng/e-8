'use strict'
class GeneratedPlanet {

  #planetWorker = null;

  constructor({canvas, planetWorker}) {
    this.canvas = canvas;
    this.#planetWorker = planetWorker;
    this.#planetWorker.postMessage({
      type : "init"
    })
  }

  /**
   *
   * @param planetData
   * @returns {Promise<unknown>}
   */
  create = async (planetData) => {
    this.#planetWorker.postMessage({
      type : "create",
      payload : planetData
    })
    return new Promise((resolve) => {
      this.#planetWorker.onmessage = async (event) => {
        const dataFromWorker = event.data;
        const planetObject = this.createPlanetObjectFromData(dataFromWorker).then((planetObject) => {
          resolve(planetObject);
        });

      };
    });
  }

  /**
   *
   * @param data
   * @returns {Promise<unknown>}
   */
  createPlanetObjectFromData = async (data) => {
    return new Promise((resolve) => {
      let img = new Image();
      let planetData = data.planetData;
      console.log("planetData", planetData);

      img.onload = () => {
        let posY = (planetData.coordinates % e8.global.screenHeight) - planetData.radius / 2;
        if (posY >= e8.global.screenHeight) {
          posY = 500;//e8.global.screenHeight - img.height / 2;
        }

        let posZ = Math.sqrt(1 / planetData.radius) * 4000;

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
          posZ: posZ,
          velY: 0,
          canvas: this.canvas
        })

        URL.revokeObjectURL(img.src);
        resolve(planetObject);
      }
      img.src = URL.createObjectURL(data.imageBlob);
    })
  }
}