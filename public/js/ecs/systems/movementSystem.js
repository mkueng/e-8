class MovementSystem extends System {
  constructor() {
    super(['position', 'velocity']);
  }

  update(entities, deltaTime, playerShipVelX, playerShipVelY) {
    //const matches = this.getMatchingEntities(entities);

    for (const entity of entities) {
      const { position, velocity } = entity.components;

      const zScale = position.posZ > 0 ? 100 / position.posZ : 1;
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