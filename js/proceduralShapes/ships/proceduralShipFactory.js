'use strict'

class ProceduralShipFactory {

  //singleton
  static instance = new this();

  invoke(){}

  createShip = (type)=> {
    let ship;

    switch(type){
      case "enemy" : {
        ship = new ProceduralEnemyShipImage().create();
        break;
      }
      case "player" : {
        ship = new ProceduralPlayerShipImage();
        break;
      }
      default : throw new Error("shipType not available")
    }
    return ship;
  }
}