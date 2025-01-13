class Game {

  #gameLoop

  constructor({
                gameLoop
  }){
    this.#gameLoop = gameLoop;
  }

  start(){
    e8.global.gameLoop.start();
  }

}