class GameController {

  static music = new Audio("../resources/music/backgroundmusic.mp3");

  constructor() {

    const gameObjectsPool = new GameObjectsPool();
    const resourceHandler = new ResourceHandler();

    /*
    this.resourceHandler.getResource("enemy_01").then((r) => {
      console.log("r", r);
    });
*/
    this.stage = new Stage_01(resourceHandler, gameObjectsPool);


    /*



    new InputHandler();
    GameController.music.volume = 0.0;



    this.resourceLoader = new ResourceLoader();
    this.resourceLoader.loadImageResources([
      "resources/backgrounds/asteroidField_01.png",
      "resources/backgrounds/backgroundStars_02.jpg"

    ]).then((images)=>{
      console.log("Images:", images);
    })

    let stage1 = new Stage_01();
*/
    /*

    this.resourceLoader = new ResourceLoader();
    this.resourceLoader.loadImageResources([
      "enemy_01","enemy_01_shoot"
    ]).then( resource => {
      console.log("resource:", resource)

    })
    */

    /*

    this.canvasHandler = new CanvasHandler();

    this.fontHandler = new FontHandler();
    this.hudHandler = new HUDHandler(this.canvasHandler);


    this.spriteHandler = new SpriteHandler(this.canvasHandler);
    this.stagehandler = new StageHandler(this.spriteHandler);
    this.gameLoop = new GameLoop(this.canvasHandler, this.hudHandler);

    this.backgroundHandler = new BackgroundHandler(this.gameLoop, this.canvasHandler);
    this.soundHandler = new SoundHandler();
    this.infoHandler = new InfoHandler(this.canvasHandler);


    this.fontHandler.loadFont().then(r => {
      this.stagehandler.instantiateStages().then(r => {
        this.spriteHandler.addSpriteToGame(
          SpriteHandler.spriteTypes.spaceships,
          this.spriteHandler.createSpriteComposition("spaceship_01", {hudHandler:this.hudHandler})
        );
        this.stagehandler.activateStage(1);

        this.gameLoop.startLoop();
      });
    })

    */
    //this.offScreenRender = new OffscreenRender();
  }
}