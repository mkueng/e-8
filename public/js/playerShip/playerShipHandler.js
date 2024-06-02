'use strict'

class PlayerShipHandler {

  #canvas = {};
  static activeShip = null;

  constructor(){
    this.#canvas = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.playerShip).canvas;

    this.playerShipFactory = new PlayerShipFactory({
      playerShipHandler: this
    });

    e8.global.inputHandler.subscribe(this);
  }

  shipDestroyed =(id)=>{
  }

  keyEvent = (event)=>{

    if (event === "KeyE") {
      this.playerShip3D = new PlayerShip3D(PlayerShipHandler.activeShip.posX,PlayerShipHandler.activeShip.posY );
      PlayerShipHandler.activeShip.destroy();
    }
  }

  create = async ()=>{
    PlayerShipHandler.activeShip = await this.playerShipFactory.createShip({
      shipType: PlayerShipFactory.SHIP_TYPES.classA,
      shipImageIdentifier : "initial",
      canvas : this.#canvas
    })
    //this.playerShipFactory.create3DShip();
  }
}