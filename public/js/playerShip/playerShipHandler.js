'use strict'

class PlayerShipHandler {

  #canvas = {};
  static activeShip = null;

  constructor(){}

  init = async () =>{
    this.#canvas = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.playerShip).canvas;
    this.hudHandler = new HudHandler();

    this.playerShipFactory = new PlayerShipFactory({
      playerShipHandler: this,
      hudHandler: this.hudHandler
    });


    e8.global.inputHandler.subscribe(this);
  }

  shipDestroyed =()=>{
  }

  createShip = async ()=>{
    PlayerShipHandler.activeShip = await this.playerShipFactory.createShip({
      shipType: PlayerShipFactory.SHIP_TYPES.classA,
      shipImageIdentifier: "initial",
      canvas: this.#canvas
    })
    //this.playerShipFactory.create3DShip();
  }

  keyEvent = (event)=>{
    if (event === "KeyE") {
      this.playerShip3D = new PlayerShip3D(PlayerShipHandler.activeShip.posX, PlayerShipHandler.activeShip.posY );
      PlayerShipHandler.activeShip.destroy();
    }
  }
}