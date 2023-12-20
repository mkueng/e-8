class CanvasHandler {

  #newCanvases = {
    "backdrop": {
      "id": "backdrop",
      "class" : "backdropCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "opacity": 1
    },
    "backgroundFarthest": {
      "id": "backgroundFarthest",
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "class": "fullscreenCanvas",
      "context": null,
      "contextStyles": null,
      "canvas": null,
      "canvasStyles": null,
      "opacity": 1
    },
    "backgroundFar": {
      "id": "backgroundFar",
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "class": "fullscreenCanvas",
      "context": null,
      "contextStyles": null,
      "canvas": null,
      "canvasStyles": null,
      "opacity": 1
    },
    "backgroundMiddleFar": {
      "id": "backgroundMiddleFar",
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "class": "fullscreenCanvas",
      "context": null,
      "contextStyles": null,
      "canvas": null,
      "canvasStyles": null,
      "opacity": 1
    },
    "backgroundMiddle": {
      "id": "backgroundMiddle",
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "class": "fullscreenCanvas",
      "context": null,
      "contextStyles": null,
      "canvas": null,
      "canvasStyles": null,
      "opacity": 0.5,

    },
    "backgroundFront": {
      "id": "backgroundFront",
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "class": "fullscreenCanvas",
      "context": null,
      "contextStyles": null,
      "canvas": null,
      "canvasStyles": null,
      "opacity": 1
    },
    "backgroundFace": {
      "id": "backgroundFace",
      "width": window.global.screenWidth,
      "height": window.global.screenHeight,
      "class": "fullscreenCanvas",
      "context": null,
      "contextStyles": null,
      "canvas": null,
      "canvasStyles": null,
      "opacity": 1
    },

    "hudStatic": {
      "id": "hudStatic",
      "class": "sectionCanvasBottom",
      "context": null,
      "contextStyles": null,
      "canvas": null,
      "canvasStyles": {
        "top": 0 + "px",
        "left": window.global.screenWidth / 6 + "px"
      },
      "width": window.global.screenWidth / 1.5,
      "height": 80,
      "opacity": 0.8
    },
    "hudDynamicLeft": {
      "id": "hudDynamicLeft",
      "class": "sectionCanvasLeft",
      "context": null,
      "contextStyles": {
        "font": "12px myFont"
      },
      "canvas": null,
      "canvasStyles": {
        "top": ((window.global.currentHeight-window.global.screenHeight)/2) + 10 + "px",
        "left": ((window.global.currentWidth-window.global.screenWidth)/2)+ 30 +"px",
        "color": "grey",
        "border-radius": "0px"

      },
      "width": 340,
      "height": 150,
      "opacity": 0.7
    },
    "hudDynamicFarLeft": {
      "id": "hudDynamicFarLeft",
      "class": "sectionCanvasRight",
      "context": null,
      "contextStyles": {
        "font": "10px myFont",
        "fillStyle": "white",
        "border-radius": "0px"

      },
      "canvas": null,
      "canvasStyles": {
        "bottom": (window.innerHeight - window.global.screenHeight) / 2 + 10 + "px",
        "left": ((window.global.currentWidth-window.global.screenWidth)/2) + "px",
        "color": "grey"
      },
      "width": 100,
      "height": 40,
      "opacity": 0.5
    },
    "hudDynamicRight": {
      "id": "hudDynamicRight",
      "class": "sectionCanvasRight",
      "context": null,
      "contextStyles": {
        "font": "12px myFont"
      },
      "canvas": null,
      "canvasStyles": {
        "top": ((window.global.currentHeight-window.global.screenHeight)/2) + 10+ "px",
        "right": ((window.global.currentWidth-window.global.screenWidth)/2) + 30+ "px",
        "color": "red",
        "border-radius": "0px",

      },
      "width": 340,
      "height": 150,
      "opacity": 0.7
    },

    "hudDynamicFarRight": {
      "id": "hudDynamicFarRight",
      "class": "sectionCanvasRight",
      "context": null,
      "contextStyles": {
        "font": "10px myFont",
        "fillStyle": "white",
        "border-radius": "10px"

      },
      "canvas": null,
      "canvasStyles": {
        "bottom": (window.innerHeight - window.global.screenHeight) / 2 + 10 + "px",
        "right": (window.innerWidth / 2.2 - window.global.screenWidth / 3) + "px",
        "color": "white"
      },
      "width": 100,
      "height": 40,
      "opacity": 0.5
    },
    "hudDynamicMiddle": {
      "id": "hudDynamicMiddle",
      "class": "sectionCanvasMiddle",
      "context": null,
      "contextStyles": {
        "font": "12px myFont",
        "fillStyle": "white"

      },
      "canvas": null,
      "canvasStyles": {
        "top": 0 + "px",
        "left": (window.innerWidth / 2 - window.global.screenWidth / 12) + "px",
        "color": "white",

      },
      "width": window.global.screenWidth / 6,
      "height": 100,
      "opacity": 0.5
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
    },
    "weapons" : {
      "id" : "weapons",
      "class" : "weaponCanvas",
      "context" : null,
      "contextStyles" : null,
      "canvas" : null,
      "canvasStyles" : null,
      "width": window.global.screenWidth,
      "height" : window.global.screenHeight,
      "opacity" : 1
    }

  }

  constructor(){
    this.createCanvasNodes();
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

  /**
   *
   * @param id
   * @param width
   * @param height
   * @returns {OffscreenCanvas}
   */
  createOffscreenCanvas = ({id, width, height})=>{
    const canvas = new OffscreenCanvas(width, height);
    canvas.id = id;
    return canvas
  }


  /**
   *
   */
  createCanvasNodes =()=>{
    for (const canvas in this.#newCanvases) {

      const newCanvas  = document.createElement("canvas");
      newCanvas.id = this.#newCanvases[canvas].id;
      newCanvas.width = this.#newCanvases[canvas].width;
      newCanvas.height = this.#newCanvases[canvas].height;
      newCanvas.className = this.#newCanvases[canvas].class;
      this.#newCanvases[canvas].canvas = newCanvas;
      this.#newCanvases[canvas].context = newCanvas.getContext("2d");
      this.#newCanvases[canvas].context.imageSmoothingEnabled = true;
      this.#newCanvases[canvas].context.imageSmoothingQuality = 'high';
      this.#newCanvases[canvas].context.globalAlpha = this.#newCanvases[canvas].opacity || 0;

      const canvasStyles = this.#newCanvases[canvas]?.canvasStyles;
      if (canvasStyles) {
        Object.assign(newCanvas.style, canvasStyles);
      }

      const contextStyles = this.#newCanvases[canvas]?.contextStyles;
      if (contextStyles) {
        Object.assign(this.#newCanvases[canvas].context, contextStyles);
      }

      document.querySelector("#game").appendChild(newCanvas);
    }
  }

  /**
   *
   * @param id
   * @returns {*}
   */
  getCanvas =(id) =>{
    return this.#newCanvases[id];
  }

}