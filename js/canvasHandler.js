class CanvasHandler {


  #offScreenCanvases = {
    "backgroundFar": {
      "id": "backgroundFar",
      "context" : null,
      "width": window.global.gameWidth,
      "height": window.global.gameHeight,
      "opacity": 1
    },
    "backgroundMiddle": {
      "id": "backgroundMiddle",
      "context" : null,
      "width": window.global.gameWidth,
      "height": window.global.gameHeight,
      "opacity": 0.5
    },
    "backgroundInterim": {
      "id": "backgroundInterim",
      "context" : null,
      "width": window.global.gameWidth,
      "height": window.global.gameHeight,
      "opacity": 1
    },
    "backgroundFront": {
      "id": "backgroundFront",
      "context" : null,
      "width": window.global.gameWidth,
      "height": window.global.gameHeight,
      "opacity": 1
    },
    "backgroundFace": {
      "id": "backgroundFace",
      "context" : null,
      "width": window.global.gameWidth,
      "height": window.global.gameHeight,
      "opacity": 1
    }
  }

  #canvases = {
    "backgroundFar": {
      "id": "backgroundFar",
      "context" : null,
      "width": window.global.gameWidth,
      "height": window.global.gameHeight,
      "opacity": 1
    },
    "backgroundMiddle": {
      "id": "backgroundMiddle",
      "context" : null,
      "width": window.global.gameWidth,
      "height": window.global.gameHeight,
      "opacity": 1
    },
    "backgroundInterim": {
      "id": "backgroundInterim",
      "context" : null,
      "width": window.global.gameWidth,
      "height": window.global.gameHeight,
      "opacity": 0.5
    },
    "backgroundFront": {
      "id": "backgroundFront",
      "context" : null,
      "width": window.global.gameWidth,
      "height": window.global.gameHeight,
      "opacity": 1
    },
    "backgroundFace": {
      "id": "backgroundFace",
      "context" : null,
      "width": window.global.gameWidth,
      "height": window.global.gameHeight,
      "opacity": 1
    },
    "info": {
      "id": "info",
      "context" : null,
      "width": window.global.gameWidth,
      "height": window.global.gameHeight,
      "opacity": 1
    },
    "spaceship" : {
      "id" : "spaceship",
      "context" : null,
      "width": window.global.gameWidth,
      "height" : window.global.gameHeight,
      "opacity" : 1

    },

    "weapons" : {
      "id" : "weapons",
      "context" : null,
      "width": window.global.gameWidth,
      "height" : window.global.gameHeight,
      "opacity" : 1
    },
    "enemies" : {
      "id" : "enemies",
      "context" : null,
      "width": window.global.gameWidth,
      "height" : window.global.gameHeight,
      "opacity" : 1

    },
    "shipinfo": {
      "id": "shipinfo",
      "context" : null,
      "width": window.global.gameWidth,
      "height": window.global.gameHeight,
      "opacity": 0.45
    },
    "performanceInfo" : {
      "id": "performanceInfo",
      "context" : null,
      "width": window.global.gameWidth,
      "height": window.global.gameHeight,
      "opacity": 1
    }


  }
  constructor() {
    for (const canvas in this.#canvases) {
      const newCanvas  = document.createElement("canvas");
      newCanvas.id = this.#canvases[canvas].id;
      newCanvas.width = this.#canvases[canvas].width;
      newCanvas.height = this.#canvases[canvas].height;
      newCanvas.className = "canvas";
      this.#canvases[canvas].context =   newCanvas.getContext("2d");
      this.#canvases[canvas].context.imageSmoothingEnabled = true;
      this.#canvases[canvas].context.imageSmoothingQuality = 'high';
      this.#canvases[canvas].context.globalAlpha = this.#canvases[canvas].opacity || 0;
      document.querySelector("#game").appendChild(newCanvas);
    }

    for (const offscreenCanvas in this.#offScreenCanvases){
      const newOffscreenCanvas  = new OffscreenCanvas(this.#offScreenCanvases[offscreenCanvas].width,this.#offScreenCanvases[offscreenCanvas].height);
      newOffscreenCanvas.id = this.#offScreenCanvases[offscreenCanvas].id;
      this.#offScreenCanvases[offscreenCanvas].context=newOffscreenCanvas.getContext("2d");
    }
  }

  getOffscreenCanvas = (id) => {
    return this.#offScreenCanvases[id];
  }

  getCanvas =(id) =>{
    return this.#canvases[id];
  }

}