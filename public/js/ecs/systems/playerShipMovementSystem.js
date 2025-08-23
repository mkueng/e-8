class PlayerShipMovementSystem extends System {
  constructor(playerEntity) {
    super(['position', 'velocity']);
    this.playerEntity = playerEntity;
  }

  update(entities, deltaTime) {
    //const matches = this.getMatchingEntities(entities);

    const entity = entities[0];
    const { position, velocity, bounds} = entity.components;

    velocity.velX = velocity.accelerationX*deltaTime;
    velocity.velY = velocity.accelerationY*deltaTime;

    velocity.viewportVelX += velocity.accelerationX*deltaTime;

    position.posX += velocity.viewPortVelX;
    position.posY += velocity.velY;


      /*
      if (entity.components.dependency) {
        for (const dep of entity.components.dependency.dependencies) {
          dep.posX = position.posX;
          dep.posY = position.posY;
        }


      }*/
    }

}