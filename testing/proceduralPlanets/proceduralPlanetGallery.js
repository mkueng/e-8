'use strict';
class ProceduralPlanetGallery {

  constructor() {

    this.galaxy = new Galaxy({scale: e8.global.scaleOfGalaxy});
    this.psuedoRandomClusteredDistribution = Util.pseudoRandomClusteredDistribution(
      {...e8.global.planetDistribution}
    );
    this.planetDistribution =  this.psuedoRandomClusteredDistribution["clustersArray"];
    this.planetMap = this.galaxy.createPlanetMap(this.planetDistribution);
    console.log("this.planetMap", this.planetMap);

    this.canvas = document.getElementById("canvas");
    this.galaxyWorker = new Worker("../../public/js/workers/galaxy/galaxyWorker.js");
    this.generatedPlanet = new GeneratedPlanet({canvas: this.canvas,planetWorker: this.galaxyWorker});
    this.canvas.width = e8.global.screenWidth-20;
    this.canvas.height = 10000
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "15px courier,sans-serif";
    this.ctx.fillStyle = "white";

    this.i = 0;
    this.x = 10;
    this.y = 100
    this.previousPlanetRadius = 0;

    this.createPlanet(this.planetMap[this.planetDistribution[this.i]])
  }

  drawImage = (img) => {
    this.ctx.drawImage(img, this.x, this.y);
    this.ctx.fillText(this.i, this.x+img.width/2, this.y+img.height/2);
    this.ctx.fillText("coord: "+ this.planetMap[this.planetDistribution[this.i]].coordinates, this.x+img.width/2-50, this.y+img.height/2+20);
    this.ctx.fillText("rad: "+ this.planetMap[this.planetDistribution[this.i]].radius, this.x+img.width/2-50, this.y+img.height/2+40);

    this.previousPlanetRadius = img.width;
    this.x+=this.previousPlanetRadius;
    if (this.x > e8.global.screenWidth-img.width) {
      this.x = 10;
      this.y += this.previousPlanetRadius;
    }
  }

  createPlanet = (planetData) => {
    this.generatedPlanet.create(planetData).then(planetObject => {
      console.log("planetObject", planetObject);
      this.drawImage(planetObject.image);
      this.i++;
      this.createPlanet(this.planetMap[this.planetDistribution[this.i]])
    })
  }
}