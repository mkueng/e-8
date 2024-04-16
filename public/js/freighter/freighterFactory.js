class FreighterFactory {


  static FREIGHTER_TYPES = {
    classAFreighter: ClassAFreighter
  }

  resourceHandler;

  constructor({resourceHandler,propulsionFactory, engineTrailFactory}){
    this.resourceHandler = resourceHandler;
    this.propulsionFactory = propulsionFactory;
    this.engineTrailFactory = engineTrailFactory;
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
  createFreighter =async ({freighterType, canvas, context,posX, posY }) => {
    const {
      properties,
      shield,
      propulsion,
      engineTrail
    } = freighterType

    const propulsionInstance = await this.propulsionFactory.createPropulsion({...propulsion,canvas});
    const engineTrailInstance = await this.engineTrailFactory.createEngineTrail({...engineTrail, canvas})


    return new Freighter({
      isActive: true,
      canvas: canvas,
      context: context,
      image: freighterType["resources"]["Image"]["image"],
      width: freighterType["resources"]["Image"]["image"].width,
      height: freighterType["resources"]["Image"]["image"].height,
      posX: posX,
      posY: posY,
      posDX: 0,
      posDY: 0,
      velX: properties.velX,
      velY: properties.velY,
      cargo: properties.cargo,
      dependencies: [propulsionInstance],
      engineTrail: engineTrailInstance
    })
  }
}