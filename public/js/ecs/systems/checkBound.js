/**
 * @name ECS.system.checkBounds
 * @param entity
 */
ECS.system.checkBounds = (entity) => {

  const position = entity.components.position;
  const dimension = entity.components.dimension;

  if (position.posX < - dimension.width || position.posX > e8.global.screenWidth + dimension.width ||
    position.posY < - dimension.height || position.posY > e8.global.screenHeight + dimension.height) {
    entity.destroy();
  }
}