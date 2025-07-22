/**
 *
 * @param entity
 * @param interpolation
 */
ECS.system.renderImage = (entity, interpolation) => {
  const interpolatedX = (entity.previousPosX + (entity.posX - entity.previousPosX) * interpolation) + entity.posDX;
  const interpolatedY = (entity.previousPosY + (entity.posY - entity.previousPosY) * interpolation) + entity.posDY;

  entity.previousPosX = entity.posX;
  entity.previousPosY = entity.posY;

  if (entity.isActive === false) return;

  const newAlpha = entity.alpha || 1;

  if (entity.context.globalAlpha !== newAlpha) {
    entity.context.globalAlpha = newAlpha;
  }

  entity.context.drawImage(
    entity.image,
    interpolatedX,
    interpolatedY,
    entity.width,
    entity.height
  );

  if (newAlpha !== 1) {
    entity.context.globalAlpha = 1;
  }
}

/**
 *
 * @param entity
 * @param interpolation
 */
ECS.system.renderSpriteSheet = (entity, interpolation) => {
  const interpolatedX = (entity.previousPosX + (entity.posX - entity.previousPosX) * interpolation) + entity.posDX;
  const interpolatedY = (entity.previousPosY + (entity.posY - entity.previousPosY) * interpolation) + entity.posDY;

  entity.previousPosX = entity.posX;
  entity.previousPosY = entity.posY;

  if (entity.isActive === false) return;

  const newAlpha = entity.alpha || 1;
  if (entity.context.globalAlpha !== newAlpha) {
    entity.context.globalAlpha = newAlpha;
  }

  if (entity.spriteSheet) {
    if (entity.animationLoop || entity.currentFrame + 1 < entity.frames) {
      entity.currentFrame = (entity.currentFrame + 1) % entity.frames;
    } else {
      if (entity.currentFrame < entity.frames - 1) {
        entity.currentFrame += 1;
      } else {
        entity.currentFrame = 0;
        entity.isActive = false;
      }
    }

    const column = entity.currentFrame % entity.spriteSheetColumns;
    const row = Math.floor(entity.currentFrame / entity.spriteSheetColumns);
    const sourceX = column * entity.strideX;
    const sourceY = row * entity.strideY;

    entity.context.drawImage(
      entity.spriteSheet,
      sourceX,
      sourceY,
      entity.strideX,
      entity.strideY,
      interpolatedX,
      interpolatedY,
      entity.width,
      entity.height
    );

    // Image
  }

  if (newAlpha !== 1) {
    entity.context.globalAlpha = 1;
  }
}