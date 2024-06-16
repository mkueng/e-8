'use strict'
class EnemyShipHandler {

  static enemyShips = {};
  #canvas;

  constructor(){
    //this.enemyShipWorker = new Worker('js/workers/enemyShip/enemyShipWorker.js');
    this.enemyShipFactory = new ProceduralEnemyShipFactory({
      enemyShipHandler: this
    });
  }

  init = async () => {
    this.#canvas = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.playerShip).canvas;
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
    const shipObject = await this.enemyShipFactory.createShip({
      shipType,
      shipTypeVariation,
      canvas: this.#canvas
    });

    GameObjectsHandler.instance.addGameObject(shipObject);
    EnemyShipHandler.enemyShips[shipObject.id] = shipObject;
  }
}