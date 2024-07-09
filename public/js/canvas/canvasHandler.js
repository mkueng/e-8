class CanvasHandler {


  static canvasTypes = {
    backdrop: "backdrop",
    planets: "planets",
    backgroundFarthest: "backgroundFarthest",
    backgroundFar: "backgroundFar",
    backgroundMiddleFar: "backgroundMiddleFar",
    backgroundMiddle: "backgroundMiddle",
    backgroundFront: "backgroundFront",
    backgroundFace: "backgroundFace",
    weapons: "weapons",
    performanceInfo: "performanceInfo",
    haze: "haze",
    dust: "dust",
    explosion: "explosion",
    playerShip: "playerShip",
    hudDynamicRight: "hudDynamicRight",
    hudDynamicLeft: "hudDynamicLeft",
    hudDynamicMiddle: "hudDynamicMiddle",
    terminal: "terminal",
    terminalContent: "terminalContent"
  }

  #canvases = {
    "backdrop": {
      "id": "backdrop",
      "class": "fullscreenCanvas backdropCanvas",
      "alpha": false
    },
    "explosion": {
      "id": "explosion",
      "class": "fullscreenCanvas backgroundFaceCanvas",
      "alpha": true
    },
    "planets": {
      "id": "planets",
      "class": "fullscreenCanvas planetsCanvas",
      "alpha": true
    },
    "dust": {
      "id": "dust",
      "class": "fullscreenCanvas dustCanvas",
      "alpha": true
    },
    "backgroundFarthest": {
      "id": "backgroundFarthest",
      "class": "fullscreenCanvas backgroundFarthestCanvas",
      "alpha": true
    },
    "backgroundFar": {
      "id": "backgroundFar",
      "class": "fullscreenCanvas backgroundFarCanvas",
      "alpha": true
    },
    "backgroundMiddleFar": {
      "id": "backgroundMiddleFar",
      "class": "fullscreenCanvas backgroundMiddleFarCanvas",
      "alpha": true
    },
    "backgroundMiddle": {
      "id": "backgroundMiddle",
      "class": "fullscreenCanvas backgroundMiddleCanvas",
      "alpha": true
    },
    "backgroundFront": {
      "id": "backgroundFront",
      "class": "fullscreenCanvas backgroundFrontCanvas",
      "alpha": true
    },
    "backgroundFace": {
      "id": "backgroundFace",
      "class": "fullscreenCanvas backgroundFaceCanvas",
      "alpha": true
    },
    "weapons": {
      "id": "weapons",
      "class": "fullscreenCanvas weaponsCanvas",
      "alpha": true
    },
    "performanceInfo": {
      "id": "performanceInfo",
      "class": "fullscreenCanvas performanceInfoCanvas",
      "alpha": true
    },
    "haze": {
      "id": "haze",
      "class": "fullscreenCanvas",
      "alpha": true
    },
    "playerShip": {
      "id": "playerShip",
      "class": "fullscreenCanvas playerShipCanvas",
      "alpha": true
    },
    "terminal": {
      "id": "terminal",
      "class": "fullscreenCanvas terminalCanvas",
      "alpha": true
    },
    "terminalContent": {
      "id": "terminalContent",
      "class": "fullscreenCanvas terminalCanvas",
      "alpha": true
    }
  }

  #staticCanvases = {

    "hudDynamicLeft": {
      "id": "hudDynamicLeft",
      "class": "sectionCanvasLeft",
      "alpha": true,
      "contextStyles": {
        "font": "15px myFont"
      },
      "canvasStyles": {
        "top": 20 + "px",
        "left": 30 + "px",
        "color": "grey",
        "border-radius": "10px"

      },
      "width": 440,
      "height": 150,
      "opacity": 0.1
    },
    "hudDynamicRight": {
      "id": "hudDynamicRight",
      "class": "sectionCanvasRight",
      "alpha": true,
      "contextStyles": {
        "font": "15px myFont"
      },
      "canvasStyles": {
        "top": 20 + "px",
        "right": 40 + "px",
        "color": "grey",
        "border-radius": "10px",

      },
      "width": 440,
      "height": 150,
      "opacity": 0.1
    },

    "hudDynamicMiddle": {
      "id": "hudDynamicMiddle",
      "class": "sectionCanvasMiddle",
      "contextStyles": {
        "font": "12px myFont",
        "fillStyle": "white"
      },
      "canvasStyles": {
        "top": 10 + "px",
        "left": (window.innerWidth / 2 - e8.global.screenWidth / 6) + "px",
        "color": "white",

      },
      "width": e8.global.screenWidth /3,
      "height": 120,
      "opacity": 0.5
    }
  }

  constructor(){
    e8.global.subscribeForGlobalEvents(this);
    this.createCanvasElements(this.#canvases);
    this.createCanvasElements(this.#staticCanvases);
  }

  /**
   *
   */
  createCanvasElements = (canvasTemplates) => {
    for (const canvas in canvasTemplates) {

      const newCanvas  = document.createElement("canvas");
      newCanvas.id = canvasTemplates[canvas].id;
      newCanvas.width = canvasTemplates[canvas].width || e8.global.screenWidth;
      newCanvas.height = canvasTemplates[canvas].height || e8.global.screenHeight;
      newCanvas.className = canvasTemplates[canvas].class;
      canvasTemplates[canvas].canvas = newCanvas;
      canvasTemplates[canvas].context = newCanvas.getContext("2d", {alpha:canvasTemplates[canvas].alpha});
      canvasTemplates[canvas].context.imageSmoothingEnabled = false;
      //canvasTemplates[canvas].context.imageSmoothingQuality = 'high';
      canvasTemplates[canvas].context.globalAlpha =  1;

      const canvasStyles = canvasTemplates[canvas]?.canvasStyles;
      if (canvasStyles) {
        Object.assign(newCanvas.style, canvasStyles);
      }

      const contextStyles = canvasTemplates[canvas]?.contextStyles;
      if (contextStyles) {
        Object.assign(canvasTemplates[canvas].context, contextStyles);
      }
      document.querySelector("#game").appendChild(newCanvas);
    }
  }


  updateFromGlobalEvent = ({message, payload}) =>{
    if (message === e8.global.events.resize) {
      for (const canvas in this.#canvases){
        const canvass = document.getElementById(this.#canvases[canvas].id);
        canvass.width = payload.width;
        canvass.height = payload.height;
      }
      const settings = document.getElementById("settings");
      settings.style.width = payload.width;
      settings.style.height = payload.height;
    }

  }

  /**
   *
   * @param id
   * @param width
   * @param height
   * @param container
   * @returns {HTMLCanvasElement}
   */
  createAdHocCanvas = ({
                         id,
                         width,
                         height,
                         container
  }) => {
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
  createOffscreenCanvas = ({
                             id,
                             width,
                             height
  })=>{
    const canvas = new OffscreenCanvas(width, height);
    canvas.id = id;
    return canvas
  }



  unblurCanvases = () =>{
    for (const canvas in this.#canvases) {
      this.#canvases[canvas].context.filter = ("none");
    }
  }

  blurCanvases = () =>{
    for (const canvas in this.#canvases) {
      if (canvas !== "settings") {
        this.#canvases[canvas].context.filter = ("blur(20px)");
      }
    }
    //this.#canvases["settings"].context.filter = ("none");
  }

  /**
   *
   * @param id
   * @returns {*}
   */
  getCanvas = (id) => {
    return this.#canvases[id] ? this.#canvases[id] : this.#staticCanvases[id];
  }

}