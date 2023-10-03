class GameController {

  //static music = new Audio("../resources/music/backgroundmusic.mp3");

  constructor() {
    ShipHandler.instance.invoke();
    StateHandler.instance.invoke();
    ResourceHandler.instance.invoke();
    FontHandler.instance.invoke();

    CanvasHandler.instance.invoke();

    InfoHandler.instance.invoke();
    //BackgroundHandler.instance.invoke();

    StateHandler.instance.currentState = new State(ShipHandler.instance.activeShip, new Stage_01());
    let proceduralPlanet = new ProceduralPlanet();
    //proceduralPlanet.init();

    

    ProceduralShipFactory.instance.invoke();
    let ship = ProceduralShipFactory.instance.createShip("enemy");



    /*
    Promise.all([FontHandler.instance.loadFont(), StateHandler.instance.currentState.stage.init()]).then(results => {
      StateHandler.instance.currentState.stage.activate();
      this.subscribeForGlobalEvents();
    })

     */
  }


  subscribeForGlobalEvents = ()=>{
    ns.init.subscribeForGlobalEvents((event)=>{

      switch(event.message){

        case "tab deactivated" : {
          StateHandler.instance.currentState.stage.pause();
        }

        case  "tab inactive" : {
          StateHandler.instance.currentState.stage.resume();
          break;
        }
      }

    })
  }

}