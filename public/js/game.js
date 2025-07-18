'use strict'
class Game {

  #gameLoop
  #hazeHandler
  #dustHandler
  #playerShipHandler
  #asteroidHandler
  #enemyShipHandler
  #freighterHandler

  constructor({
                dustHandler,
                playerShipHandler,
                asteroidHandler,
                hazeHandler,
                enemyShipHandler,
                freighterHandler,
                poiHandler,
                spaceStationHandler,
                terminal
  }) {
    this.#gameLoop = new GameLoop();
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
    this.#enemyShipHandler.startCreation(1000);
    //await this.#freighterHandler.create();

    //show the game canvas
    document.querySelector("#game").style.display = "block";
  }
}