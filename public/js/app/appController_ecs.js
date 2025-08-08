'use strict'

/**
 * @class AppController_ecs
 */
class AppController_ecs {

  #gameController;
  #stateHandler;
  #resourceHandler;
  #canvasHandler;
  #localStorageHandler;
  #fontHandler;
  #inputHandler;
  #soundHandler;
  #settingsHandler;
  #speechHandler;
  #infoHandler;
  #factoryHandler;
  #proceduralMusic;
  #resizeImageWorker;

  /**
   * @name AppController_ecs
   */
  constructor() {
  }

  /**
   * Initializes the application controller
   * @returns {Promise<void>}
   */
  init = async () => {
    await this.#loadScripts();
    this.#createHandlers();
    this.#stateHandler.setState("AppStarted");

    this.#createWorkers();


    await this.#initHandlers();
    this.#initEventListeners();

    SoundHandler.setFXGain({percentage: 0});
    SoundHandler.setMusicGain({percentage: 0});

    this.#stateHandler.setState("AppInitialized");

    await this.#stateHandler.trigger(StateHandler.actions.initializeGame);
    await this.#stateHandler.trigger(StateHandler.actions.startGame);

  }

  /**
   * Initializes the game controller
   * @returns {Promise<void>}
   */
  initGame = async()=>{
    this.#gameController = new GameController_ecs({
      inputHandler: this.#inputHandler,
      resourceHandler: this.#resourceHandler,
      canvasHandler: this.#canvasHandler,
      resizeImageWorker: this.#resizeImageWorker,
      factoryHandler: this.#factoryHandler
    });

    await this.#gameController.init();
  }

  /**
   *
   * @returns {Promise<void>}
   */
  startGame = async()=>{
    await this.#gameController.startGame();
    document.querySelector("#loading").style.display = "none";
    document.querySelector("#game").style.display = "block";
  }

  /**
   * Starts the music when the user interacts with the page
   */
  startMusic = ()=>{
    //SoundHandler.playMusic();
  }

  /**
   * Loads necessary scripts for the application
   * @returns {Promise<void>}
   */
  #loadScripts = async() =>{
    await Scripts.getInstance().loadScripts();
  }

  /**
   * Initializes event listeners for window resize and visibility change
   */
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
   * Initializes handlers
   * @returns {Promise<void>}
   */
  #initHandlers = async()=>{
    await this.#fontHandler.init();
    await this.#canvasHandler.initCanvases();
  }

  /**
   * Creates web workers
   */
  #createWorkers = ()=>{
    this.#resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');
  }

  /**
   * Creates handlers
   */
  #createHandlers = ()=>{
    this.#stateHandler = new StateHandler();
    this.#resourceHandler = new ResourceHandler({ resourcesBasePath: "" });
    this.#canvasHandler = new CanvasHandler();
    this.#soundHandler = new SoundHandler();
    this.#localStorageHandler = new LocalStorageHandler();
    this.#fontHandler = new FontHandler();
    this.#inputHandler = new InputHandler();
    this.#speechHandler = new SpeechHandler();
    this.#infoHandler = new InfoHandler();
    this.#proceduralMusic = new ProceduralMusic();
    this.#settingsHandler = new SettingsHandler({
      localStorageHandler: this.#localStorageHandler,
      inputHandler: this.#inputHandler
    });
    this.#factoryHandler = new FactoryHandler({
      resourceHandler: this.#resourceHandler,
      canvasHandler: this.#canvasHandler
    });
  }
}