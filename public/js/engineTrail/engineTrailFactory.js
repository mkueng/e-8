class EngineTrailFactory {

  static imageResource

  constructor({
    canvasHandler,
    resourceHandler
              }){
    this.canvasHandler = canvasHandler;
    this.resourceHandler = resourceHandler;
  }

  invoke = async({posDX, posDY})=>{
    EngineTrailFactory.imageResource = await this.resourceHandler.fetchResource(EngineTrailA.resourceObject);
    this.posDX = posDX;
    this.posDY = posDY
  }

  create = (posX, posY)=>{
    let engineTrail = new EngineTrailA({
      image : EngineTrailFactory.imageResource.image,
      canvas :  this.canvasHandler.getCanvas("weapons").canvas,
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