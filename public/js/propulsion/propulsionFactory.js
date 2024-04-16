'use strict'
class PropulsionFactory {

  static PROPULSION_TYPES = {
    ionA : PropulsionIonA,
    ionC : PropulsionIonC
  }

  constructor({resourceHandler}){
    this.resourceHandler = resourceHandler;
    console.log("resourceHandler",resourceHandler);
  }

  invoke = async ()=>{
    await PropulsionFactory.PROPULSION_TYPES.ionA.invoke(this.resourceHandler);
    await PropulsionFactory.PROPULSION_TYPES.ionC.invoke(this.resourceHandler);

  }

  /**
   *
   * @param type
   * @param canvas
   * @param posDX
   * @param posDY
   * @param isActive
   * @returns {Promise<*>}
   */
  createPropulsion = async ({
                              type,
                              canvas,
                              posDX,
                              posDY,
                              isActive

  })=>{
    return new type({
      canvas,
      posDX,
      posDY,
      isActive
    })
  }
}