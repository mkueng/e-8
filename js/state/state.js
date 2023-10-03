class State {

  #ship = null;
  #stage = null;

  constructor(ship, stage){
    this.#ship = ship;
    this.#stage = stage;
  }

  get ship() {
    return this.#ship;
  }

  set ship(value) {
    this.#ship = value;
  }

  get stage() {
    return this.#stage;
  }

  set stage(value) {
    this.#stage = value;
  }
}

