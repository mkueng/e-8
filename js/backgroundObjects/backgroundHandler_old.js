class BackgroundHandler_old {

  static instance = new(this);

  static backgroundRemoveQueue = [];
  static dynamicBackgrounds = [];
  static staticBackgrounds = [];

  invoke(){

  }

  bla(){
    console.log("bla");
  }


  /*
  constructor(gameLoop, canvasHandler) {
    this.canvasHandler = canvasHandler;

    this.staticBackgroundTemplates = {
      "universe": {
        id : "universe",
        image: document.querySelector("#universe"),
        width: window.global.screenWidth,
        height: window.global.screenHeight,
        x: 0,
        y: 0,
        step: 0,
        onStage: 0,
        context: this.canvasHandler.getCanvas("backgroundStatic").context
      },
    }


    this.dynamicBackgroundTemplates = {
      "moon": {
        id : "moon",
        image: document.querySelector("#moon"),
        width: 100,
        height: 100,
        x: window.global.screenWidth+100,
        y: 400,
        step: 0.4,
        onStage: 8000,
        context: this.canvasHandler.getCanvas("backgroundInterim").context,
        doubleDraw: false,
        callback: () => {
          this.removeDynamicBackground("moon");
        }
      },
      "mars": {
        id : "mars",
        image: document.querySelector("#mars"),
        width: 100,
        height: 100,
        x: window.global.screenWidth+100,
        y: 100,
        step: 0.3,
        onStage : 15,
        context: this.canvasHandler.getCanvas("backgroundInterim").context,
        doubleDraw: false,
        callback: () => {
          this.removeDynamicBackground("mars");
        }
      },
      "jupiter": {
        id : "jupiter",
        image: document.querySelector("#jupiter"),
        width: 1000,
        height: 185,
        x: window.global.screenWidth+100,
        y: -10,
        step: 0.2,
        onStage : 1000,
        context: this.canvasHandler.getCanvas("backgroundInterim").context,
        doubleDraw: false,
        callback: () => {
          this.removeDynamicBackground("jupiter");
        }
      },
      "asteroidField_01": {
        id : "asteroidField_01",
        image: document.querySelector("#asteroidField_01"),
        width: 600,
        height: 200,
        x: window.global.screenWidth,
        y: 400,
        step: 1,
        onStage: 2000,
        context: this.canvasHandler.getCanvas("backgroundFace").context,
        doubleDraw: false,
        callback: () => {
          this.removeDynamicBackground("asteroidField_01");
        }
      },
      "m130": {
        id : "m130",
        image: document.querySelector("#m130"),
        width: 971,
        height: 977,
        x: window.global.screenWidth+100,
        y: 200,
        step: 0.5,
        onStage : 7000,
        context: this.canvasHandler.getCanvas("backgroundInterim").context,
        doubleDraw: false,
        callback: () => {
          this.removeDynamicBackground("m130");
        }
      },
      "spaceStation_01": {
        id : "spaceStation_01",
        image: document.querySelector("#spaceStation_01"),
        width: 400,
        height: 226,
        x:  window.global.screenWidth+100,
        y: 300,
        step: 2,
        onStage: 90000,
        context: this.canvasHandler.getCanvas("backgroundFront").context,
        doubleDraw: false,
        callback: () => {
          this.removeDynamicBackground("spaceStation_01");
        }
      },
      "haze_01": {
        id : "haze_01",
        image: document.querySelector("#haze_01"),
        width: 6000,
        height: 2200,
        x: window.global.screenWidth+100,
        y: 0,
        step: 0.2,
        onStage: 1000,
        context: this.canvasHandler.getCanvas("backgroundFar").context,
        doubleDraw: false,
        callback: () => {
          this.removeDynamicBackground("haze_01");
        }
      }
    }


    for (const template in this.staticBackgroundTemplates){
      this.addStaticBackground(this.staticBackgroundTemplates[template])
    }

    for (const template in this.dynamicBackgroundTemplates){
      setTimeout(()=>{
        this.addDynamicBackground(this.dynamicBackgroundTemplates[template])
      },this.dynamicBackgroundTemplates[template].onStage )
    }
  }

  addStaticBackground = (template, params= {}) =>{
    template.x = params.x || template.x;
    template.y = params.y || template.y;
    template.width = params.width || template.width;
    template.height = params.height || template.height;
    BackgroundHandler.staticBackgrounds.push(new StaticBackground(template))
  }

  addDynamicBackground = (template, params = {})=>{
    template.x = params.x || template.x;
    template.y = params.y || template.y;
    template.width = params.width || template.width;
    template.height = params.height || template.height;
    BackgroundHandler.dynamicBackgrounds.push(new DynamicBackground(template));
  }

  removeDynamicBackground = (id)=>{
    BackgroundHandler.backgroundRemoveQueue.push(id);

  }
  */

}
