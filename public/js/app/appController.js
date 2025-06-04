'use strict'
class AppController {

  gameController;
  constructor() {
  }

  init = async () => {
    console.log("scripts loading");
    await this.#loadScripts();
    console.log("scripts loaded");

    SoundHandler.setFXGain({percentage: 0});
    SoundHandler.setMusicGain({percentage: 0});

    this.#createHandlers();
    await this.#initHandlers();

    this.#initEventListeners();

    this.stateHandler.setState("AppInitialized");
    await this.stateHandler.trigger(StateHandler.actions.initializeGame);
    await this.stateHandler.trigger(StateHandler.actions.startGame);
  }

  initGame = async()=>{
  }

  startGame = async()=>{
    this.gameController = new GameController({
      inputHandler: this.inputHandler,
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler,
      resizeImageWorker: this.resizeImageWorker
    });
    await this.gameController.init();
    await this.gameController.startGame();

    document.querySelector("#loading").style.display = "none";
    document.addEventListener("keydown", this.startMusic, true);
    document.addEventListener("mousedown", this.startMusic, true);
  }

  startMusic = ()=>{
    //SoundHandler.playMusic();
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
  #initHandlers = async()=>{
    await this.fontHandler.init();
    await this.canvasHandler.initCanvases();
  }


  /**
   * Creates global handlers
   */
  #createHandlers = ()=>{
    //e8.global.resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');
    this.resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');
    this.stateHandler = new StateHandler();
    this.resourceHandler = new ResourceHandler({ resourcesBasePath: "" });
    this.canvasHandler = new CanvasHandler();
    this.localStorageHandler = new LocalStorageHandler();
    this.fontHandler = new FontHandler();
    this.inputHandler = new InputHandler();
    this.settingsHandler = new SettingsHandler({
      localStorageHandler: this.localStorageHandler,
      inputHandler: this.inputHandler
    });
    this.speechHandler = new SpeechHandler();
    this.infoHandler = new InfoHandler();
    this.proceduralMusic = new ProceduralMusic();

  }
}