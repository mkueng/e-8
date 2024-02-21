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
    this.propulsionFactory = new PropulsionFactory({resourceHandler});
    this.shieldFactory = new ShieldFactory({resourceHandler});
    this.explosionFactory = new ExplosionFactory({resourceHandler});
  }

  create3DShip = ()=>{
    return new PlayerShip3D()
  }

  invoke = async ()=>{
    await this.shieldFactory.invoke();
    await this.weaponFactory.invoke();
    await this.propulsionFactory.invoke();
    await this.explosionFactory.invoke();
  }

  /**
   *
   * @param shipType {PlayerShipFactory.SHIP_TYPES}
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
      features,
      resourceObject,
      properties,
    } = shipType;

    const imageResource = await this.resourceHandler.fetchImageResource({resourceObject});
    const engineTrailInstance = await this.#createEngineTrail({engineTrail, canvas})
    const propulsionInstance = await this.#createPropulsion({propulsion, canvas});
    const shieldInstance = await this.#createShield({shield, canvas});
    const terminationSequenceInstance = await this.#createTerminationSequence({terminationSequence, canvas})
    const featureInstances = this.#createFeatures({features});
    const weaponsInstances = this.#createWeapons({weapons, canvas})


    return new PlayerShip({
      accX: properties.accX,
      accY: properties.accY,
      canvas,
      dependencies: [propulsionInstance],
      engineTrail : engineTrailInstance,
      features: featureInstances,
      height: imageResource.image.height,
      hudHandler: this.hudHandler,
      inputHandler: this.inputHandler,
      maxVelX: properties.maxVelX,
      maxVelY: properties.maxVelY,
      playerShipHandler: this.playerShipHandler,
      posDX: properties.posDX,
      posDY: properties.posDY,
      posX: properties.posX,
      posY: properties.posY,
      shield: shieldInstance,
      terminationSequence: terminationSequenceInstance,
      velX: properties.velX,
      velY: properties.velY,
      weapons: weaponsInstances,
      width: imageResource.image.width,
      image: imageResource.image,
    });
  };

  /**
   *
   * @param shield
   * @param canvas
   * @returns {Promise<SHIELD_TYPES.type>}
   */
  #createShield = async ({shield, canvas})=>{
    return this.shieldFactory.createShield({...shield, canvas});
  }

  /**
   *
   * @param propulsion
   * @param canvas
   * @returns {Promise<*>}
   */
  #createPropulsion = async ({propulsion, canvas}) => {
    return this.propulsionFactory.createPropulsion({ ...propulsion, canvas });
  }

  /**
   *
   * @param engineTrail
   * @param canvas
   * @returns {Promise<*>}
   */
  #createEngineTrail = async({engineTrail, canvas}) => {
    return this.engineTrailFactory.createEngineTrail({...engineTrail, canvas})
  }

  /**
   *
   * @param terminationSequence
   * @param canvas
   * @returns {Promise<*>}
   */
  #createTerminationSequence = async({terminationSequence, canvas}) =>{
    return this.explosionFactory.createExplosion({ ...terminationSequence, canvas });
  }

  /**
   *
   * @param features
   * @returns {{}}
   */
  #createFeatures = ({features}) => {
    let featureInstances = {};

    for (const feature of features) {
      const [featureName, featureProps] = Object.entries(feature)[0];
      featureInstances[featureName] = {
        controlAssignment: featureProps.controlAssignment,
        type: new featureProps.type()
      };
    }
    return featureInstances;
  }

  /**
   *
   * @param weapons
   * @param canvas
   * @returns {{}}
   */
  #createWeapons = ({weapons, canvas})=>{
    let weaponsInstances = {};
    for (const weapon in weapons) {
      const weaponProperties = weapons[weapon];
      weaponsInstances[weapon] = {
        controlAssignment: weaponProperties.controlAssignment,
        units: this.weaponFactory.createWeapon({
          canvas,
          type: weaponProperties.type,
          controlAssignment: weaponProperties.controlAssignment,
          amount: weaponProperties.amount,
          posDX: weaponProperties.posDX,
          posDY: weaponProperties.posDY,
        }),
      };
    }
    return weaponsInstances;
  }
}