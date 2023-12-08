'use strict'

/**
 * singleton
 */
class ShieldFactory {

  static instance = new this();

  static SHIELD_TYPES = {
    classAShield : ClassAShield
  }

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
      await type.invoke();
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