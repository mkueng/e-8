'use strict'

class PlayerShipFactory_ecs {
  static SHIP_TYPES = {
    classA: PlayerShipPropertiesClassA,
    classB: PlayerShipPropertiesClassB
  }

  constructor({
                resourceHandler,
                canvasHandler
  }) {
    Object.assign(this, {
      resourceHandler,
      canvasHandler
    })
  }

  async init(){

  }

  /**
   *
   * @param shipType
   * @param shipImageIdentifier
   * @param canvas
   * @returns {Promise<*>}
   */
  async createShip ({
                        shipType,
                        shipImageIdentifier,
                        canvas
  }){

    const imageResource = await this.resourceHandler.fetchImageResource({resourceObject: shipType["imageResourceObjects"][shipImageIdentifier]});

    const ship = ECS.entityFactory({
      position: ECS.componentFactory('position', ECS.component.position),
      velocity: ECS.componentFactory('velocity', ECS.component.velocity),
      image: ECS.componentFactory('image', ECS.component.image),
      collision: ECS.componentFactory('collision', ECS.component.collision),
      hitBox: ECS.componentFactory('hitBox', ECS.component.hitBox)
    })

    ship.components.image.image = imageResource;
    ship.components.image.width = imageResource.image.width;
    ship.components.image.height = imageResource.image.height;
    ship.components.image.alpha = 1;
    ship.components.image.canvas = canvas;
    ship.components.image.context = canvas.context;

    ship.components.position.posX = 100;
    ship.components.position.posY = 700;
    ship.components.position.previousPosX = ship.components.position.posX;
    ship.components.position.previousPosY = ship.components.position.posY;
    ship.components.position.posZ = 1;

    ship.isActive = false;

    return ship;
  }
}