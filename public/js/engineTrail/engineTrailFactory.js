'use strict'
class EngineTrailFactory {

  /**
   *
   * @type {{engineTrailB: EngineTrailB, engineTrailA: EngineTrailA}}
   */
  static ENGINE_TRAIL_TYPES = {
    engineTrailA: EngineTrailA,
    engineTrailB: EngineTrailB
  }

  constructor() {
  }

  /**
   *
   * @param type
   * @param canvas
   * @param posDX
   * @param posDY
   * @returns {Promise<*>}
   */
  createEngineTrail = async ({type, canvas, posDX, posDY}) => {
    const trailType = new type();
    await trailType.invoke(e8.global.resourceHandler, type.resourceObject);
    Object.assign(trailType, {canvas, posDX, posDY});
    return trailType;
  }
}