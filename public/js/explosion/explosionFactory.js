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
      const soundResource = await type.fetchSound(this.resourceHandler);
      return new type({
        resourceHandler: this.resourceHandler,
        spriteSheetResource,
        soundResource,
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