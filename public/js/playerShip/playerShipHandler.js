'use strict'
class PlayerShipHandler {

  #canvas = {};
  static activeShip = null;

  constructor({
    inputHandler,
    canvasHandler,
    playerShipFactory
              }){
    Object.assign(this, {
      inputHandler,
      canvasHandler,
      playerShipFactory
    });
  }

  init = async () =>{
    this.#canvas = this.canvasHandler.getCanvas(CanvasHandler.canvasTypes.playerShip).canvas;
  }

  shipDestroyed =()=>{
  }

  createShip = async ()=>{
    PlayerShipHandler.activeShip = await this.playerShipFactory.createShip({
      shipType: PlayerShipFactory_ecs.SHIP_TYPES.classA,
      shipImageIdentifier: "eagle",
      canvas: this.#canvas,
      inputHandler : this.inputHandler
    })
    PlayerShipHandler.activeShip.activate();
    //this.playerShipFactory.create3DShip();
  }

  keyEvent = (event)=>{
    if (event === "KeyE") {
      this.playerShip3D = new PlayerShip3D(PlayerShipHandler.activeShip.posX, PlayerShipHandler.activeShip.posY );
      PlayerShipHandler.activeShip.destroy();
    }
  }
}