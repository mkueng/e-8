'use strict'
class StateHandler{

  #fsm;
  #gameController;
  #states

  static actions ={
    startGame: "startGame",
    pauseGame: "pauseGame",
    restartGame: "restartGame",
    endGame: "endGame",
    endApp: "endApp"

  }

  constructor(gameController){
    this.#gameController = gameController;
    this.#fsm = new FiniteStateMachine();
    this.#states = [
      { name: 'AppStarted', instance: new AppStarted('AppStarted', gameController) },
      { name: 'GameStarted', instance: new GameStarted('GameStarted', gameController) },
      { name: 'GamePaused', instance: new GamePaused('GamePaused', gameController) },
      { name: 'GameRestarted', instance: new GameRestarted('GameRestarted', gameController) },
    ];

    this.#fsm.registerStates(this.#states);
    this.#fsm.setState('AppStarted');


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
