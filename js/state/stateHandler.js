'use strict'

/**
 * singleton
 */
class StateHandler{

  static instance = new this();

  #currentState = null;

  invoke(){
  }

  get currentState() {
    return this.#currentState;
  }

  set currentState(state) {
    this.#currentState = state;
  }
}