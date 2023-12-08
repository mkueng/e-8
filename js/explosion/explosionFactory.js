'use strict'

/**
 * singleton
 */
class ExplosionFactory {

  static instance = new this();

  static EXPLOSION_TYPES = {
    classAPlayerShipExplosion : ClassAPlayerShipExplosion,
    classAEnemyShipExplosion : ClassAEnemyShipExplosion
  }

  createExplosion = async({
                            type,
                            canvas,
                            posX,
                            posY,
                            posDX,
                            posDY
  })=>{

    /**
     *
     * @param type
     * @returns {Promise<*>}
     */
    const invokeExplosion = async (type)=>{
      await type.invoke();
      return new type({
        canvas,
        posX,
        posY,
        posDX,
        posDY,
      })
    }

    return invokeExplosion(type);
  }
}