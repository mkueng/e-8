class MovementSystem extends System {
  constructor() {
    super(['position', 'velocity']);
  }

  update(entities, deltaTime, playerShipVelX, playerShipVelY) {
    //const matches = this.getMatchingEntities(entities);

    for (const entity of entities) {
      const { position, velocity, bounds} = entity.components;

      const zScale = position.posZ > 0 ? 100 / position.posZ : 1;

      if (ECS.component.input.keys["ArrowRight"] === true ) {
        velocity.accelerationX += 0.001;
      }

      if (ECS.component.input.keys["ArrowLeft"] === true) {
        velocity.accelerationX -= 0.001;
      }

      https://chatgpt.com/share/68a219b3-d324-800b-af05-d8879e98cc2e

      velocity.velX += velocity.accelerationX;
      velocity.velY += velocity.accelerationY;

      const viewPortVelX = velocity.hasMass
        ? (playerShipVelX + velocity.velX) * velocity.vector * zScale * deltaTime
        : velocity.velX * velocity.vector;

      position.posX += viewPortVelX;

      if (!position.posYisFixed) {
        position.posY += playerShipVelY * zScale * 0.1 * velocity.vector;
      }

      /*
      if (entity.components.dependency) {
        for (const dep of entity.components.dependency.dependencies) {
          dep.posX = position.posX;
          dep.posY = position.posY;
        }


      }*/
    }
  }
}