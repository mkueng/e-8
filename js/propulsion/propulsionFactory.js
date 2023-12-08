'use strict'

/**
 * singleton
 */
class PropulsionFactory {

  static instance = new this();

  static PROPULSION_TYPES = {
    ionA : PropulsionIonA,
    ionB : PropulsionIonB
  }

  /**
   *
   * @param type
   * @param canvas
   * @param posDX
   * @param posDY
   * @returns {Promise<*>}
   */
  createPropulsion = async ({
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
    const invokePropulsion = async (type) =>{
      await type.invoke();
      return new type({
        canvas,
        posDX,
        posDY
      })
    }

    return invokePropulsion(type);
  }
}