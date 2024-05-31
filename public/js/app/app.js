'use strict'
class App {

  #gameController;
  constructor() {
  }

  init = async () => {
    await this.#loadScripts();
    this.#createGlobalHandlers();
    await e8.global.fontHandler.init();
    await this.start();
  }

  start = async()=>{


    this.#gameController = new GameController();
  }

  #loadScripts = async() =>{
    await Scripts.getInstance().loadScripts();
  }

  #createGlobalHandlers = ()=>{
    e8.global.stateHandler = new StateHandler();
    e8.global.resourceHandler = new ResourceHandler();
    e8.global.localStorageHandler = new LocalStorageHandler();
    e8.global.fontHandler = new FontHandler();
    e8.global.inputHandler = new InputHandler();
    e8.global.settingsHandler = new SettingsHandler();
    e8.global.cnavasHandler = new CanvasHandler();
    e8.global.speechHandler = new SpeechHandler();
    e8.global.infoHandler = new InfoHandler();
    e8.global.poiHandler = new POIHandler();
    e8.global.hudHandler = new HudHandler();
    e8.global.dustHandler = new DustHandler();
    e8.global.asteroidHandler = new AsteroidHandler();
    e8.global.gameLoop = new GameLoop();
    e8.global.hazeHandler = new HazeHandler();
    e8.global.proceduralMusic = new ProceduralMusic();
    e8.global.terminal = new Terminal();
    e8.global.particleGeneratore = new ParticleGenerator();
    e8.global.backdrop = new Backdrop();
    e8.global.weaponFactory = new WeaponFactory();
    e8.global.propulsionFactory = new PropulsionFactory();
    e8.global.shieldFactory = new ShieldFactory();
    e8.global.explosionFactory = new ExplosionFactory();
    e8.global.fuelFactory = new FuelFactory();
    e8.global.engineTrailFactory = new EngineTrailFactory();
    e8.global.playerShipHandler = new PlayerShipHandler();
    e8.global.enemyShipHandler = new EnemyShipHandler();
    e8.global.freighterHandler = new FreighterHandler();
    e8.global.spaceStationHandler = new SpaceStationHandler();
  }


}