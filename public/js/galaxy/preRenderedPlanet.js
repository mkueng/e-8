class PreRenderedPlanet {
  constructor(){

  }

  create = async (planetData) => {
    let planetImage = await e8.global.resourceHandler.fetchImageResource({resourceObject:planetData.imageResourceObject});
    let planetObject = new Planet({
      coordinates: planetData.coordinates,
      image: planetImage.image,
      width: planetImage.image.width,
      height: planetImage.image.height,
      posX: null,
      posY: 300,
      posZ: null,
      posDX: 0,
      posDY: 0,
      velX: 0,
      posZFixed: -1 * planetImage.image.width/2 / 10 * 0.0003,
      velY: 0,
      canvas: this.canvas
    })
    this.#planetObjects[planetObject.coordinates] = planetObject;
    this.#subscribers.forEach(subscriber => {
      try {
        subscriber.updateFromGalaxy({message:"planetObjects", payload: this.#planetObjects});
      } catch(e) {
        console.error(e);
      }
    })
  }
}