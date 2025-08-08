class FactoryHandler {

  #factoryTypes = null;
  #factories = {};

  constructor({
    resourceHandler,
    canvasHandler
              }){
    Object.assign(this, {
      resourceHandler,
      canvasHandler
    });


    this.#factoryTypes = {
      playerShipFactory: PlayerShipFactory_ecs,
      //propulsion : PropulsionFactory_ecs,
      //enemyShip: EnemyShipFactory_ecs,
      weaponFactory: WeaponFactory_ecs,
      explosionFactory: ExplosionFactory_ecs
    }
  }

  init = async () => {
    // Initialize the factory handler and create factories
    await this.createFactories();
    await this.initFactories();
  }

  getFactory = (type) => {
    if (this.#factories[type]) {
      return this.#factories[type];
    } else {
      throw new Error(`Factory of type ${type} does not exist.`);
    }
  }

  createFactories = async () => {
    // Create factories for each type
    for (const [key, FactoryClass] of Object.entries(this.#factoryTypes)) {
      this.#factories[key] = new FactoryClass({
        resourceHandler: this.resourceHandler,
        canvasHandler: this.canvasHandler
      });
      if (typeof this.#factories[key].init === 'function') {
        await this.#factories[key].init();
      }
    }
  }

  initFactories = async () => {
    // Initialize all factories
    for (const factory of Object.values(this.#factories)) {
      await factory.init();
    }
  }
}