class FreighterFactory {


  static FREIGHTER_TYPES = {
    classAFreighter: ClassAFreighter,
    classBFreighter: ClassBFreighter
  }

  resourceHandler;

  constructor({resourceHandler,propulsionFactory, engineTrailFactory}){
    this.resourceHandler = resourceHandler;
    this.propulsionFactory = propulsionFactory;
    this.engineTrailFactory = engineTrailFactory;
  }

  invoke = async ()=>{
    await FreighterFactory.FREIGHTER_TYPES.classAFreighter.invoke({resourceHandler:this.resourceHandler});
    await FreighterFactory.FREIGHTER_TYPES.classBFreighter.invoke({resourceHandler:this.resourceHandler});
  }

  /**
   *
   * @param freighterType
   * @param canvas
   * @param context
   * @param posX
   * @param posY
   * @param posZ
   * @returns {Promise<Freighter>}
   */
  createFreighter =async ({freighterType, canvas, context,posX, posY, posZ}) => {
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
      width: properties.width || freighterType["resources"]["Image"]["image"].width,
      height: properties.height || freighterType["resources"]["Image"]["image"].height,
      posX: posX,
      posY: posY,
      posZ: posZ,
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