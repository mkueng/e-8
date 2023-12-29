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

  //static music = new Audio("../resources/music/E-8.space_RUSH.mp3");

  constructor() {


    this.startGame().then((r)=>{
      console.log("game started");
      document.addEventListener("keydown", this.startMusic, true);
    })
  }

  startMusic = ()=>{
    console.log("start music");
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance('Hello, I am a robotic female voice.');

    // Set the language to English (United States)
    utterance.lang = 'en-US';

    // Specify a female voice
    var voices = synth.getVoices();
    var femaleVoice = voices.find(voice => voice.name === 'Google US English Female');

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    } else {
      console.error('Female voice not found.');
    }

    // Customize the speech synthesis parameters
    utterance.pitch = 0.5; // Adjust pitch (0.1 to 2)
    utterance.rate = 0.8; // Adjust rate (0.1 to 10)
    utterance.volume = 1.0; // Adjust volume (0 to 1)

    // Speak the text
    synth.speak(utterance);
    document.removeEventListener("keydown", this.startMusic, true);
    //this.proceduralMusic.testplay();

/*
    if (GameController.music.paused) {
      GameController.music.play().then(()=>{
        document.removeEventListener("keydown", this.startMusic, true);
      });
    }*/
  }


  startGame = async ()=>{
    const resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');

    SoundHandler.setGain();
    this.speechHandler = new SpeechHandler()
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

    await this.speechHandler.invoke();
    await this.proceduralMusic.fetchAudioAssets();
    await this.playerShipHandler.create();
    await this.enemyShipHandler.invoke();
    await this.asteroidHandler.invoke();
   this.hazeHandler.create();
    this.asteroidHandler.createAsteroid(10000,10);
    //document.addEventListener("keydown", this.startMusic, true);


    setTimeout(()=>{

      this.gameLoop.start();
      this.enemyShipHandler.startCreation(100);
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