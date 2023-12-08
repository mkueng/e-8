class EngineTrailFactory {
  static instance = new this();

  static imageResource

  invoke = async({posDX, posDY})=>{
    EngineTrailFactory.imageResource = await ResourceHandler.instance.fetchResource(EngineTrailA.resourceObject);
    this.posDX = posDX;
    this.posDY = posDY
    return this;
  }

  create = (posX, posY)=>{
    let engineTrail = new EngineTrailA({
      image : EngineTrailFactory.imageResource.image,
      canvas :  CanvasHandler.instance.getCanvas("weapons").canvas,
      width : 5,
      height : 7,
      posX : posX,
      posY : posY,
      posDX : this.posDX,
      posDY : this.posDY
    })

    GameObjectsHandler.instance.addGameObject(engineTrail);
  }
}