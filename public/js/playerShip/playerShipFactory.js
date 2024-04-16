'use strict'

class PlayerShipFactory {

  static SHIP_TYPES = {
    classA : PlayerShipPropertiesClassA,
    classB : PlayerShipPropertiesClassB
  }

  /**
   *
   * @param playerShipHandler
   * @param resourceHandler
   * @param canvasHandler
   * @param inputHandler
   * @param hudHandler
   * @param propulsionFactory
   * @param weaponFactory
   * @param shieldFactory
   * @param explosionFactory
   * @param fuelFactory
   * @param engineTrailFactory
   */
  constructor({
                playerShipHandler,
                resourceHandler,
                inputHandler,
                hudHandler,
                propulsionFactory,
                weaponFactory,
                shieldFactory,
                explosionFactory,
                fuelFactory,
                engineTrailFactory

  }){

    Object.assign(this,{
      playerShipHandler,
      resourceHandler,
      inputHandler,
      hudHandler,
      engineTrailFactory,
      weaponFactory,
      propulsionFactory,
      fuelFactory,
      shieldFactory,
      explosionFactory
    })
  }

  create3DShip = ()=>{
    return new PlayerShip3D()
  }


  /**
   *
   * @param shipType {PlayerShipFactory.SHIP_TYPES}
   * @param canvass  w
   * @returns {Promise<PlayerShip>}
   */
  createShip = async ({ shipType, shipImageIdentifier, canvas }) => {
    const {
      engineTrail,
      propulsion,
      fuel,
      shield,
      terminationSequence,
      weapons,
      features,
      generic,
      cargo
    } = shipType;

    const imageResource = await this.resourceHandler.fetchImageResource({resourceObject: shipType["imageResourceObjects"][shipImageIdentifier]});
    const engineTrailInstance = await this.#createEngineTrail({engineTrail, canvas})
    const propulsionInstance = await this.#createPropulsion({propulsion, canvas});
    const shieldInstance = await this.#createShield({shield, canvas});
    const terminationSequenceInstance = await this.#createTerminationSequence({terminationSequence, canvas})
    const featureInstances = this.#createFeatures({features, canvas});
    const weaponsInstances = this.#createWeapons({weapons, canvas});
    const fuelInstance = this.#createFuel({fuel});

    return new PlayerShip({
      accX: generic.accX,
      accY: generic.accY,
      canvas,
      propulsion: propulsionInstance,
      fuel: fuelInstance,
      fuelConsumption : 1 / (fuelInstance.energyDensity * propulsionInstance.efficiency),
      dependencies: [propulsionInstance],
      engineTrail : engineTrailInstance,
      features: featureInstances,
      cargo: cargo,
      height: imageResource.image.height,
      hudHandler: this.hudHandler,
      inputHandler: this.inputHandler,
      maxVelX: generic.maxVelX,
      maxVelY: generic.maxVelY,
      playerShipHandler: this.playerShipHandler,
      posDX: 0,
      posDY: 0,
      posX: 100,
      posY: e8.global.screenHeight / 2,
      shield: shieldInstance,
      terminationSequence: terminationSequenceInstance,
      velX: 0,
      velY: 0,
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
   * @param canvas
   * @returns {{}}
   */
  #createFeatures = ({features, canvas}) => {
    let featureInstances = {};

    for (const feature of features) {
      const [featureName, featureProps] = Object.entries(feature)[0];
      featureInstances[featureName] = {
        controlAssignment: featureProps.controlAssignment,
        type: new featureProps.type({canvas:canvas})
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

  /**
   *
   * @param fuel
   * @returns {*}
   */
  #createFuel = ({fuel}) => {
    return this.fuelFactory.createFuel({fuelType: fuel.type, amount: fuel.amount, maximumAmount: fuel.max});
  }
}