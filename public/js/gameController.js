'use strict'

class GameController {

  resourceHandler;
  proceduralMusic;
  asteroidHandler;
  enemyShipHandler;
  fontHandler;
  canvasHandler;
  infoHandler;
  inputHandler;
  backdrop;
  hudHandler;
  hazeHandler;
  playerShipHandler;
  galaxy;
  gameLoop;

  static music = new Audio("../resources/music/Debutante.mp3");

  constructor() {


    this.startGame().then((r)=>{
      console.log("game started");
     // document.addEventListener("keydown", this.startMusic, true);
    })
  }

  startMusic = ()=>{
    console.log("start music");
    document.removeEventListener("keydown", this.startMusic, true);
    this.proceduralMusic.testplay();
    /*

    if (GameController.music.paused) {
      GameController.music.play().then(()=>{
        document.removeEventListener("keydown", this.startMusic, true);
      });
    }*/
  }


  startGame = async ()=>{
    const resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');

    this.resourceHandler = new ResourceHandler();
    this.proceduralMusic = new ProceduralMusic();
    this.fontHandler = new FontHandler();
    await this.fontHandler.loadFont();
    this.canvasHandler = new CanvasHandler();
    this.infoHandler = new InfoHandler(this.canvasHandler)
    this.inputHandler = new InputHandler();


    this.backdrop = new Backdrop({
      resourceHandler: this.resourceHandler ,
      canvasHandler: this.canvasHandler
    });


    this.hudHandler = new HudHandler({
      canvasHandler: this.canvasHandler
    });

    this.gameLoop = new GameLoop({
      infoHandler: this.infoHandler,
      hudHandler: this.hudHandler
    });
    this.galaxy = new Galaxy({
      gameLoop: this.gameLoop,
      canvasHandler: this.canvasHandler,
      scale : 200
    });
    this.hazeHandler = new HazeHandler({
      gameLoop: this.gameLoop,
      canvasHandler: this.canvasHandler,
      resizeImageWorker
    });

    this.asteroidHandler = new AsteroidHandler({
      gameLoop: this.gameLoop,
      canvasHandler: this.canvasHandler,
      resourceHandler: this.resourceHandler,
      resizeImageWorker
    })

    this.playerShipHandler = new PlayerShipHandler({
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler,
      inputHandler: this.inputHandler,
      hudHandler: this.hudHandler
    });
    this.enemyShipHandler = new EnemyShipHandler({
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler
    });


    await this.proceduralMusic.fetchAudioAssets();
    await this.playerShipHandler.create();
    await this.enemyShipHandler.invoke();
    await this.asteroidHandler.invoke();
   this.hazeHandler.create();
    this.asteroidHandler.createAsteroid(10000,10);
    document.addEventListener("keydown", this.startMusic, true);


    setTimeout(()=>{

      this.gameLoop.start();
      this.enemyShipHandler.startCreation();
    },100)
  }


  // global
  subscribeForGlobalEvents = ()=>{
    ns.init.subscribeForGlobalEvents((event)=>{

      switch(event.message){

        case "tab deactivated" : {
          StateHandler.instance.currentState.stage.pause();
          break;
        }

        case  "tab inactive" : {
          StateHandler.instance.currentState.stage.resume();
          break;
        }
      }

    })
  }

}