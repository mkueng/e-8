class CanvasHandler {


  static #offScreenCanvases = {
    "backgroundFar": {
      "id": "backgroundFar",
      "context" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 1
    },
    "backgroundMiddle": {
      "id": "backgroundMiddle",
      "context" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 1
    },
    "backgroundInterim": {
      "id": "backgroundInterim",
      "context" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 1
    },
    "backgroundFront": {
      "id": "backgroundFront",
      "context" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 1
    },
    "backgroundFace": {
      "id": "backgroundFace",
      "context" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 1
    }
  }

  static #canvases = {
    "backgroundStatic": {
      "id" : "backgroundStatic",
      "class" : "fullscreenCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width" : window.global.screenWidth,
      "height" : window.global.screenHeight,
      "opacity" : 1
    },
    "backgroundFar": {
      "id": "backgroundFar",
      "class" : "fullscreenCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 1
    },
    "backgroundMiddle": {
      "id": "backgroundMiddle",
      "class" : "fullscreenCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 0.5
    },
    "backgroundInterim": {
      "id": "backgroundInterim",
      "class" : "fullscreenCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 1
    },
    "backgroundFront": {
      "id": "backgroundFront",
      "class" : "fullscreenCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 1
    },
    "backgroundFace": {
      "id": "backgroundFace",
      "class" : "fullscreenCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 1
    },
    "info": {
      "id": "info",
      "class" : "fullscreenCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 1
    },
    "hudStatic" :{
      "id" : "hudStatic",
      "class" : "sectionCanvasBottom",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : {
        "bottom" : (window.innerHeight-window.global.screenHeight)/2+"px",
        "left" : (window.innerWidth-window.global.screenWidth)/2+"px"
      },
      "width": window.global.screenWidth,
      "height": 100,
      "opacity": 0.5
    },
    "hudDynamicLeft" :{
      "id" : "hudDynamicLeft",
      "class" : "sectionCanvasLeft",
      "context" : null,
      "contextStyles" : {
        "font" : "12px myFont",
        "fillStyle" : "white"
      },
      "canvas" : null,
      "canvasStyles" : {
        "bottom" : (window.innerHeight-window.global.screenHeight)/2+"px",
        "left" : (window.innerWidth/1.8-window.global.screenWidth/3)+"px",
        "color" : "white",
        "border-radius" : "30px"

      },
      "width": 200,
      "height" : 100,
      "opacity": 0.5
    },
    "hudDynamicFarLeft" : {
      "id": "hudDynamicFarLeft",
      "class": "sectionCanvasRight",
      "context": null,
      "contextStyles": {
        "font": "10px myFont",
        "fillStyle": "white",
        "border-radius": "30px"

      },
      "canvas": null,
      "canvasStyles": {
        "bottom": (window.innerHeight - window.global.screenHeight) / 2 + 10 + "px",
        "left": (window.innerWidth/2.2-window.global.screenWidth/3)+"px",
        "color": "white"
      },
      "width": 100,
      "height" : 40,
      "opacity": 0.5
    },
    "hudDynamicRight" :{
      "id" : "hudDynamicRight",
      "class" : "sectionCanvasRight",
      "context" : null,
      "contextStyles" : {
        "font" : "10px myFont",
        "fillStyle" : "white",
      },
      "canvas" : null,
      "canvasStyles" : {
        "bottom" : (window.innerHeight-window.global.screenHeight)/2+"px",
        "right" : (window.innerWidth/1.8-window.global.screenWidth/3)+"px",
        "color" : "white",
        "border-radius" : "30px"


      },
      "width": 200,
      "height" : 100,
      "opacity": 0.5
    },

    "hudDynamicFarRight" :{
      "id" : "hudDynamicFarRight",
      "class" : "sectionCanvasRight",
      "context" : null,
      "contextStyles" : {
        "font" : "10px myFont",
        "fillStyle" : "white",
        "border-radius" : "30px"

      },
      "canvas" : null,
      "canvasStyles" : {
        "bottom" :(window.innerHeight-window.global.screenHeight)/2+10+"px",
        "right" : (window.innerWidth/2.2-window.global.screenWidth/3)+"px",
        "color" : "white"
      },
      "width": 100,
      "height" : 40,
      "opacity": 0.5
    },
    "hudDynamicMiddle" :{
      "id" : "hudDynamicMiddle",
      "class" : "sectionCanvasMiddle",
      "context" : null,
      "contextStyles" : {
        "font" : "12px myFont",
        "fillStyle" : "white"

      },
      "canvas" : null,
      "canvasStyles" : {
        "bottom" : (window.innerHeight-window.global.screenHeight)/2+"px",
        "left" : (window.innerWidth/2-window.global.screenWidth/12)+"px",
        "color" : "white",

      },
      "width": window.global.screenWidth/6,
      "height" : 100,
      "opacity": 0.5
    },
    "spaceship" : {
      "id" : "spaceship",
      "class" : "fullscreenCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width": window.global.screenWidth,
      "height" : window.global.screenHeight,
      "opacity" : 1

    },
    "weapons" : {
      "id" : "weapons",
      "class" : "fullscreenCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width": window.global.screenWidth,
      "height" : window.global.screenHeight,
      "opacity" : 1
    },
    "enemies" : {
      "id" : "enemies",
      "class" : "fullscreenCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width": window.global.screenWidth,
      "height" : window.global.screenHeight,
      "opacity" : 1

    },
    "shipinfo": {
      "id": "shipinfo",
      "class" : "fullscreenCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 0.45
    },
    "performanceInfo" : {
      "id": "performanceInfo",
      "class" : "fullscreenCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 1
    }
  }

  static createCanvasNodes(){
    for (const canvases in CanvasHandler.#canvases) {
      const newCanvas  = document.createElement("canvas");
      newCanvas.id = this.#canvases[canvas].id;
      newCanvas.width = this.#canvases[canvas].width;
      newCanvas.height = this.#canvases[canvas].height;
      newCanvas.className = this.#canvases[canvas].class;
      CanvasHandler.#canvases[canvas].canvas = newCanvas;
      CanvasHandler.#canvases[canvas].context = newCanvas.getContext("2d");
      CanvasHandler.#canvases[canvas].context.imageSmoothingEnabled = true;
      CanvasHandler.#canvases[canvas].context.imageSmoothingQuality = 'high';
      CanvasHandler.#canvases[canvas].context.globalAlpha = this.#canvases[canvas].opacity || 0;

      if (CanvasHandler.#canvases[canvas].canvasStyles != null) {
        for (const style in CanvasHandler.#canvases[canvas].canvasStyles ) {
          newCanvas.style[style] = CanvasHandler.#canvases[canvas].canvasStyles[style];
        }
      }

      if (CanvasHandler.#canvases[canvas].contextStyles != null) {

        for (const style in CanvasHandler.#canvases[canvas].contextStyles ) {
          CanvasHandler.#canvases[canvas].context[style] = CanvasHandler.#canvases[canvas].contextStyles[style];
        }
      }
      document.querySelector("#game").appendChild(newCanvas);
    }
  }

  static getOffscreenCanvas = (id) => {
    return this.#offScreenCanvases[id];
  }

  static getCanvas =(id) =>{
    return this.#canvases[id];
  }

}