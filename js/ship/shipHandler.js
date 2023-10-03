'use strict'

/**
 * singleton
 */
class ShipHandler {

  static instance = new this();

  #inventory = {};
  #activeShip = null;

  invoke(params={}){
    this.#activeShip = params.ship || new Ship_01();
  }


  get inventory() {
    return this.#inventory;
  }

  set inventory(value) {
    this.#inventory = value;
  }

  get activeShip() {
    return this.#activeShip;
  }

  set activeShip(value) {
    this.#activeShip = value;
  }
}