'use strict'
class EngineTrailFactory {

  static ENGINE_TRAIL_TYPES = {
    engineTrailA: EngineTrailA,
    engineTrailB: EngineTrailB
  }

  constructor() {
    this.resourceHandler = e8.global.resourceHandler;
  }

  createEngineTrail = async ({type, canvas, posDX, posDY}) => {
    const trailType = new type();
    await trailType.invoke(this.resourceHandler, type.resourceObject);
    Object.assign(trailType, {canvas, posDX, posDY});
    return trailType;
  }
}