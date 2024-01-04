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
    this.poiFactory = new PoiFactory({resourceHandler});
  }

  create3DShip = ()=>{

    return new PlayerShip3D()
  }

  /**
   *
   * @param type
   * @param canvas
   * @returns {Promise<PlayerShip3D_01>}
   */
  createShip = async ({ shipType, canvas }) => {
    const {
      engineTrail,
      propulsion,
      shield,
      terminationSequence,
      weapons,
      poi,
      resourceObject,
      properties,
    } = shipType;

    //engine trail
    await this.engineTrailFactory.invoke(engineTrail);
    //propulsion
    const propulsionInstance = await this.propulsionFactory.createPropulsion({ ...propulsion, canvas });
    //poi
    const poiInstance = await this.poiFactory.createPOI({...poi, canvas})
    //shield
    const shieldInstance = await this.shieldFactory.createShield({ ...shield, canvas });
    //termination
    const terminationSequenceInstance = await this.explosionFactory.createExplosion({ ...terminationSequence, canvas });
    //imageResource
    const imageResource = await this.resourceHandler.fetchImageResource({resourceObject});
    //weapon(s)
    const weaponsInstances = {};
    for (const weapon in weapons) {
      const weaponProperties = weapons[weapon];
      weaponsInstances[weapon] = {
        controlAssignment: weaponProperties.controlAssignment,
        units: await this.weaponFactory.createWeapon({
          canvas,
          type: weaponProperties.type,
          controlAssignment: weaponProperties.controlAssignment,
          amount: weaponProperties.amount,
          posDX: weaponProperties.posDX,
          posDY: weaponProperties.posDY,
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