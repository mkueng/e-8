class SpaceStationHandler {

  static imageResourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.spaceStation,
    name : "spaceStation_01",
    fileName : "spaceStation_01",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/spaceStation/"
  })

  static poi = {
    type : POIHandler.POI_TYPES.spaceStation,
    posDX: -20,
    posDY: -60,
    posX:0,
    posY:0
  }

  static imageResource;

  #galaxy;
  #resourceHandler;
  #poiHandler;

  constructor({galaxy, resourceHandler, canvasHandler, inputHandler, poiHandler}){
    this.#galaxy = galaxy;
    this.#resourceHandler = resourceHandler;
    this.#poiHandler = poiHandler;
    this.canvas = canvasHandler.getCanvas("backgroundFarthest").canvas;
    this.poiInstance = null;
    galaxy.subscribe(this);
    inputHandler.subscribe(this);
  }


  keyEvent= (event)=>{

  }

  invoke =async ()=>{
    SpaceStationHandler.imageResource = await this.#resourceHandler.fetchImageResource({
      resourceObject: SpaceStationHandler.imageResourceObject
    });
  }

  update ({planetObject}){
    this.create({planetObject}).then((spaceStation)=>{
      GameObjectsHandler.instance.addGameObject(spaceStation);
      spaceStation.addDependencies();
    });
  }

  create = async ({planetObject})=>{
    this.poiInstance = await this.#poiHandler.createPOI({poi: SpaceStationHandler.poi, canvas:this.canvas})
    return new GameObject({
      isActive: true,
      identification: "spaceStation",
      image: SpaceStationHandler.imageResource.image,
      canvas: this.canvas,
      width: SpaceStationHandler.imageResource.image.width * (planetObject.height / 1000),
      height: SpaceStationHandler.imageResource.image.height * (planetObject.height / 1000),
      posX: planetObject.posX + (planetObject.height),
      posY: planetObject.posY + planetObject.height / 2,
      velX: planetObject.velX - 0.04,
      velY: planetObject.velY,
      dependencies: [this.poiInstance],
      isHittable: false,
      isDestroyable: false

    });

  }


}