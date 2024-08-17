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
        console.log("planetWorker event", event);
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
        let posY = e8.global.screenHeight - 10 * planetData.r;
        let posZFixed = -1 * planetData.radius / (Math.floor(0.5 * 70000 + 25000));
        console.log("planetData radius", planetData.radius);
        //console.log("posZFixed", posZFixed);
        //console.log("posY", posY);
        if (posY >= e8.global.screenHeight) {
          posY = 500;//e8.global.screenHeight - img.height / 2;
        }

        let planetObject = new Planet({
          coordinates: planetData.coordinates,
          image: img,
          width: img.width,
          height: img.height,
          posX: null,
          posY: 500,
          posDX: 0,
          posDY: 0,
          velX: 0,
          posZFixed: posZFixed,
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