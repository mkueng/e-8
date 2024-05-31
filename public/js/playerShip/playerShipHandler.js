'use strict'

class PlayerShipHandler {

  #canvas = {};
  static activeShip = null;

  constructor(){
    this.#canvas = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.playerShip).canvas;

    this.playerShipFactory = new PlayerShipFactory({
      playerShipHandler: this,
      resourceHandler : e8.global.resourceHandler,
      canvasHandler: e8.global.canvasHandler,
      inputHandler: e8.global.inputHandler,
      hudHandler: e8.global.hudHandler,
      propulsionFactory: e8.global.propulsionFactory,
      weaponsFactory: e8.global.weaponFactory,
      shieldFactory: e8.global.shieldFactory,
      explosionFactory: e8.global.explosionFactory,
      fuelFactory: e8.global.fuelFactory,
      engineTrailFactory: e8.global.engineTrailFactory,
      weaponFactory: e8.global.weaponFactory

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