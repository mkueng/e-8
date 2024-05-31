'use strict'
class Init {

  constructor(){
  }


  initApp= async ()=>{
    await this.#loadScripts();
    await this.createComponents();
    await this.#invokeComponents();
    this.#initEventListeners();

    e8.global.gameController = new GameController({
      gameLoop: this.gameLoop,
      terminal: this.terminal
    });
    e8.global.stateHandler = new StateHandler();
    e8.global.stateHandler.trigger(StateHandler.actions.startGame);
  }

  #loadScripts = async()=>{
    await Scripts.getInstance().loadScripts();
  }

  #initEventListeners = () =>{

    // window resize
    window.addEventListener(e8.global.events.resize, (evt) => {
      e8.global.currentWidth = window.innerWidth;
      e8.global.currentHeight = window.innerHeight;

      e8.global.screenWidth = Math.max(e8.global.minWidth, Math.min(e8.global.currentWidth, e8.global.maxWidth));
      e8.global.screenHeight = Math.max(e8.global.minHeight, Math.min(e8.global.currentHeight, e8.global.maxHeight));
      e8.global.publishEvent({message:e8.global.events.resize, payload: {
        width:e8.global.screenWidth,
        height: e8.global.screenHeight
      }});
    })

    // visibility change
    window.addEventListener(e8.global.events.visibilityChange, (evt) => {
      e8.global.tabIsActive = !e8.global.tabIsActive;
      if (e8.global.tabIsActive) {
        e8.global.publishEvent({message: "tabActive", payload:null})
      } else {
        e8.global.publishEvent({message: "tabInactive", payload:null})
      }
    })

  }

  #invokeComponents = async() =>{
    await this.fontHandler.loadFont();
    await this.poiHandler.invoke();
    await this.terminal.invoke();
    await this.propulsionFactory.fetchResources();
    await this.weaponFactory.invoke();
    await this.shieldFactory.fetchResources();
    await this.explosionFactory.invoke();

    await this.spaceStationHandler.invoke();
    await this.speechHandler.invoke();
    await this.proceduralMusic.fetchAudioAssets();
    await this.freighterHandler.invoke();
    await this.playerShipHandler.create();

    await this.freighterHandler.create();

    await this.asteroidHandler.invoke();
    await this.enemyShipHandler.invoke();
  }

  createComponents = async()=>{
    this.localStorageHandler = new LocalStorageHandler();
    this.fontHandler = new FontHandler();
    this.resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');

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
    this.poiHandler = new POIHandler({
      resourceHandler: this.resourceHandler,
      inputHandler: this.inputHandler,
      canvasHandler: this.canvasHandler
    });
    this.hudHandler = new HudHandler({
      canvasHandler: this.canvasHandler
    });

    this.gameLoop = new GameLoop({
      hudHandler: this.hudHandler
    });
    this.hazeHandler = new HazeHandler({
      gameLoop: this.gameLoop,
      canvasHandler: this.canvasHandler,
      resizeImageWorker: this.resizeImageWorker
    });
    this.proceduralMusic = new ProceduralMusic();
    this.terminal = new Terminal({
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler
    });
    this.particleGenerator = new ParticleGenerator();
    this.propulsionFactory = new PropulsionFactory({
      resourceHandler:this.resourceHandler
    });
    this.engineTrailFactory = new EngineTrailFactory({
      canvasHandler:this.canvasHandler,
      resourceHandler:this.resourceHandler
    });
    this.weaponFactory = new WeaponFactory({
      resourceHandler:this.resourceHandler
    });
    this.fuelFactory = new FuelFactory();
    this.shieldFactory = new ShieldFactory({
      resourceHandler:this.resourceHandler
    });
    this.explosionFactory = new ExplosionFactory({
      resourceHandler:this.resourceHandler
    });
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
      resizeImageWorker: this.resizeImageWorker
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

  }

}
