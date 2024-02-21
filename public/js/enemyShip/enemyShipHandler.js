'use strict'
class EnemyShipHandler {

  static enemyShips = {};
  #canvas;


  constructor({canvasHandler, resourceHandler, particleGenerator}){
    this.canvasHandler = canvasHandler;
    this.resourceHandler = resourceHandler;
    this.enemyShipWorker = new Worker('js/workers/enemyShip/enemyShipWorker.js');

    this.enemyShipFactory = new ProceduralEnemyShipFactory({
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
      const variationKeys = Object.keys(ProceduralEnemyShipType1.shipTypeVariations);
      const variation = Math.floor(Math.random() * variationKeys.length);
      this.#create({
        shipType: ProceduralEnemyShipFactory.shipTypes.EnemyShipType1,
        shipTypeVariation: ProceduralEnemyShipType1.shipTypeVariations[""+variation]
      }).then(()=>{
        this.startCreation(Math.floor(Math.random()*10000+1000))
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
  #create = async ({shipType, shipTypeVariation}) => {
    const shipObject = await this.enemyShipFactory.createShip({
      shipType,
      shipTypeVariation,
      canvas: this.#canvas
    });

    GameObjectsHandler.instance.addGameObject(shipObject);
    EnemyShipHandler.enemyShips[shipObject.id] = shipObject;


  }
}