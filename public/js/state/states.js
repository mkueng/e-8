'use strict';

/**
 * @name FTLTravelStarted
 */
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
 * @name GameInitialized
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
 * @name GameStarted
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
 * @name AppInitialized
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
 * @name AppStarted
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
 * @name GamePaused
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
 * @name GameRestarted
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
 * @name GameEnded
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
 * @name AppEnded
 */
class AppEnded extends State {
  constructor(name, gameController) {
    super(name, gameController);

  }

  enter() {
    super.enter();
  }

}
