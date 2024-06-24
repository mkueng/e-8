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
      document.querySelector("#game").style.display = "block";
      //document.addEventListener("keydown", this.startMusic, true);
       //this.settingsHandler.showSettings();
    })
  }

  startGame = ()=>{
    /*
    this.gameState = this.stateHandler.getState().name;
    this.gameLoop.start();
    this.asteroidHandler.createAsteroids(10000,10);
    this.enemyShipHandler.startCreation(5000);

     */
  }

  pauseGame = ()=>{
    this.gameState = this.stateHandler.getState().name;
    this.gameLoop.pause();
  }

  restartGame = () =>{
    this.gameState = this.stateHandler.getState().name;
    this.gameLoop.restart();
  }

  startMusic = ()=>{
      SoundHandler.playMusic();
      document.removeEventListener("keydown", this.startMusic, true);
  }


  initGame = async ()=> {

    // loading scripts
    await Scripts.getInstance().loadScripts();
    // local storage
    this.localStorageHandler = new LocalStorageHandler();

    // fonts
    this.fontHandler = new FontHandler();
    await this.fontHandler.loadFont();

    // resize image worker
    const resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');

    // sound
    SoundHandler.setFXGain({percentage: 0.0});
    SoundHandler.setMusicGain({percentage: 0});

    this.stateHandler = new StateHandler(this);
    this.speechHandler = new SpeechHandler();
    this.infoHandler = new InfoHandler()
    this.inputHandler = new InputHandler();
    this.resourceHandler = new ResourceHandler();
    this.canvasHandler = new CanvasHandler();
    this.settingsHandler = new SettingsHandler({
      localStorageHandler: this.localStorageHandler,
      inputHandler: this.inputHandler,
      canvasHandler: this.canvasHandler,
      stateHandler: this.stateHandler
    });
    this.poiHandler = new POIHandler({resourceHandler: this.resourceHandler, inputHandler: this.inputHandler, canvasHandler: this.canvasHandler});
    await this.poiHandler.init();
    this.hudHandler = new HudHandler({
      canvasHandler: this.canvasHandler
    });

    this.gameLoop = new GameLoop({
      hudHandler: this.hudHandler
    });

    this.hazeHandler = new HazeHandler({
      gameLoop: this.gameLoop,
      canvasHandler: this.canvasHandler,
      resizeImageWorker
    });

    this.proceduralMusic = new ProceduralMusic();
    this.terminal = new Terminal(this.resourceHandler, this.canvasHandler);
    await this.terminal.init();
    this.particleGenerator = new ParticleGenerator();
    this.propulsionFactory = new PropulsionFactory({resourceHandler:this.resourceHandler});
    await this.propulsionFactory.fetchResources();
    this.engineTrailFactory = new EngineTrailFactory({canvasHandler:this.canvasHandler,resourceHandler:this.resourceHandler});
    this.weaponFactory = new WeaponFactory({resourceHandler:this.resourceHandler});
    await this.weaponFactory.init();
    this.fuelFactory = new FuelFactory();
    this.shieldFactory = new ShieldFactory({resourceHandler:this.resourceHandler});
    await this.shieldFactory.fetchResources();
    this.explosionFactory = new ExplosionFactory({resourceHandler:this.resourceHandler});
    await this.explosionFactory.invoke();


    this.backdrop = new Backdrop({
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler
    });

    this.galaxy = new Galaxy({
      gameLoop: this.gameLoop,
      canvasHandler: this.canvasHandler,
      scale: 200
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
      hudHandler: this.hudHandler,
      propulsionFactory: this.propulsionFactory,
      weaponFactory: this.weaponFactory,
      shieldFactory: this.shieldFactory,
      explosionFactory: this.explosionFactory,
      fuelFactory: this.fuelFactory,
      engineTrailFactory: this.engineTrailFactory

    });
    this.enemyShipHandler = new EnemyShipHandler({
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler,
      particleGenerator: this.particleGenerator
    });

    this.freighterHandler = new FreighterHandler({
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler,
      particleGenerator: this.particleGenerator,
      propulsionFactory: this.propulsionFactory,
      engineTrailFactory: this.engineTrailFactory
    });


    this.spaceStationHandler = new SpaceStationHandler({
      galaxy: this.galaxy,
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler,
      inputHandler: this.inputHandler,
      poiHandler: this.poiHandler
    })

    await this.spaceStationHandler.init();
    await this.speechHandler.invoke();
    await this.proceduralMusic.fetchAudioAssets();
    await this.freighterHandler.init();
    await this.playerShipHandler.create();

    await this.freighterHandler.create();

    await this.asteroidHandler.invoke();

    this.stateHandler.trigger(StateHandler.actions.startGame);
    await this.enemyShipHandler.invoke();
  }


  // global
  subscribeForGlobalEvents = () => {
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