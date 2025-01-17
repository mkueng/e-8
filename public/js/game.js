class Game {

  #gameLoop
  #hazeHandler
  #dustHandler
  #playerShipHandler
  #asteroidHandler
  #enemyShipHandler
#freighterHandler

  constructor({
                gameLoop,
                dustHandler,
                playerShipHandler,
                asteroidHandler,
                hazeHandler,
    enemyShipHandler,
    freighterHandler
  }) {
    this.#gameLoop = gameLoop;
    this.#dustHandler = dustHandler;
    this.#playerShipHandler = playerShipHandler;
    this.#asteroidHandler = asteroidHandler;
    this.#hazeHandler = hazeHandler;
    this.#enemyShipHandler = enemyShipHandler;
    this.#freighterHandler = freighterHandler;
  }

  start = async ()=>{
    await this.#playerShipHandler.createShip();
    this.#gameLoop.start();
    this.#dustHandler.invokeDust();
    this.#asteroidHandler.startHeartBeat();
    this.#hazeHandler.startHeartBeat();
    this.#enemyShipHandler.startCreation(3000);
    await this.#freighterHandler.create();

  }

}