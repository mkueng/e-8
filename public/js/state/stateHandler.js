'use strict'
class StateHandler{

  #fsm;
  #gameController;
  #states;
  #subscribers = [];

  static actions ={
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
      { name: 'AppStarted', instance: new AppStarted('AppStarted', ) },
      { name: 'GameStarted', instance: new GameStarted('GameStarted', e8.global.gameController) },
      { name: 'GamePaused', instance: new GamePaused('GamePaused', e8.global.gameController) },
      { name: 'GameRestarted', instance: new GameRestarted('GameRestarted', e8.global.gameController) },
      {name:"FTLTravel", instance: new FTLTravel("FTLTravel", e8.global.gameController)},
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
