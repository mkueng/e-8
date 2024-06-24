'use strict'
class App {

  #gameController;
  constructor() {
  }

  init = async () => {
    await this.#loadScripts();
    SoundHandler.setFXGain({percentage: 0.8});
    SoundHandler.setMusicGain({percentage: 0.1});
    this.#createGlobalFactories();
    this.#createGlobalHandlers();
    await this.#initGlobalFactories();
    await this.#initGlobalHandlers();
    this.#initEventListeners();
    this.screen = new Screen();
    this.screen.init();
    e8.global.gameLoop = new GameLoop();
  }

  startGame = async()=>{
    this.#gameController = new GameController();
    await this.#gameController.init();
    await this.#gameController.startGame();

    document.addEventListener("keydown", this.startMusic, true);
    document.addEventListener("mousedown", this.startMusic, true);
  }

  pauseGame = ()=>{
    this.gameState = e8.global.stateHandler.getState().name;
    e8.global.gameLoop.pause();
  }

  restartGame = () =>{
    this.gameState = e8.global.stateHandler.getState().name;
    e8.global.gameLoop.restart();
  }

  startMusic = ()=>{
    SoundHandler.playMusic();
    document.removeEventListener("keydown", this.startMusic, true);
    document.removeEventListener("mousedown", this.startMusic, true);
  }

  #loadScripts = async() =>{
    await Scripts.getInstance().loadScripts();
  }

  #initEventListeners = () =>{
    window.addEventListener(e8.global.events.resize, (evt) => {
      e8.global.currentWidth = window.innerWidth;
      e8.global.currentHeight = window.innerHeight;

      e8.global.screenWidth = Math.max(e8.global.minWidth, Math.min(e8.global.currentWidth, e8.global.maxWidth));
      e8.global.screenHeight = Math.max(e8.global.minHeight, Math.min(e8.global.currentHeight, e8.global.maxHeight));
      e8.global.publishEvent({
        message:e8.global.events.resize,
        payload: {
          width:e8.global.screenWidth,
          height: e8.global.screenHeight
        }
      });
    })

    window.addEventListener(e8.global.events.visibilityChange, (evt) => {
      e8.global.tabIsActive = !e8.global.tabIsActive;
      if (e8.global.tabIsActive) {
        e8.global.publishEvent({message: "tabActive", payload:null})
      } else {
        e8.global.publishEvent({message: "tabInactive", payload:null})
      }
    })
  }

  /**
   *
   * @returns {Promise<void>}
   */
  #initGlobalFactories = async ()=>{
    await e8.global.weaponFactory.init();
    await e8.global.propulsionFactory.fetchResources();
    await e8.global.shieldFactory.fetchResources();
    await e8.global.explosionFactory.invoke();
  }

  /**
   *
   * @returns {Promise<void>}
   */
  #initGlobalHandlers = async()=>{
    await e8.global.fontHandler.init();
    await e8.global.poiHandler.init();
    await e8.global.terminal.init();
    await e8.global.spaceStationHandler.init();


  }

  /**
   * Creates global factories
   */
  #createGlobalFactories = ()=> {
    e8.global.weaponFactory = new WeaponFactory();
    e8.global.propulsionFactory = new PropulsionFactory();
    e8.global.shieldFactory = new ShieldFactory();
    e8.global.explosionFactory = new ExplosionFactory();
    e8.global.engineTrailFactory = new EngineTrailFactory();
    e8.global.fuelFactory = new FuelFactory();
  }

  /**
   * Creates global handlers
   */
  #createGlobalHandlers = ()=>{
    e8.global.resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');
    e8.global.stateHandler = new StateHandler();
    e8.global.resourceHandler = new ResourceHandler();
    e8.global.canvasHandler = new CanvasHandler();
    e8.global.localStorageHandler = new LocalStorageHandler();
    e8.global.fontHandler = new FontHandler();
    e8.global.inputHandler = new InputHandler();
    e8.global.settingsHandler = new SettingsHandler();
    e8.global.speechHandler = new SpeechHandler();
    e8.global.infoHandler = new InfoHandler();
    e8.global.poiHandler = new POIHandler();
    e8.global.dustHandler = new DustHandler();
    e8.global.asteroidHandler = new AsteroidHandler();
    e8.global.hazeHandler = new HazeHandler();
    e8.global.proceduralMusic = new ProceduralMusic();
    e8.global.terminal = new Terminal();
    e8.global.particleGenerator = new ParticleGenerator();
    e8.global.backdrop = new Backdrop();
    e8.global.spaceStationHandler = new SpaceStationHandler();
    e8.global.hudHandler = new HudHandler();

  }
}