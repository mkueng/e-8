'use strict'

/**
 * singleton
 */
class EnemyShipHandler {

  static instance = new this();
  static enemyShips = {};

  invoke = async ()=> {
    const canvas = CanvasHandler.instance.getCanvas(CanvasHandler.CANVASTYPES.playerShip).canvas;
    await EnemyShipFactory.instance.invoke(canvas);
  }

  startCreation = ()=>{
    let interval = Math.floor(Math.random()*3000);

    setTimeout(()=>{
      this.create(). then(()=>{
        this.startCreation()
      });

    },interval)

  }

  delete = (id)=>{
    delete EnemyShipHandler.enemyShips[id];
    //console.log(  EnemyShipHandler.enemyShips);
  }

  create = async ()=>{
    const shipObject = await EnemyShipFactory.instance.createShip(EnemyShipFactory.SHIP_TYPE.classB);
    GameObjectsHandler.instance.addGameObject(shipObject);

    EnemyShipHandler.enemyShips[shipObject.id] = shipObject;
    //console.log(  EnemyShipHandler.enemyShips);
  }
}