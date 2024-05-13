class PoiFactory {



  static imageResource;

  constructor({resourceHandler}){
    this.resourceHandler = resourceHandler;
  }

  invoke = async (imageResourceObject)=>{
    PoiFactory.imageResource = await this.resourceHandler.fetchImageResource({
      resourceObject: imageResourceObject
    });
  }

  createPOI =({

                posDX,
                posDY,
                canvas
  })=> {
    return new Poi({
      identification : "POI",
      image:  PoiFactory.imageResource.image,
      width:  PoiFactory.imageResource.image.width,
      height:  PoiFactory.imageResource.image.height,
      posX : 0,
      posY : 0,
      posDX : posDX,
      posDY : posDY,
      canvas: canvas,
      dependencies: []
    })
  }
}