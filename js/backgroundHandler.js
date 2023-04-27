class BackgroundHandler {

   static backgroundRemoveQueue = [];
   static backgrounds = [];

  constructor(gameLoop, canvasHandler) {
    this.canvasHandler = canvasHandler;


    this.backgroundTemplates = {
      "universe": {
        id : "universe",
        image: document.querySelector("#universe"),
        width: window.global.gameWidth,
        height: window.global.gameHeight,
        x: 0,
        y: 0,
        step: 0.4,
        onStage: 0,
        context: this.canvasHandler.getCanvas("backgroundMiddle").context,
        doubleDraw: true,
        callback: () => {
         // this.removeBackground("universe");
        }
      },
      "moon": {
        id : "moon",
        image: document.querySelector("#moon"),
        width: 100,
        height: 100,
        x: window.global.gameWidth+100,
        y: 400,
        step: 1.5,
        onStage: 8000,
        context: this.canvasHandler.getCanvas("backgroundMiddle").context,
        doubleDraw: false,
        callback: () => {
          this.removeBackground("moon");
        }
      },
      "mars": {
        id : "mars",
        image: document.querySelector("#mars"),
        width: 800,
        height: 800,
        x: window.global.gameWidth+100,
        y: -300,
        step: 3,
        onStage : 150000,
        context: this.canvasHandler.getCanvas("backgroundMiddle").context,
        doubleDraw: false,
        callback: () => {
          this.removeBackground("mars");
        }
      },
      "jupiter": {
        id : "jupiter",
        image: document.querySelector("#jupiter"),
        width: 1000,
        height: 185,
        x: window.global.gameWidth+100,
        y: -10,
        step: 1.2,
        onStage : 100000,
        context: this.canvasHandler.getCanvas("backgroundMiddle").context,
        doubleDraw: false,
        callback: () => {
          this.removeBackground("jupiter");
        }
      },
      "asteroidField_01": {
        id : "asteroidField_01",
        image: document.querySelector("#asteroidField_01"),
        width: 1066,
        height: 581,
        x: window.global.gameWidth,
        y: 0,
        step: 13,
        onStage: 20000,
        context: this.canvasHandler.getCanvas("backgroundMiddle").context,
        doubleDraw: false,
        callback: () => {
          this.removeBackground("asteroidField_01");
        }
      },
      "m130": {
        id : "m130",
        image: document.querySelector("#m130"),
        width: 971,
        height: 977,
        x: window.global.gameWidth+100,
        y: 200,
        step: 2.0,
        onStage : 7000,
        context: this.canvasHandler.getCanvas("backgroundMiddle").context,
        doubleDraw: false,
        callback: () => {
          this.removeBackground("m130");
        }
      },
      "spaceStation_01": {
        id : "spaceStation_01",
        image: document.querySelector("#spaceStation_01"),
        width: 400,
        height: 226,
        x:  window.global.gameWidth+100,
        y: 300,
        step: 2,
        onStage: 90000,
        context: this.canvasHandler.getCanvas("backgroundMiddle").context,
        doubleDraw: false,
        callback: () => {
          this.removeBackground("spaceStation_01");
        }
      },
      "haze_01": {
        id : "haze_01",
        image: document.querySelector("#haze_01"),
        width: 4000,
        height: 600,
        x: window.global.gameWidth+100,
        y: 0,
        step: 0.8,
        onStage: 1000,
        context: this.canvasHandler.getCanvas("backgroundInterim").context,
        doubleDraw: false,
        callback: () => {
          this.removeBackground("haze_01");
        }
      }
    }

    this.backGroundStageManager();
    for (const template in this.backgroundTemplates){
      setTimeout(()=>{
        this.addBackground(this.backgroundTemplates[template].id)
      },this.backgroundTemplates[template].onStage )
    }
  }

  backGroundStageManager = ()=>{

  }

  addBackground = (background, params = {})=>{
    this.backgroundTemplates[background].x = params.x || this.backgroundTemplates[background].x;
    this.backgroundTemplates[background].y = params.y || this.backgroundTemplates[background].y;
    this.backgroundTemplates[background].width = params.width || this.backgroundTemplates[background].width;
    this.backgroundTemplates[background].height = params.height || this.backgroundTemplates[background].height;
    BackgroundHandler.backgrounds.push(new Background(this.backgroundTemplates[background]));
    console.log("background added:", BackgroundHandler.backgrounds);
  }

  removeBackground = (id)=>{
    BackgroundHandler.backgroundRemoveQueue.push(id);

  }
}
