'use strict'

class EnemyShipHandler {

  static enemyShips = {};

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

  startCreation = (interval)=>{


    setTimeout(()=>{
      this.#create(Math.floor(Math.random()*3)).then(()=>{
        this.startCreation(Math.floor(Math.random()*1000+1000))
      });

    },interval)
  }

  shipDestroyed = (id)=>{
    delete EnemyShipHandler.enemyShips[id];
  }

  #create = async (type)=>{
    const shipObject = await this.enemyShipFactory.createShip(EnemyShipFactory.SHIP_TYPE[""+type]);
    GameObjectsHandler.instance.addGameObject(shipObject);
    EnemyShipHandler.enemyShips[shipObject.id] = shipObject;
  }
}