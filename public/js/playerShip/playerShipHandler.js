'use strict'

class PlayerShipHandler {

  #canvas = {};
  static activeShip = null;

  constructor({
                canvasHandler,
                resourceHandler,
                inputHandler,
                hudHandler,
                propulsionFactory,
                weaponsFactory,
                shieldFactory,
                explosionFactory,
                fuelFactory,
                engineTrailFactory,
                weaponFactory

  }){
    this.#canvas = canvasHandler.getCanvas(CanvasHandler.canvasTypes.playerShip).canvas;

    this.playerShipFactory = new PlayerShipFactory({
      playerShipHandler: this,
      resourceHandler,
      canvasHandler,
      inputHandler,
      hudHandler,
      propulsionFactory,
      weaponsFactory,
      shieldFactory,
      explosionFactory,
      fuelFactory,
      engineTrailFactory,
      weaponFactory

    });

    inputHandler.subscribe(this);
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