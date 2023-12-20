'use strict'

class GameController {

  static music = new Audio("../resources/music/Debutante.mp3");



  constructor() {


    this.startGame().then((r)=>{
      console.log("game started");
      document.addEventListener("keydown", this.startMusic, true);
    })
  }

  startMusic = ()=>{
    console.log("start music");

    if (GameController.music.paused) {
      GameController.music.play().then(()=>{
        document.removeEventListener("keydown", this.startMusic, true);
      });
    }
  }

  startGame = async ()=>{
    const resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');

    const resourceHandler = new ResourceHandler();
    const fontHandler = new FontHandler();
    await fontHandler.loadFont();
    const canvasHandler = new CanvasHandler();
    const infoHandler = new InfoHandler(canvasHandler)
    const inputHandler = new InputHandler();
    const soundHandler =  new SoundHandler();
    SoundHandler.invokeAudio();
    //SoundHandler.preloadSounds();

    const backdrop = new Backdrop({
      resourceHandler,
      canvasHandler
    });


    const hudHandler = new HudHandler({
      canvasHandler
    });

    const gameLoop = new GameLoop({
      infoHandler,
      hudHandler
    });
    const galaxy = new Galaxy({
      gameLoop: gameLoop,
      canvasHandler: canvasHandler,
      scale : 200
    });
    const hazeHandler = new HazeHandler({
      gameLoop,
      canvasHandler,
      resizeImageWorker
    });

    const asteroidHandler = new AsteroidHandler({
      gameLoop,
      canvasHandler,
      resourceHandler,
      resizeImageWorker
    })

    const playerShipHandler = new PlayerShipHandler({
      resourceHandler,
      canvasHandler,
      inputHandler,
      hudHandler
    });
    const enemyShipHandler = new EnemyShipHandler({
      resourceHandler,
      canvasHandler
    });

    await playerShipHandler.create();
    await enemyShipHandler.invoke();
    await asteroidHandler.invoke();
    hazeHandler.create();
    asteroidHandler.createAsteroid(10000,10);



    setTimeout(()=>{
      gameLoop.start();
      enemyShipHandler.startCreation();
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