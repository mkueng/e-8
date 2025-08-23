class PlayerShipControlSystem {

  constructor() {
  }

  update (entities) {

    const entity = entities[0];

    const { position, velocity, bounds, input } = entity.components;

    if (input.keys["ArrowRight"] === true ) {
      velocity.accelerationX += 0.001;

    }

    if (input.keys["ArrowLeft"] === true) {
      velocity.accelerationX -= 0.001;
    }
  }

}