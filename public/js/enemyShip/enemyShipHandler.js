'use strict'

class EnemyShipHandler {

  #enemyShips = {};

  constructor({canvasHandler, resourceHandler}){
    this.canvasHandler = canvasHandler;
    this.resourceHandler = resourceHandler;

    this.enemyShipFactory = new EnemyShipFactory({
      enemyShipHandler: this,
      resourceHandler,
      canvasHandler
    });
  }

  invoke = async ()=> {
    const canvas = this.canvasHandler.getCanvas("backgroundFront").canvas;
    await this.enemyShipFactory.invoke(canvas);
  }

  startCreation = ()=>{
    let interval = Math.floor(Math.random()*3000);

    setTimeout(()=>{
      this.#create().then(()=>{
        this.startCreation()
      });

    },interval)
  }

  shipDestroyed = (id)=>{
    delete this.#enemyShips[id];
  }

  #create = async ()=>{
    const shipObject = await this.enemyShipFactory.createShip(EnemyShipFactory.SHIP_TYPE.classB);
    GameObjectsHandler.instance.addGameObject(shipObject);
    this.#enemyShips[shipObject.id] = shipObject;
    //console.log("enemyShips: ", this.#enemyShips);
  }
}