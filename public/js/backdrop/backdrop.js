'use strict'
class Backdrop {

  #canvas;
  #context;
  #imageResource;

  #resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.backdrop,
    name : "backdrop_03",
    fileName : "backdrop_03",
    fileType : ResourceObject.TYPES.jpg,
    resourcePath : "/resources/backdrops/"
  })

  constructor({
                resourceHandler,
                canvasHandler
  }){
    e8.init.subscribeForGlobalEvents(this);
    this.#canvas = canvasHandler.getCanvas("backdrop").canvas;
    this.#context = this.#canvas.getContext("2d");
    resourceHandler.fetchImageResource({
      resourceObject: this.#resourceObject
    }).then((resource)=>{
      this.#imageResource = resource;
      this.#context.drawImage(resource.image,0,0,e8.global.screenWidth,e8.global.screenHeight);
    })
  }

  updateFromGlobalEvent = ({message, payload}) => {
    if (message === e8.globalEvents.screenResized) {
      this.#context.drawImage(this.#imageResource.image,0,0,e8.global.screenWidth,e8.global.screenHeight);
    }
  }
}