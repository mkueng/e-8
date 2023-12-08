'use strict'

/**
 * singleton
 */
class PlayerShipHandler {

  static instance = new this();

  #inventory = {};
  #canvas = {};
  static activeShip = null;

  invoke = ()=>{
    this.#canvas = CanvasHandler.instance.getCanvas(CanvasHandler.CANVASTYPES.playerShip).canvas;

  }

  create = async ()=>{
    PlayerShipHandler.activeShip = await PlayerShipFactory.instance.createShip({
      type: PlayerShipFactory.SHIP_TYPES.classB,
      canvas : this.#canvas
    })
  }

  get inventory() {
    return this.#inventory;
  }

  set inventory(value) {
    this.#inventory = value;
  }


}