class ProceduralPlanetGallery {

  constructor() {
    console.log("procedural planet loading");
    this.galaxy = new Galaxy({scale: 600});
    this.planetDistribution = Util.pseudoRandomClusteredDistribution({
      seed: 1273827,
      amountOfClusters: 400,
      range: 200000000,
      rangeWithinCluster: 1000
    })
    this.planetMap = this.galaxy.createPlanetMap(this.planetDistribution);



    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.x = 0;
    this.y = 0;
    this.i = 20;

    this.galaxyWorker = new Worker("../../public/js/workers/galaxy/galaxyWorker.js");
    this.galaxyWorker.postMessage({
      type: "init"
    })

    setInterval(() => {
      let planetData = this.planetMap[this.planetDistribution[this.i]];
      if ( this.i < 50 && planetData.type !=="beauty") {
        this.createPlanet(planetData);
      }

      this.i++;
    }, 1000)







    this.galaxyWorker.onmessage = (event)=> {
      const dataFromWorker = event.data;
      this.createImageFromWorkerData(dataFromWorker)
    }
  }


  createPlanetsFromPlanetMap = () => {
    let planetData = this.planetMap[this.planetDistribution[i]];
    this.createPlanet(planetData);
  }

  drawImage = (img) => {

    this.ctx.drawImage(img, this.x,this.y);
    this.x+=300;
    if (this.x % 2200 === 0) {
      this.y += 300;
      this.x = 0;
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
      this.drawImage(img);



    }
    img.src = URL.createObjectURL(dataFromWorker.imageBlob)

  }
}