class State {

  #transitions;
  #name;
  #gameController;


  get name() {
    return this.#name;
  }

  get transitions(){
    return this.#transitions;
  }

  get gameController(){
    return this.#gameController;
  }

  constructor(name, gameController){
    this.#name = name;
    this.#gameController = gameController;
    this.#transitions = {};
  }


  addTransition(action, nextState){
    this.#transitions[action] = nextState;
  }

  enter() {
    console.log(`Entering state: ${this.#name}`);
  }

  exit() {
    console.log(`Exiting state: ${this.#name}`);
  }
}

