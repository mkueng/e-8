'use strict'

class GameInit {

  asteroidHandler;
  backdrop;
  canvasHandler;
  enemyShipHandler;
  fontHandler;
  galaxy;
  gameLoop;
  hazeHandler;
  hudHandler;
  infoHandler;
  inputHandler;
  playerShipHandler;
  proceduralMusic;
  resourceHandler;
  settingsHandler;
  stateHandler;
  gameState;
  localStorageHandler;

  constructor() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        e8.global.tabIsActive = false;
        console.log("tab inactive");
        this.gameLoop.pause();

        /*
        subscribers.forEach(
          (subscriber) =>{
            subscriber({
              message: "tab deactivated",
              content: ""
            })
          }
        )*/
      } else {
        console.log("tab active");
        e8.global.tabIsActive = true;
        this.gameLoop.restart();
        /*
        subscribers.forEach(
          (subscriber) =>{
            subscriber({
              message: "tab active",
              content: ""
            })
          }
        )*/
      }
    });


    this.initGame().then((r)=>{
      document.addEventListener("keydown", this.startMusic, true);
       //this.settingsHandler.showSettings();
    })
  }

  startGame = ()=>{
    this.gameState = this.stateHandler.getState().name;
    this.gameLoop.start();
    this.asteroidHandler.createAsteroid(10000,10);
    this.enemyShipHandler.startCreation(100);
  }

  pauseGame = ()=>{
    console.log("pauseGame");
    this.gameState = this.stateHandler.getState().name;
    this.gameLoop.pause();
  }

  restartGame = () =>{
    this.gameState = this.stateHandler.getState().name;
    this.gameLoop.restart();
  }

  startMusic = ()=>{
    //SoundHandler.playMusic();
    document.removeEventListener("keydown", this.startMusic, true);
  }


  initGame = async ()=>{
    this.localStorageHandler = new LocalStorageHandler();

    const resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');
    //this.utilityWorker = new Worker('js/workers/utility/utilityWorker.js');
   // this.enemyShipWorker = new Worker('js/workers/enemyShip/enemyShipWorker');
    SoundHandler.setFXGain({percentage: 0.5});
    SoundHandler.setMusicGain({percentage: 0});

    this.fontHandler = new FontHandler();
    await this.fontHandler.loadFont();

    this.stateHandler = new StateHandler(this);
    this.speechHandler = new SpeechHandler()
    this.resourceHandler = new ResourceHandler();
    this.proceduralMusic = new ProceduralMusic();
    this.canvasHandler = new CanvasHandler();
    this.infoHandler = new InfoHandler(this.canvasHandler)
    this.inputHandler = new InputHandler();
    this.settingsHandler = new SettingsHandler({
      localStorageHandler: this.localStorageHandler,
      inputHandler: this.inputHandler,
      canvasHandler: this.canvasHandler,
      stateHandler: this.stateHandler
    });

    this.particleGenerator = new ParticleGenerator();

    this.backdrop = new Backdrop({
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler
    });

    this.hudHandler = new HudHandler({
      canvasHandler: this.canvasHandler
    });

    this.gameLoop = new GameLoop({
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

    this.dustHandler = new DustHandler({
      canvasHandler: this.canvasHandler
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
      canvasHandler: this.canvasHandler,
      particleGenerator: this.particleGenerator
    });

    this.spaceStationHandler = new SpaceStationHandler({
      galaxy: this.galaxy,
      resourceHandler : this.resourceHandler,
      canvasHandler : this.canvasHandler,
      inputHandler: this.inputHandler
    })

    await this.spaceStationHandler.invoke();
    await this.speechHandler.invoke();
    await this.proceduralMusic.fetchAudioAssets();
    await this.playerShipHandler.invoke();
    await this.playerShipHandler.create();
    await this.enemyShipHandler.invoke();
    await this.asteroidHandler.invoke();

    this.stateHandler.trigger(StateHandler.actions.startGame);
  }


  // global
  subscribeForGlobalEvents = ()=>{
    ns.init.subscribeForGlobalEvents((event)=>{

      switch(event.message){

        case "tab deactivated" : {
          //StateHandler.instance.currentState.stage.pause();
          break;
        }

        case  "tab inactive" : {
          //StateHandler.instance.currentState.stage.resume();
          break;
        }
      }

    })
  }

}