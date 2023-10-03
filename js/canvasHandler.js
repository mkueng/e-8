class CanvasHandler {

  //singleton
  static instance = new this();

  #backgroundCanvases = {
    "backgroundFar": {
      "id": "backgroundFar",
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "class" : "fullscreenCanvas",
      "opacity": 1
    },
    "backgroundMiddle": {
      "id": "backgroundMiddle",
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "class" : "fullscreenCanvas",
      "opacity": 1
    },
    "backgroundInterim": {
      "id": "backgroundInterim",
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "class" : "fullscreenCanvas",
      "opacity": 1
    },
    "backgroundFront": {
      "id": "backgroundFront",
      "width": 900,
      "height": 900,
      "class" : "fullscreenCanvas",
      "opacity": 1
    },
    "backgroundFace": {
      "id": "backgroundFace",
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "class" : "fullscreenCanvas",
      "opacity": 1
    }
  }

  #canvases = {

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

  invoke(){
    this.createCanvasNodes();
    this.createBackgroundCanvases();
  }


  createOffscreenCanvas = ({id, width, height})=>{
    const canvas = new OffscreenCanvas(width, height);
    canvas.id = id;
    return canvas
  }

  /**
   *
   * @param id
   * @param width
   * @param height
   * @param container
   * @returns {HTMLCanvasElement}
   */
  createAdHocCanvas= ({ id, width, height, container}) => {
    const canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.width = width;
    canvas.height = height
    document.querySelector("#"+container).appendChild(canvas);
    return canvas;
  }

  createBackgroundCanvases = ()=>{

    for (const canvas in this.#backgroundCanvases) {
      const newCanvas  = document.createElement("canvas");

      newCanvas.id = this.#backgroundCanvases[canvas].id;
      newCanvas.width = this.#backgroundCanvases[canvas].width;
      newCanvas.height = this.#backgroundCanvases[canvas].height;
      newCanvas.className = this.#backgroundCanvases[canvas].class;

      this.#backgroundCanvases[canvas].canvas = newCanvas;
      this.#backgroundCanvases[canvas].canvas = newCanvas.transferControlToOffscreen();
      document.querySelector("#game").appendChild(newCanvas);

    }
  }


  createCanvasNodes = ()=>{
    for (const canvas in this.#canvases) {
      const newCanvas  = document.createElement("canvas");
      newCanvas.id = this.#canvases[canvas].id;
      newCanvas.width = this.#canvases[canvas].width;
      newCanvas.height = this.#canvases[canvas].height;
      newCanvas.className = this.#canvases[canvas].class;
      this.#canvases[canvas].canvas = newCanvas;
      this.#canvases[canvas].context = newCanvas.getContext("2d");
      this.#canvases[canvas].context.imageSmoothingEnabled = true;
      this.#canvases[canvas].context.imageSmoothingQuality = 'high';
      this.#canvases[canvas].context.globalAlpha = this.#canvases[canvas].opacity || 0;

      if (this.#canvases[canvas].canvasStyles != null) {
        for (const style in this.#canvases[canvas].canvasStyles ) {
          newCanvas.style[style] = this.#canvases[canvas].canvasStyles[style];
        }
      }

      if (this.#canvases[canvas].contextStyles != null) {

        for (const style in this.#canvases[canvas].contextStyles ) {
          this.#canvases[canvas].context[style] = this.#canvases[canvas].contextStyles[style];
        }
      }

      document.querySelector("#game").appendChild(newCanvas);
    }



  }

  getBackgroundCanvas = (id)=>{
    return this.#backgroundCanvases[id];
  }

  getBackgroundCanvases = ()=>{
    return this.#backgroundCanvases;
  }

  getOffscreenCanvas = (id) => {
    return this.#backgroundCanvases[id];
  }

  getCanvas =(id) =>{
    return this.#canvases[id];
  }

}