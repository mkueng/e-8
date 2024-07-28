class ProceduralPlanetGallery {

  constructor() {

    this.galaxy = new Galaxy({scale: 600});
    this.planetDistribution = Util.pseudoRandomClusteredDistribution({
      ...e8.global.planetDistribution
    })
    this.planetMap = this.galaxy.createPlanetMap(this.planetDistribution);

    this.canvas = document.getElementById("canvas");
    this.canvas.width = e8.global.screenWidth;
    this.canvas.height = 10000

    this.ctx = this.canvas.getContext("2d");

    this.x = this.y = this.i = 0;
    this.previousPlanetRadius = 0;


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
    }, 2000)


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
    this.previousPlanetRadius = img.width;
    this.x+=this.previousPlanetRadius;

    if (this.x > this.canvas.width) {
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