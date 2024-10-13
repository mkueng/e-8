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
    console.log(`%centering state: ${this.#name}`, 'color: lightblue;');
  }

  exit() {
    console.log(`%cexiting state: ${this.#name}`, 'color: lightblue;');
  }
}

