class Game {
  constructor({
    gameLoop
              }){
    this.gameLoop = gameLoop;
  }


  start(){
    console.log("starting game");
    this.gameLoop.start();
  }


}