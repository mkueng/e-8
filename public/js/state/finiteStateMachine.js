class FiniteStateMachine {

  constructor(){
    this.states = {};
    this.currentState = null;
  }

  registerStates = (states) => {
    for (const state of states) {
      this.addState(state.name, state.instance)
    }
  }

  addState = (name,state) => {
    this.states[name] = state;
  }

  getState = () => {
    return this.currentState;
  }

  setState = (name) => {
    if (this.states[name]) {
      if (this.currentState) {
        this.currentState.exit();
      }

      this.currentState = this.states[name];
      this.currentState.enter();
    } else {
      console.error(`State "${name}" not found.`);
    }

    return this.currentState;
  }

  trigger = (action) => {
    console.log(action);
    if (this.currentState && this.currentState.transitions[action]) {
      const nextState = this.currentState.transitions[action];
      this.setState(nextState);
    } else {
      console.error(`Invalid action "${action}" for current state: "${this.currentState.name}"`);
    }
    return this.currentState;
  }
}