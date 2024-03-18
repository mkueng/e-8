class FreighterFactory {


  static FREIGHTER_TYPES = {
    classAFreighter: ClassAFreighter
  }

  resourceHandler;

  constructor({resourceHandler}){
    this.resourceHandler = resourceHandler
  }

  invoke = async ()=>{
    await FreighterFactory.FREIGHTER_TYPES.classAFreighter.invoke({resourceHandler:this.resourceHandler});
  }

  /**
   *
   * @param freighterType
   * @param canvas
   * @param context
   * @param posX
   * @param posY
   * @returns {Freighter}
   */
  createFreighter = ({freighterType, canvas, context,posX, posY }) => {
    const {
      properties,
      shield
    } = freighterType

    return new Freighter({
      isActive: true,
      canvas: canvas,
      context: context,
      image: freighterType["resources"]["Image"]["image"],
      width: freighterType["resources"]["Image"]["image"].width,
      height: freighterType["resources"]["Image"]["image"].height,
      posX: posX,
      posY: posY,
      velX: properties.velX,
      velY: properties.velY,
      cargo: properties.cargo
    })
  }
}