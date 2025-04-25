'use strict'
class ExplosionFactory {

  static EXPLOSION_TYPES = {
    classAPlayerShipExplosion : ClassAPlayerShipExplosion,
    classAEnemyShipExplosion : ClassAEnemyShipExplosion
  }

  constructor({
    resourceHandler
              }){
    Object.assign(this, {
      resourceHandler
    })
  }

  /**
   *
   * @returns {Promise<void>}
   */
  init = async ()=>{
    await ExplosionFactory.EXPLOSION_TYPES.classAEnemyShipExplosion.init({
      resourceHandler: this.resourceHandler
    });
    await ExplosionFactory.EXPLOSION_TYPES.classAPlayerShipExplosion.init({
      resourceHandler: this.resourceHandler
    });
  }

  createExplosion = ({
                       type,
                       canvas,
                       posX,
                       posY,
                       posDX,
                       posDY
  })=>{
    return new type({
      canvas,
      posX,
      posY,
      posDX,
      posDY
    })
  }
}