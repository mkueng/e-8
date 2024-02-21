'use strict'
class EngineTrailFactory {

  static ENGINE_TRAIL_TYPES = {
    engineTrailA: EngineTrailA
  }

  constructor({
                resourceHandler
              }) {
    this.resourceHandler = resourceHandler;
  }

  createEngineTrail = async({
    type, canvas, posDX, posDY
  })=> {
    const invokeEngineTrail = async (type) => {
      await type.invoke(this.resourceHandler);
      return new type({
        canvas,
        posDX,
        posDY
      })
    }

    return invokeEngineTrail(type);

  }
}