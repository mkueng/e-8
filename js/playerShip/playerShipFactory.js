'use strict'

/**
 * singleton
 */
class PlayerShipFactory {

  static instance = new this();

  static SHIP_TYPES = {
    classA : ClassAPlayerShip,
    classB : ClassBPlayerShip
  }

  /**
   *
   * @param type
   * @param canvas
   * @returns {Promise<PlayerShip>}
   */
  createShip = async ({
    type,
    canvas
  })=> {
    return type.create(canvas)
  }
}