'use strict'
class EnemyShipHandler {

  static enemyShips = {};
  #canvas;

  constructor({
    canvasHandler,
    particleGenerator,
    resourceHandler,
    propulsionFactory,
    shieldFactory,
    explosionFactory,
    weaponFactory
              }){
    //this.enemyShipWorker = new Worker('js/workers/enemyShip/enemyShipWorker.js');

    Object.assign(this, {
      canvasHandler,
      particleGenerator,
      resourceHandler,
      propulsionFactory,
      shieldFactory,
      explosionFactory,
      weaponFactory
    })
    this.enemyShipFactory = new ProceduralEnemyShipFactory({
      canvasHandler: this.canvasHandler,
      enemyShipHandler: this,
      particleGenerator: this.particleGenerator,
      resourceHandler: this.resourceHandler,
      shieldFactory: this.shieldFactory,
      propulsionFactory: this.propulsionFactory,
      explosionFactory: explosionFactory,
      weaponFactory: weaponFactory
    });
  }

  init = async () => {
    this.#canvas = this.canvasHandler.getCanvas(CanvasHandler.canvasTypes.playerShip).canvas;
    await this.enemyShipFactory.invoke();
  }

  /**
   *
   * @param interval
   */
  startCreation = (interval) => {

    setTimeout(()=>{
      const variationKeys = Object.keys(ProceduralEnemyShipType1.shipTypeVariations);
      const variation = Math.floor(Math.random() * variationKeys.length);
      this.#create({
        shipType: ProceduralEnemyShipFactory.shipTypes.EnemyShipType1,
        shipTypeVariation: ProceduralEnemyShipType1.shipTypeVariations[""+variation]
      }).then(()=>{
        this.startCreation(Math.floor(Math.random()*3000+1600))
      });
    },interval)
  }

  /**
   *
   * @param id
   */
  shipDestroyed = (id) => {
    delete EnemyShipHandler.enemyShips[id];
  }

  /**
   *
   * @param shipType
   * @param shipTypeVariation
   * @returns {Promise<void>}
   */
  #create = async ({shipType, shipTypeVariation}) => {
    const ship = await this.enemyShipFactory.createShip({
      shipType,
      shipTypeVariation,
      canvas: this.#canvas
    });

    ship.activate();
    EnemyShipHandler.enemyShips[ship.id] = ship;
  }
}