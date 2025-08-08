/**
 *
 * @param entity
 * @param interpolation
 */
ECS.system.renderImage = (entity, interpolation) => {
  if (entity.isActive === false) return;

  const { position, image } = entity.components;
  const { previousPosX, previousPosY, posX, posY, posDX = 0, posDY = 0 } = position;
  const { context, image: img, width, height, alpha = 1 } = image;

  const interpolatedX = (previousPosX + (posX - previousPosX) * interpolation) + posDX;
  const interpolatedY = (previousPosY + (posY - previousPosY) * interpolation) + posDY;

  if (context.globalAlpha !== alpha) {
    context.globalAlpha = alpha;
  }

  context.drawImage(img, interpolatedX, interpolatedY, width, height);

  if (alpha !== 1) {
    context.globalAlpha = 1;
  }
};


ECS.system.renderAllImages = (entities, interpolation) => {
  // Group by rendering context if needed (e.g. multiple canvases)
  // For simplicity, this assumes all entities use the same context
  if (entities.length === 0) return;

  const context = entities[0].components.image.context; // Assuming same context
  let currentAlpha = 1;

  for (const entity of entities) {
    if (!entity.isActive) continue;

    const { position, image } = entity.components;
    const {
      previousPosX, previousPosY,
      posX, posY,
      posDX = 0, posDY = 0
    } = position;

    const {
      image: img,
      width,
      height,
      alpha = 1
    } = image;

    // Interpolated position
    const interpolatedX = (previousPosX + (posX - previousPosX) * interpolation) + posDX;
    const interpolatedY = (previousPosY + (posY - previousPosY) * interpolation) + posDY;

    // Avoid redundant globalAlpha state changes
    if (currentAlpha !== alpha) {
      context.globalAlpha = alpha;
      currentAlpha = alpha;
    }

    context.drawImage(img, interpolatedX, interpolatedY, width, height);
  }

  // Reset globalAlpha after rendering
  if (currentAlpha !== 1) {
    context.globalAlpha = 1;
  }
};



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