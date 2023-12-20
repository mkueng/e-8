'use strict'

/**
 * singleton
 */
class ShieldFactory {

  static SHIELD_TYPES = {
    classAShield : ClassAShield
  }

  constructor({
    resourceHandler
              }){

    this.resourceHandler = resourceHandler;
  };

  /**
   *
   * @param shieldType
   * @param canvas
   * @param posDX
   * @param posDY
   * @returns {Promise<*>}
   */
  createShield = async ({
                          relatedShip,
                          type,
                          canvas,
                          posDX,
                          posDY
  })=>{

    /**
     *
     * @param type
     * @returns {Promise<*>}
     */
    const invokeShield = async (type) => {
      await type.invoke(this.resourceHandler);
      return new type({
        relatedShip,
        canvas,
        posDX,
        posDY
      });
    };

    return invokeShield(type);
  }
}