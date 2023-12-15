'use strict'

class GameController {

  //static music = new Audio("../resources/music/backgroundmusic.mp3");

  constructor() {
    this.startGame().then((r)=>{
      console.log("game started");
    })
  }

  startGame = async ()=>{
    const resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');

    const resourceHandler = new ResourceHandler();
    const canvasHandler = new CanvasHandler();
    const infoHandler = new InfoHandler(canvasHandler)
    const inputHandler = new InputHandler();
    const fontHandler = new FontHandler();
    const backdrop = new Backdrop({
      resourceHandler,
      canvasHandler
    });
    const gameLoop = new GameLoop({
      infoHandler
    });
    const galaxy = new Galaxy({
      gameLoop: gameLoop,
      canvasHandler: canvasHandler,
      scale : 200
    });
    const hudHandler = new HudHandler({
      canvasHandler
    });

    const hazeHandler = new HazeHandler({
      gameLoop,
      canvasHandler,
      resizeImageWorker
    });
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



    await fontHandler.loadFont();
    await playerShipHandler.create();
    await enemyShipHandler.invoke();
    hazeHandler.create();



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