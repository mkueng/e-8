/**
 *
 * @param entity
 * @param deltaTime
 * @param playerShipVelX
 * @param playerShipVelY
 */
ECS.system.movement = (entity, deltaTime, playerShipVelX, playerShipVelY) => {
  const position = entity.components.position;
  const velocity = entity.components.velocity;
  const dependencies = entity.components.dependency.dependencies;

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

  for (let i = 0; i < dependencies.length; i++) {
    dependencies[i].posX = position.posX;
    dependencies[i].posY = position.posY;
  }
};