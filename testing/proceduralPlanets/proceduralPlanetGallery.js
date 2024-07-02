class ProceduralPlanetGallery {

  constructor(){
    console.log("procedural planet loading");
    this.galaxy = new Galaxy({scale:600});
    this.distribution = this.galaxy.createPseudoRandomDistribution(600).reverse()
    this.galaxyMap = this.galaxy.createGalaxyMap(this.distribution);
    console.log(this.galaxyMap);
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");


    this.galaxyWorker = new Worker("../../public/js/workers/galaxy/galaxyWorker.js");
    this.galaxyWorker.postMessage({
      type : "init"
    })

    let planetData = this.galaxyMap[   this.distribution[5]];

    this.createPlanet(planetData);

    this.galaxyWorker.onmessage = (event)=> {
      const dataFromWorker = event.data;
      this.createImageFromWorkerData(dataFromWorker)
    }
  }


  createPlanet = (planetData) => {
    this.galaxyWorker.postMessage({
      type : "create",
      payload : planetData
    })
  }

  createImageFromWorkerData = (dataFromWorker)=> {
    let img = new Image();
    let planetData = dataFromWorker.planetData;
    img.onload = () => {
      console.log("image loaded");
      this.ctx.drawImage(img, 0,0);



    }
    img.src = URL.createObjectURL(dataFromWorker.imageBlob)

  }
}