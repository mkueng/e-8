'use strict'
class EngineTrailFactory {

  static ENGINE_TRAIL_TYPES = {
    engineTrailA: EngineTrailA,
    engineTrailB: EngineTrailB
  }

  constructor() {
  }

  createEngineTrail = async ({type, canvas, posDX, posDY}) => {
    const trailType = new type();
    await trailType.invoke(e8.global.resourceHandler, type.resourceObject);
    Object.assign(trailType, {canvas, posDX, posDY});
    return trailType;
  }
}