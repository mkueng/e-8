'use strict'

class GameController {

  //static music = new Audio("../resources/music/backgroundmusic.mp3");

  constructor() {

    this.startGame().then((r)=>{
      console.log("game started");
    })
  }

  startGame = async ()=>{
    FontHandler.instance.invoke();
    ResourceHandler.instance.invoke();
    CanvasHandler.instance.invoke();
    InfoHandler.instance.invoke();
    InputHandler.instance.invoke();

    await FontHandler.instance.loadFont();
    new Backdrop();
    const galaxy = new Galaxy({
      scale : 200
    });
    HudHandler.instance.init();
    const resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');
    await HazeHandler.instance.invoke(resizeImageWorker).create();

    PlayerShipHandler.instance.invoke();
    await PlayerShipHandler.instance.create();
    await EnemyShipHandler.instance.invoke();





    GameLoop.instance.invoke();
    setTimeout(()=>{
      GameLoop.instance.start();
      EnemyShipHandler.instance.startCreation();
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