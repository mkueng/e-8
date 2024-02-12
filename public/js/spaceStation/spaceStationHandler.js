class SpaceStationHandler {

  static imageResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.spaceStation,
    name : "spaceStation_01",
    fileName : "spaceStation_01",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/spaceStation/"
  })

  static poi = {
    type : PoiFactory.POI_TYPES.spaceStation,
    posDX: -110,
    posDY: -120
  }

  static imageResource;

  #galaxy;
  #resourceHandler;

  constructor({galaxy, resourceHandler, canvasHandler, inputHandler}){
    this.#galaxy = galaxy;
    this.#resourceHandler = resourceHandler;
    this.canvas = canvasHandler.getCanvas("backgroundFarthest").canvas;
    this.poiFactory = new PoiFactory({resourceHandler});
    this.poiInstance = null;
    galaxy.subscribe(this)
    inputHandler.subscribe(this)

  }

  keyEvent= (event)=>{

  }

  invoke =async ()=>{
    SpaceStationHandler.imageResource = await this.#resourceHandler.fetchImageResource({
      resourceObject: SpaceStationHandler.imageResourceObject
    });
    await this.poiFactory.invoke(SpaceStationHandler.poi.type.imageResourceObject)
  }

  update =({planetObject})=>{
    this.poiInstance = this.poiFactory.createPOI({...SpaceStationHandler.poi, canvas:this.canvas})
    let spaceStationObject = new GameObject({
      isActive: true,
      identification : "spaceStation",
      image: SpaceStationHandler.imageResource.image,
      canvas: this.canvas,
      width : SpaceStationHandler.imageResource.image.width*(planetObject.height/5000),
      height: SpaceStationHandler.imageResource.image.height*(planetObject.height/5000),
      posX: planetObject.posX+(planetObject.height),
      posY: planetObject.posY+planetObject.height/2,
      velX: planetObject.velX-0.04,
      velY: planetObject.velY,
      dependencies : [this.poiInstance],
      isHittable : false,
      isDestroyable : false

    })

    GameObjectsHandler.instance.addGameObject(spaceStationObject);
  }


}