'use strict'
class ProceduralPlanet {

  #galaxyWorker = null;

  constructor({canvas, galaxyWorker: galaxyWorker}) {
    this.canvas = canvas;
    this.#galaxyWorker = galaxyWorker;
    this.#galaxyWorker.postMessage({
      type : "init"
    })
  }

  /**
   *
   * @param planetData
   * @returns {Promise<unknown>}
   */
  create = async ({planetData: planetData}) => {
    this.#galaxyWorker.postMessage({
      type : "createPlanet",
      payload : planetData
    })
    return new Promise((resolve) => {
      this.#galaxyWorker.onmessage = async (event) => {
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

      img.onload = () => {
        let posY = (planetData.coordinates % (e8.global.screenHeight) - planetData.radius);
        let posZ = Math.sqrt(1 / (planetData.radius*planetData.radius*2)) * 80000;
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