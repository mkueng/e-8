class BackgroundHandler {

  constructor(canvasHandler, gameLoop, imageData) {

    this.canvasHandler = canvasHandler;
    this.gameLoop = gameLoop;
    this.imageData = imageData;
    this.backgrounds = [];


    this.backgroundTemplates = {
      "backgroundStars_01": {
        id : "backgroundStars_01",
        image: document.querySelector("#backgroundStars_01"),
        width: window.global.gameWidth,
        height: window.global.gameHeight,
        x: 0,
        y: 0,
        step: 0.9,
        context: canvasHandler.getCanvas("backgroundFar").context,
        doubleDraw: true,
        callback: null
      },
      "moon": {
        id : "moon",
        image: document.querySelector("#moon"),
        width: 100,
        height: 100,
        x: 3000,
        y: 400,
        step: 1.2,
        context: canvasHandler.getCanvas("backgroundInterim").context,
        doubleDraw: false,
        callback: () => {
          this.removeBackground("moon");
        }
      },
      "asteroidField_01": {
        id : "asteroidField_01",
        image: document.querySelector("#asteroidField_01"),
        width: 3120,
        height: 1760,
        x: window.global.gameWidth+20000,
        y: 0,
        step: 13,
        context: canvasHandler.getCanvas("backgroundFace").context,
        doubleDraw: false,
        callback: () => {
          this.removeBackground("asteroids");
        }
      },
      "m130": {
        id : "m130",
        image: document.querySelector("#m130"),
        width: 1000,
        height: 1000,
        x: 4000,
        y: 0,
        step: 1.5,
        context: canvasHandler.getCanvas("backgroundFront").context,
        doubleDraw: false,
        callback: () => {
          this.removeBackground("m130");
        }
      },
      "spaceStation_01": {
        id : "spaceStation_01",
        image: document.querySelector("#spaceStation_01"),
        width: 500,
        height: 250,
        x: 8000,
        y: 300,
        step: 2.5,
        context: canvasHandler.getCanvas("backgroundFace").context,
        doubleDraw: false,
        callback: () => {
          this.removeBackground("spaceStation_01");
        }
      },
      "haze_01": {
        id : "haze_01",
        image: document.querySelector("#haze_01"),
        width: 5000,
        height: 2000,
        x: 4000,
        y: 0,
        step: 1.2,
        context: canvasHandler.getCanvas("backgroundMiddle").context,
        doubleDraw: false,
        callback: () => {
          this.removeBackground("whiteCloud");
        }
      },
      "space": {
        id : "space",
        image: document.querySelector("#space"),
        width: 800,
        height: 200,
        x: window.global.gameWidth / 4,
        y: 200,
        step: 0.3,
        context: canvasHandler.getCanvas("info").context,
        doubleDraw: false,
        callback: () => {
          this.removeBackground("space");
        }
      },
      "hud": {
        id : "hud",
        image: document.querySelector("#hud"),
        width: 200,
        height: window.global.gameHeight,
        x: 0,
        y: 0,
        step: 0,
        context: canvasHandler.getCanvas("shipinfo").context,
        doubleDraw: false,
        callback: () => {

        }
      }


    }


    this.addBackground("backgroundStars_01");
    this.addBackground("spaceStation_01");
    this.addBackground("haze_01");
    this.addBackground("m130");
    this.addBackground("moon");
    this.addBackground("asteroidField_01");



  }

  addBackground = (background, params = {})=>{
    this.backgroundTemplates[background].x = params.x || this.backgroundTemplates[background].x;
    this.backgroundTemplates[background].y = params.y || this.backgroundTemplates[background].y;
    this.backgroundTemplates[background].width = params.width || this.backgroundTemplates[background].width;
    this.backgroundTemplates[background].height = params.height || this.backgroundTemplates[background].height;
    this.backgrounds.push(
      new Background(this.backgroundTemplates[background])
    )

    this.gameLoop.setBackgrounds(this.backgrounds);
  }

  removeBackground = (id)=>{
    const index = this.backgrounds.findIndex(background => background.id === id);
    this.backgrounds.splice(index,1);
    this.gameLoop.setBackgrounds(this.backgrounds);

  }
}
