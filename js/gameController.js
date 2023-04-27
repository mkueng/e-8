class GameController {

  static music = new Audio("../resources/music/backgroundmusic.mp3");

  constructor() {
    new InputHandler();
    GameController.music.volume = 0.0;
    this.canvasHandler = new CanvasHandler();
    this.gameLoop = new GameLoop(this.canvasHandler);
    this.spriteHandler = new SpriteHandler(this.canvasHandler);
    this.stagehandler = new StageHandler(this.spriteHandler);

    this.stagehandler.instantiateStages().then(r => {
      this.spriteHandler.addSpriteToGame(
        SpriteHandler.spriteTypes.spaceships,
        this.spriteHandler.createSpriteComposition("spaceship_01")
      );
      this.stagehandler.activateStage(1);
      this.hud = new Hud(this.canvasHandler.getCanvas("shipinfo"));
      this.gameLoop.addHud(this.hud);
      this.gameLoop.startLoop();
    });

    new BackgroundHandler(this.gameLoop, this.canvasHandler);
    new SoundHandler();
    new InfoHandler(this.canvasHandler);


    //this.offScreenRender = new OffscreenRender();
  }
}