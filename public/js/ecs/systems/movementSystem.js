class MovementSystem extends System {
  constructor(playerEntity) {
    super(['position', 'velocity']);
    this.playerEntity = playerEntity;
  }

  update(entities, deltaTime) {
    //const matches = this.getMatchingEntities(entities);

    for (const entity of entities) {
      const { position, velocity, bounds} = entity.components;

      const playerVelocity = this.playerEntity.components.velocity;
      const zScale = position.posZ > 0 ? 100 / position.posZ : 1;
      
      velocity.velX += velocity.accelerationX;
      velocity.velY += velocity.accelerationY;

      velocity.viewPortVelX = velocity.hasMass
        ? (playerVelocity.velX + velocity.velX) * velocity.vector * zScale * deltaTime
        : velocity.velX * velocity.vector;

      position.posX += velocity.viewPortVelX;

      if (!position.posYisFixed) {
        position.posY += playerVelocity.velY * zScale * 0.1 * velocity.vector;
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