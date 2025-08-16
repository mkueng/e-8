class RenderSystem extends System{
  constructor() {
    super(['entity', 'interpolation']);
  }

  render = (entities, interpolation) =>{
    for (const entity of entities) {
      const components = entity.components;
      const image = components.image;
      const position = components.position;

      const interpolatedX = (position.previousPosX + (position.posX - position.previousPosX) * interpolation) + position.posDX;
      const interpolatedY = (position.previousPosY + (position.posY - position.previousPosY) * interpolation) + position.posDY;

      position.previousPosX = position.posX;
      position.previousPosY = position.posY;

      const newAlpha = image.alpha || 1;

      if (image.context.globalAlpha !== newAlpha) {
        image.context.globalAlpha = newAlpha;
      }

      image.context.drawImage(
        image.image.image,
        interpolatedX,
        interpolatedY,
        image.width,
        image.height,
      )
      if (newAlpha !== 1) {
        image.context.globalAlpha = 1;
      }
    }
  }


}