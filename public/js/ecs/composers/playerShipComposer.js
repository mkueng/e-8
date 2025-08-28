'use strict'

/**
 * @class PlayerShipComposer
 */
class PlayerShipComposer{

  /**
   *
   * @param playerShipFactory
   * @param weaponFactory
   * @param explosionFactory
   * @param canvasHandler
   */
  constructor({playerShipFactory, weaponFactory, explosionFactory, canvasHandler}) {
    Object.assign(this, {
      playerShipFactory: playerShipFactory,
      weaponFactory: weaponFactory,
      explosionFactory: explosionFactory,
      canvasHandler: canvasHandler
    })
  }

  /**
   * @name composePlayerShip
   * @returns {Promise<*>}
   */
  composePlayerShip = async () => {

      const baseShip = await this.playerShipFactory.createShip({
        shipType: PlayerShipFactory_ecs.SHIP_TYPES.classA,
        shipImageIdentifier: "eagle",
        canvas: this.canvasHandler.getCanvas(CanvasHandler.canvasTypes.backgroundMiddle),
      })

      ECS.registerEntityToGroups(baseShip);
      return (baseShip)

/*
    let photonTorpedo = await this.weaponFactory.createWeapon({
      type: WeaponFactory_ecs.WEAPON_TYPES.photonTorpedo,
      dependency: baseShip.id,
    })
    */
  }
}