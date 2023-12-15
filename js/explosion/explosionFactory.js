'use strict'

class ExplosionFactory {

  static EXPLOSION_TYPES = {
    classAPlayerShipExplosion : ClassAPlayerShipExplosion,
    classAEnemyShipExplosion : ClassAEnemyShipExplosion
  }

  constructor({
                resourceHandler
  }){
    this.resourceHandler = resourceHandler;
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
    const instantiateExplosion = async (type)=>{
      const spriteSheetResource = await type.fetchSpriteSheet(this.resourceHandler);
      return new type({
        spriteSheetResource,
        canvas,
        posX,
        posY,
        posDX,
        posDY,
      })
    }
    return instantiateExplosion(type);
  }
}