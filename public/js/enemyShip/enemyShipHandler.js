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
    this.proceduralEnemyShipFactory = new ProceduralEnemyShipFactory({
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

  init = async ({canvas}) => {
    this.#canvas = canvas || this.canvasHandler.getCanvas(CanvasHandler.canvasTypes.playerShip).canvas;
    await this.proceduralEnemyShipFactory.invoke();
  }

  /**
   *
   * @param interval
   */
  startCreation = (interval) => {

    const shipTypeNumber = Math.floor(Math.random()*2)+1;
    const shipType = ProceduralEnemyShipFactory.shipTypes["ProceduralEnemyShipType"+shipTypeNumber];


    setTimeout(()=>{
      const variationKeys = Object.keys(shipType.constructor.shipTypeVariations)
      const variation = Math.floor(Math.random() * variationKeys.length);
      this.#create({
        shipType: shipType,
        shipTypeVariation: shipType.constructor.shipTypeVariations[""+variation]
      }).then(()=>{
        this.startCreation(Math.floor(Math.random()*3000+2600))
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
    const ship = await this.proceduralEnemyShipFactory.createShip({
      shipType,
      shipTypeVariation,
      canvas: this.#canvas
    });

    ship.activate();
    EnemyShipHandler.enemyShips[ship.id] = ship;
  }
}