'use strict'
class EnemyShipHandler {

  static enemyShips = {};
  #canvas;

  constructor({canvasHandler, resourceHandler, particleGenerator, utilityWorker}){
    this.canvasHandler = canvasHandler;
    this.resourceHandler = resourceHandler;
    this.enemyShipWorker = new Worker('js/workers/enemyShip/enemyShipWorker.js');

    this.enemyShipFactory = new EnemyShipFactory({
      enemyShipHandler: this,
      resourceHandler,
      canvasHandler,
      particleGenerator,
      enemyShipWorker: this.enemyShipWorker
    });
  }

  invoke = async () => {
    this.#canvas = this.canvasHandler.getCanvas(CanvasHandler.canvasTypes.playerShip).canvas;
    await this.enemyShipFactory.invoke();
  }

  /**
   *
   * @param interval
   */
  startCreation = (interval) => {

    setTimeout(()=>{
      const variation = Math.floor(Math.random()*Object.entries(EnemyShipType1.shipTypeVariations).length);
      this.#create(EnemyShipFactory.shipTypes.EnemyShipType1, EnemyShipType1.shipTypeVariations[""+variation]).then(()=>{
        this.startCreation(Math.floor(Math.random()*1000+1000))
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
   * @param type
   * @param variation
   * @returns {Promise<void>}
   */
  #create = async (type, variation) => {
    const shipObject = await this.enemyShipFactory.createShip({
      type: type,
      typeVariation: variation,
      canvas: this.#canvas
    });

    GameObjectsHandler.instance.addGameObject(shipObject);
    EnemyShipHandler.enemyShips[shipObject.id] = shipObject;
  }
}