'use strict'

class PlayerShipFactory {

  static SHIP_TYPES = {
    classA : ClassAShip,
    classB : ClassBShip
  }

  /**
   *
   * @param playerShipHandler
   * @param resourceHandler
   * @param canvasHandler
   * @param inputHandler
   * @param hudHandler
   */
  constructor({
                playerShipHandler,
                resourceHandler,
                canvasHandler,
                inputHandler,
                hudHandler
  }){
    this.playerShipHandler = playerShipHandler;
    this.resourceHandler = resourceHandler;
    this.inputHandler = inputHandler;
    this.hudHandler = hudHandler;
    this.engineTrailFactory = new EngineTrailFactory({canvasHandler,resourceHandler})
    this.weaponFactory = new WeaponFactory({resourceHandler});
    this.propulsionFactory = new PropulsionFactory({resourceHandler})
    this.shieldFactory = new ShieldFactory({resourceHandler})
    this.explosionFactory = new ExplosionFactory({resourceHandler});
  }

  /**
   *
   * @param type
   * @param canvas
   * @returns {Promise<PlayerShip>}
   */
  createShip = async ({ shipType, canvas }) => {
    const {
      engineTrail,
      propulsion,
      shield,
      terminationSequence,
      weapons,
      resourceObject,
      properties,
    } = shipType;

    //engine trail
    await this.engineTrailFactory.invoke(engineTrail);
    //propulsion
    const propulsionInstance = await this.propulsionFactory.createPropulsion({ ...propulsion, canvas });
    //shield
    const shieldInstance = await this.shieldFactory.createShield({ ...shield, canvas });
    //termination
    const terminationSequenceInstance = await this.explosionFactory.createExplosion({ ...terminationSequence, canvas });
    //imageResource
    const imageResource = await this.resourceHandler.fetchResource(resourceObject);
    //weapon(s)
    const weaponsInstances = {};
    for (const weapon in weapons) {
      const weaponConfig = weapons[weapon];
      weaponsInstances[weapon] = {
        controlAssignment: weaponConfig.controlAssignment,
        units: await this.weaponFactory.createWeapon({
          canvas,
          type: weaponConfig.type,
          controlAssignment: weaponConfig.controlAssignment,
          amount: weaponConfig.amount,
          posDX: weaponConfig.posDX,
          posDY: weaponConfig.posDY,
        }),
      };
    }

    return new PlayerShip({
      image: imageResource.image,
      width: imageResource.image.width,
      height: imageResource.image.height,
      posX: properties.posX,
      posY: properties.posY,
      posDX: properties.posDX,
      posDY: properties.posDY,
      velX: properties.velX,
      velY: properties.velY,
      maxVelX: properties.maxVelX,
      maxVelY: properties.maxVelY,
      accX: properties.accX,
      accY: properties.accY,
      canvas,
      dependencies: [propulsionInstance],
      weapons: weaponsInstances,
      shield: shieldInstance,
      terminationSequence: terminationSequenceInstance,
      engineTrailFactory : this.engineTrailFactory,
      hudHandler: this.hudHandler,
      inputHandler: this.inputHandler,
      playerShipHandler: this.playerShipHandler,
    });
  };
}