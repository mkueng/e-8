'use strict'
class ExplosionFactory {

  static EXPLOSION_TYPES = {
    classAPlayerShipExplosion: ClassAPlayerShipExplosion,
    classAEnemyShipExplosion: ClassAEnemyShipExplosion
  }

  constructor(){
  }

  invoke = async ()=>{

    await ExplosionFactory.EXPLOSION_TYPES.classAEnemyShipExplosion.invoke();
    await ExplosionFactory.EXPLOSION_TYPES.classAPlayerShipExplosion.invoke();
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