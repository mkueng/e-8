'use strict'

class PropulsionFactory {

  static PROPULSION_TYPES = {
    ionA : PropulsionIonA,
    ionB : PropulsionIonB
  }

  constructor({
    resourceHandler
              }){
    this.resourceHandler = resourceHandler;
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
      await type.invoke(this.resourceHandler);
      return new type({
        canvas,
        posDX,
        posDY
      })
    }

    return invokePropulsion(type);
  }
}