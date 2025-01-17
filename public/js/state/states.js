class FTLTravelStarted extends State {
  constructor(name, gameController) {
    super(name, gameController);

    this.addTransition('startFTLTravel', 'FTLTravelStarted');
    this.addTransition('endFTLTravel', 'FTLTravelEnded');
  }

  enter() {
    super.enter();
  }

  exit() {
    super.exit();
  }
}


/**
 * GameInitialized state
 */
class GameInitialized extends State{
  constructor(name){
    super(name);
    this.addTransition('startGame', 'GameStarted');

  }

  async enter(){
    try {
      await e8.global.appController.initGame();
    } catch(e){
      console.error(e);
    }
    super.enter();
  }

  exit(){
    super.exit();
  }
}


/**
 * GameStarted state
 */
class GameStarted extends State{
  constructor(name, gameController){
    super(name);

    this.addTransition('pauseGame', 'GamePaused');
    this.addTransition('endGame', 'GameEnded');
  }

  async enter(){
    try {
      await e8.global.appController.startGame();
    } catch(e){
      console.error(e);
    }
    super.enter();
  }

  exit(){
    super.exit();
  }
}

/**
 * AppInitialized state
 */
class AppInitialized extends State {
  constructor(name) {
    super(name);

    this.addTransition('initializeGame', 'GameInitialized');
    this.addTransition('endApp', 'AppEnded');
  }

  enter() {
    super.enter();
  }

  exit() {
    super.exit();
  }
}

/**
 * AppStarted state
 */
class AppStarted extends State {
  constructor(name, gameController) {
    super(name, gameController);
    this.addTransition('endApp', 'AppEnded');
  }
  enter() {
    super.enter();
  }
  exit() {
    super.exit();
  }
}

/**
 * GamePaused state
 */
class GamePaused extends State {
  constructor(name, gameController) {
    super(name, gameController);

    this.addTransition('restartGame', 'GameRestarted');
    this.addTransition('endGame', 'GameEnded');
  }

  enter() {
    super.gameController.pauseGame();
    super.enter();
  }

  exit() {
    super.exit();
  }
}

/**
 * GameRestarted state
 */
class GameRestarted extends State {
  constructor(name, gameController) {
    super(name, gameController);

    this.addTransition('pauseGame', 'GamePaused');
    this.addTransition('endGame', 'GameEnded');
  }

  enter() {
    super.gameController.restartGame();
    super.enter();
  }

  exit() {
    super.exit();
  }
}

/**
 * GameEnded state
 */
class GameEnded extends State {
  constructor(name, gameController) {
    super(name, gameController);

    this.addTransition('startGame', 'GameStarted');
    this.addTransition('endApp', 'AppEnded');
  }

  enter() {
    super.enter();
  }

  exit() {
    super.exit();
  }
}

/**
 * AppEnded state
 */
class AppEnded extends State {
  constructor(name, gameController) {
    super(name, gameController);

  }

  enter() {
    super.enter();
  }

}
