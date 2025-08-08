ECS.system.update = (entity, deltaTime) => {
  const { position, velocity } = entity.components;

  const z = position.posZ;
  const zScale = z > 0 ? 100 / z : 1;

  // Accelerate velocity
  velocity.velX += velocity.accelerationX;
  velocity.velY += velocity.accY;

  // Calculate effective velocity based on mass and zScale
  const vector = velocity.vector;
  const velX = velocity.hasMass
    ? (PlayerShip.velX + velocity.velX) * vector * zScale * deltaTime
    : velocity.velX * vector;

  position.posX += velX;

  // Apply vertical movement only if posY is not fixed
  if (!position.posYisFixed) {
    position.posY += PlayerShip.velY * zScale * 0.1 * vector;
  }
};


function updateAllSystems(deltaTime, interpolation, playerShipVelX, playerShipVelY) {
  for (const systemName in ECS.system) {
    const system = ECS.system[systemName];
    const group = ECS.groups[systemName];

    if (!system || !group || typeof system.update !== 'function') continue;

    // Call system update with the pre-filtered group
    if (systemName === "movement") {
      system.update(group, deltaTime, playerShipVelX, playerShipVelY);
    } else if (systemName === "renderImage" || systemName === "renderSpriteSheet") {
      system.update(group, interpolation);
    } else {
      system.update(group, deltaTime);
    }
  }
}