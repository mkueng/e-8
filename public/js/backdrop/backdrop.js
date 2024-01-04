'use strict'

class Backdrop {

  #canvas
  #context

  #resourceObject = new ResourceObject({
    category : ResourceObject.CATEGORIES.backdrop,
    id : "backdrop_01",
    filename : "backdrop_01",
    type : ResourceObject.TYPES.jpg,
    resourcePath : "/resources/backdrops/backdrop_03.jpg"
  })

  constructor({resourceHandler, canvasHandler}){
    this.#canvas = canvasHandler.getCanvas("backdrop").canvas;
    this.#context = this.#canvas.getContext("2d");
    resourceHandler.fetchImageResource({
      resourceObject: this.#resourceObject
    }).then((resource)=>{
      this.#context.drawImage(resource.image,0,0,window.global.screenWidth,window.global.screenHeight);
    })
  }
}