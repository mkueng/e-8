class Game {
  constructor({
    gameLoop
              }){
    this.gameLoop = gameLoop;
  }


  start(){
    console.log("starting game");
    e8.global.gameLoop.start();
  }


}