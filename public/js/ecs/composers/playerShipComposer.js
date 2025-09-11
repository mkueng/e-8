'use strict'

/**
 * @class PlayerShipComposer
 */
class PlayerShipComposer{

  static SHIP_TYPES = {
    classA: PlayerShipPropertiesClassA,
    classB: PlayerShipPropertiesClassB
  }

  /**
   *
   * @param playerShipFactory
   * @param explosionFactory
   * @param componentFactory
   * @param entityFactory
   * @param resourceHandler
   * @param canvasHandler
   */
  constructor({
                explosionFactory,
                componentFactory,
                entityFactory,
                resourceHandler,
                canvasHandler
  }) {
    Object.assign(this, {
      explosionFactory,
      componentFactory,
      entityFactory,
      resourceHandler,
      canvasHandler
    })
  }

  /**
   * @name composePlayerShip
   * @returns {Promise<*>}
   */
  composePlayerShip = async () => {

      const baseShip = await this.createBaseShip({
        shipType: PlayerShipComposer.SHIP_TYPES.classA,
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

  /**
   *
   * @param shipType
   * @param shipImageIdentifier
   * @param canvas
   * @returns {Promise<*>}
   */
  createBaseShip = async ({
                            shipType,
                            shipImageIdentifier,
                            canvas
  }) => {
    const imageResource = await this.resourceHandler.fetchImageResource({resourceObject: shipType["imageResourceObjects"][shipImageIdentifier]});

    const ship = this.entityFactory({
      position: this.componentFactory.createComponent("position"),
      velocity: this.componentFactory.createComponent("velocity"),
      image: this.componentFactory.createComponent("image"),
      collision: this.componentFactory.createComponent("collision"),
      hitBox: this.componentFactory.createComponent("hitBox"),
      bounds: this.componentFactory.createComponent("bounds"),
      input: this.componentFactory.createComponent("input")
    })

    ship.components.image.image = imageResource;
    ship.components.image.width = imageResource.image.width;
    ship.components.image.height = imageResource.image.height;
    ship.components.image.alpha = 1;
    ship.components.image.canvas = canvas;
    ship.components.image.context = canvas.context;

    ship.components.position.posX = 100;
    ship.components.position.posY = 200;
    ship.components.position.previousPosX = ship.components.position.posX;
    ship.components.position.previousPosY = ship.components.position.posY;
    ship.components.position.posZ = 1;

    ship.components.velocity.velX = 0;
    ship.components.velocity.velY = 0;
    ship.components.velocity.maxVelX = 5;
    ship.components.velocity.maxVelY = 5;

    ship.components.upperBoundX = 300;
    ship.components.lowerBoundX = 0;
    ship.components.upperBoundY = 400;
    ship.components.lowerBoundY = 0;

    ship.isActive = true;

    return ship;
  }
}