'use strict'

class PlayerShipHandler {

  #canvas = {};
  static activeShip = null;

  constructor({
                canvasHandler,
                resourceHandler,
                inputHandler,
                hudHandler
  }){
    this.#canvas = canvasHandler.getCanvas("backgroundFront").canvas;

    this.playerShipFactory = new PlayerShipFactory({
      playerShipHandler: this,
      resourceHandler,
      canvasHandler,
      inputHandler,
      hudHandler
    });
  }

  shipDestroyed =(id)=>{

  }

  create = async ()=>{
    PlayerShipHandler.activeShip = await this.playerShipFactory.createShip({
      shipType: PlayerShipFactory.SHIP_TYPES.classA,
      canvas : this.#canvas
    })
  }
}