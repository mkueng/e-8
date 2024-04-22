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
    this.gameState = this.stateHandler.getState().name;
    this.gameLoop.start();
    this.asteroidHandler.createAsteroids(10000,10);
    this.enemyShipHandler.startCreation(5000);
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
    this.localStorageHandler = new LocalStorageHandler();

    const resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');
    //this.utilityWorker = new Worker('js/workers/utility/utilityWorker.js');
    // this.enemyShipWorker = new Worker('js/workers/enemyShip/enemyShipWorker');
    SoundHandler.setFXGain({percentage: 0.0});
    SoundHandler.setMusicGain({percentage: 0});

    this.fontHandler = new FontHandler();
    await this.fontHandler.loadFont();

    await ScriptLoader.loadScript("js/propulsion/propulsionTypes.js");
    await ScriptLoader.loadScript("js/propulsion/propulsion.js");
    await ScriptLoader.loadScript("js/propulsion/propulsionIonA.js");

    await ScriptLoader.loadScript("js/propulsion/propulsionIonC.js");
    await ScriptLoader.loadScript("js/propulsion/propulsionFactory.js");
    await ScriptLoader.loadScript("js/playerShip/playerShipPropertiesClassA.js");
    await ScriptLoader.loadScript("js/playerShip/playerShipPropertiesClassB.js");
    await ScriptLoader.loadScript("js/playerShip/playerShipFactory.js");
    await ScriptLoader.loadScript("js/playerShip/playerShipHandler.js");
    await ScriptLoader.loadScript("js/freighter/freighter.js");


    await ScriptLoader.loadScript("js/freighter/freighterClasses.js");
    await ScriptLoader.loadScript("js/freighter/freighterFactory.js");
    await ScriptLoader.loadScript("js/freighter/freighterHandler.js");

    this.stateHandler = new StateHandler(this);
    this.speechHandler = new SpeechHandler()
    this.resourceHandler = new ResourceHandler();

    this.proceduralMusic = new ProceduralMusic();
    this.canvasHandler = new CanvasHandler();
    this.infoHandler = new InfoHandler()
    this.inputHandler = new InputHandler();

    this.settingsHandler = new SettingsHandler({
      localStorageHandler: this.localStorageHandler,
      inputHandler: this.inputHandler,
      canvasHandler: this.canvasHandler,
      stateHandler: this.stateHandler
    });

    this.particleGenerator = new ParticleGenerator();
    this.propulsionFactory = new PropulsionFactory({resourceHandler:this.resourceHandler});
    await this.propulsionFactory.invoke();
    this.engineTrailFactory = new EngineTrailFactory({canvasHandler:this.canvasHandler,resourceHandler:this.resourceHandler});
    this.weaponFactory = new WeaponFactory({resourceHandler:this.resourceHandler});
    await this.weaponFactory.invoke();
    this.fuelFactory = new FuelFactory();
    this.shieldFactory = new ShieldFactory({resourceHandler:this.resourceHandler});
    await this.shieldFactory.invoke();
    this.explosionFactory = new ExplosionFactory({resourceHandler:this.resourceHandler});
    await this.explosionFactory.invoke();


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
      scale: 200
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
      inputHandler: this.inputHandler
    })

    await this.spaceStationHandler.invoke();
    await this.speechHandler.invoke();
    await this.proceduralMusic.fetchAudioAssets();
    await this.freighterHandler.invoke();
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