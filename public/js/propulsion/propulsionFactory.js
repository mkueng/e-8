'use strict'
class PropulsionFactory {

  static PROPULSION_TYPES = {
    ionA : PropulsionIonA
  }

  constructor({resourceHandler}){
    this.resourceHandler = resourceHandler;
  }

  invoke = async ()=>{
    await PropulsionFactory.PROPULSION_TYPES.ionA.invoke(this.resourceHandler);

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
    return new type({
      canvas,
      posDX,
      posDY
    })
  }
}