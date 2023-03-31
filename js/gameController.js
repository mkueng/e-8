class GameController {

  constructor() {

    this.gameLoop = new GameLoop();
    new InputHandler();
    this.canvasHandler = new CanvasHandler(this.gameLoop);
    this.spriteHandler = new SpriteHandler(this.canvasHandler, this.gameLoop);
    new BackgroundHandler(this.canvasHandler, this.gameLoop);
    this.hud = new Hud(this.canvasHandler.getCanvas("shipinfo"))
    this.gameLoop.addHud(this.hud);
    const spaceship = this.spriteHandler.instantiateSpriteComposition("spaceship_01");
    this.spriteHandler.addSpriteToGameLoop(spaceship);

    let enemies = [];

    for (let i=0; i < 2; i++) {
      enemies[i]= this.spriteHandler.instantiateSprite("enemy_01", {});
      enemies[i].setOponent(spaceship);
      this.spriteHandler.addEnemySpriteToGameLoop(enemies[i]);
    }

    setInterval(()=>{
      let enemies = [];
      for (let i=0; i < 2; i++) {
        enemies[i]= this.spriteHandler.instantiateSprite("enemy_01", {});
        enemies[i].setOponent(spaceship);
        this.spriteHandler.addEnemySpriteToGameLoop(enemies[i]);
      }
    },5000)

    this.gameLoop.startLoop()

  }
}