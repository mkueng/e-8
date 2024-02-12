'use strict'
class ExplosionFactory {

  static EXPLOSION_TYPES = {
    classAPlayerShipExplosion: ClassAPlayerShipExplosion,
    classAEnemyShipExplosion: ClassAEnemyShipExplosion
  }

  constructor({
                resourceHandler
  }){
    this.resourceHandler = resourceHandler;
  }

  invoke = async ()=>{

    await ExplosionFactory.EXPLOSION_TYPES.classAEnemyShipExplosion.invoke(this.resourceHandler);
    await ExplosionFactory.EXPLOSION_TYPES.classAPlayerShipExplosion.invoke(this.resourceHandler);
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