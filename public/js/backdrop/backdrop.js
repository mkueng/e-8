'use strict'
class Backdrop {

  constructor({canvasHandler}){
    this.canvas = canvasHandler.getCanvas("backdrop").canvas;
    this.context = canvasHandler.getCanvas("backdrop").context;

    this.amountOfStars = 5000;
    this.sizeRange = 1;
    this.greyColorRange = 50;
    this.greyColorOffset = 75;

    let game = document.getElementById("game");
    game.style.width = e8.global.screenWidth + "px";
    game.style.height = e8.global.screenHeight + "px";
    e8.init.subscribeForGlobalEvents(this);

    this.createBackDrop();
  }

  updateFromGlobalEvent = ({message, payload}) => {
    if (message === e8.globalEvents.screenResized) {
      let game = document.getElementById("game");
      game.style.width = payload.width + "px";
      game.style.height = payload.height + "px";
    }
  }


  createBackDrop = () => {
  const clusters = 10; // number of clusters
  const starsPerCluster = this.amountOfStars / clusters; // stars per cluster
  const clusterRadius = e8.global.screenWidth / 5; // radius of each cluster

  for (let c = 0; c < clusters; c++) {
    // Random position for the center of the cluster
    let cx = Math.random() * e8.global.screenWidth;
    let cy = Math.random() * e8.global.screenHeight;

    for (let i = 0; i < starsPerCluster; i++) {
      // Random angle and distance for each star within the cluster
      let angle = Math.random() * 2 * Math.PI;
      let distance = Math.random() * clusterRadius;
      let x = cx + distance * Math.cos(angle);
      let y = cy + distance * Math.sin(angle);

      let size = Math.random() * this.sizeRange;
      let greyColor = Math.random() * this.greyColorRange + this.greyColorOffset;
      this.context.fillStyle = "rgb(" + greyColor + "," + greyColor + "," + 100 + ")";
      this.context.beginPath();
      this.context.arc(x, y, size, 0, 2 * Math.PI);
      this.context.fill();
    }
  }
}

}