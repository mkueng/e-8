'use strict';
class ProceduralPlanetGallery {

  constructor() {

    this.galaxy = new Galaxy({scale: 600});
    this.psuedoRandomClusteredDistribution = Util.pseudoRandomClusteredDistribution({...e8.global.planetDistribution});
    this.planetDistribution =  this.psuedoRandomClusteredDistribution["clustersArray"];
    console.log("this.planetDistribution", this.planetDistribution);
    this.planetMap = this.galaxy.createPlanetMap(this.planetDistribution);
    console.log("this.planetMap", this.planetMap);

    this.canvas = document.getElementById("canvas");
    this.planetWorker = new Worker("../../public/js/workers/galaxy/planetWorker.js");
    this.generatedPlanet = new GeneratedPlanet({canvas: this.canvas,planetWorker: this.planetWorker});
    this.canvas.width = e8.global.screenWidth-20;
    this.canvas.height = 10000
    this.ctx = this.canvas.getContext("2d");

    this.x = this.y = this.i = 0;
    this.previousPlanetRadius = 0;
    this.i = 300;

    setInterval(() => {
      let planetData = this.planetMap[this.planetDistribution[this.i]];
      if ( this.i < 400 && planetData.type !=="preRendered") {
        console.log("planetData", planetData.radius);
        this.createPlanet(planetData);
      }
      this.i++;
    }, 1000)
  }

  drawImage = (img) => {
    this.ctx.drawImage(img, this.x,this.y);
    this.previousPlanetRadius = img.width;
    this.x+=this.previousPlanetRadius;

    if (this.x > this.canvas.width -200) {
      this.y += 300;
      this.x = 0;
    }
  }

  createPlanet = (planetData) => {

    this.generatedPlanet.create(planetData).then(planetObject => {
      console.log("planetObject", planetObject);
      this.drawImage(planetObject.image);
    })
  }
}