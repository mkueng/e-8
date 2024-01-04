class SpaceStationHandler {

  static imageResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.spaceStation,
    id : "spaceStation_01",
    filename : "spaceStation_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/spaceStation/spaceStation_02.png"
  })

  static poi = {
    type : PoiFactory.POI_TYPES.spaceStation,
    posDX: -110,
    posDY: -120
  }

  static imageResource;

  #galaxy;
  #resourceHandler;

  constructor({galaxy, resourceHandler, canvasHandler}){
    this.#galaxy = galaxy;
    this.#resourceHandler = resourceHandler;
    this.canvas = canvasHandler.getCanvas("backgroundFarthest").canvas;
    this.poiFactory = new PoiFactory({resourceHandler});
    this.poiInstance = null;
    galaxy.subscribe(this)

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
      identification : "spaceStation",
      image: SpaceStationHandler.imageResource.image,
      canvas: this.canvas,
      width : SpaceStationHandler.imageResource.image.width*(planetObject.height/3000),
      height: SpaceStationHandler.imageResource.image.height*(planetObject.height/3000),
      posX: planetObject.posX+(planetObject.height*2),
      posY: planetObject.posY+planetObject.height/2,
      velX: planetObject.velX,
      velY: planetObject.velY,
      dependencies : [this.poiInstance],
      isHittable : false,
      isDestroyable : false

    })

    GameObjectsHandler.instance.addGameObject(spaceStationObject);
  }


}