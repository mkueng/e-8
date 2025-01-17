'use strict'
class StateHandler{

  #fsm;
  #gameController;
  #states;
  #subscribers = [];

  static actions ={
    initGame: "initGame",
    initializeGame: "initializeGame",
    startGame: "startGame",
    pauseGame: "pauseGame",
    restartGame: "restartGame",
    endGame: "endGame",
    endApp: "endApp",
    startFTLTravel: "startFTLTravel",
    endFTLTravel: "endFTLTravel"

  }

  constructor(){

    this.#fsm = new FiniteStateMachine(this);
    this.#states = [
      { name: 'AppInitialized', instance: new AppInitialized('AppInitialized') },
      { name: 'AppStarted', instance: new AppStarted('AppStarted', ) },
      { name: "GameInitialized", instance: new GameInitialized("GameInitialized")},
      { name: 'GameStarted', instance: new GameStarted('GameStarted') },
      { name: 'GamePaused', instance: new GamePaused('GamePaused') },
      { name: 'GameRestarted', instance: new GameRestarted('GameRestarted') },
      {name:"FTLTravel", instance: new FTLTravelStarted("FTLTravel")},
    ];

    this.#fsm.registerStates(this.#states);
    this.#fsm.setState('AppStarted');
  }

  subscribe(subscriber){
    this.#subscribers.push(subscriber);
  }

  unsubscribe(subscriber){
    this.#subscribers = this.#subscribers.filter(s => s !== subscriber);
  }

  publish(state){
    this.#subscribers.forEach(subscriber => {
      subscriber.trigger(state);
    });
  }

  getState = () =>{
    return this.#fsm.getState();
  }

  setState = (name) =>{
   return this.#fsm.setState(name)
  }

  trigger = (action) =>{
    return this.#fsm.trigger(action);
  }
}
