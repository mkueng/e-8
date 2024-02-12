'use strict'

class ShieldFactory {

  static SHIELD_TYPES = {
    classAShield : ClassAShield,
    classBShield : ClassBShield
  }

  constructor({resourceHandler}){
    this.resourceHandler = resourceHandler;
  };

  invoke = async ()=>{
    await ShieldFactory.SHIELD_TYPES.classAShield.invoke(this.resourceHandler);
    await ShieldFactory.SHIELD_TYPES.classBShield.invoke(this.resourceHandler);
  }

  /**
   *
   * @param canvas
   * @param posDX
   * @param posDY
   * @param SHIELD_TYPES
   * @param relatedShip
   * @returns {SHIELD_TYPES.type}
   */
  createShield = ({
                    canvas,
                    posDX,
                    posDY,
                    type,
                    relatedShip,
  })=>{
    return new type({
      canvas,
      posDX,
      posDY,
      relatedShip
    });
  };
}