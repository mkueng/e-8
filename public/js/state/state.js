class State {

  #transitions;
  #name;

  get name() {
    return this.#name;
  }

  get transitions(){
    return this.#transitions;
  }

  constructor(name, gameController){
    this.#name = name;
    this.#transitions = {};
  }


  addTransition(action, nextState){
    this.#transitions[action] = nextState;
  }

  enter() {
    console.log(`%centering state: ${this.#name}`, 'color: yellow;');
  }

  exit() {
    console.log(`%cexiting state: ${this.#name}`, 'color: orange;');
  }
}

