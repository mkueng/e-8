'use strict'
class FiniteStateMachine {

  #stateHandler;

  constructor(stateHandler){
    this.#stateHandler = stateHandler;
    this.states = {};
    this.currentState = null;
  }

  /**
   * Register states
   * @param states
   */
  registerStates = (states) => {
    for (const state of states) {
      this.addState(state.name, state.instance)
    }
  }

  /**
   * Add state
   * @param name
   * @param state
   */
  addState = (name,state) => {
    this.states[name] = state;
  }

  /**
   * Get current state
   * @returns {null}
   */
  getState = () => {
    return this.currentState;
  }

  /**
   * Set state
   * @param name
   * @returns {null}
   */
  setState = (name) => {
    if (this.states[name]) {
      if (this.currentState) {
        this.currentState.exit();
        this.#stateHandler.publish(this.currentState);
      }
      this.currentState = this.states[name];
      this.currentState.enter();
      this.#stateHandler.publish(this.currentState);

    } else {
      console.error(`State "${name}" not found.`);
    }

    return this.currentState;
  }

  /**
   * Trigger action
   * @param action
   * @returns {null}
   */
  trigger = (action) => {


    if (this.currentState && this.currentState.transitions[action]) {
      const nextState = this.currentState.transitions[action];
      this.setState(nextState);
    } else {
      console.error(`Invalid action "${action}" for current state: "${this.currentState.name}"`);
    }
    return this.currentState;
  }
}