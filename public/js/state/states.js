class GameStarted extends State{
  constructor(name, gameController){
    super(name, gameController);

    this.addTransition('pauseGame', 'GamePaused');
    this.addTransition('endGame', 'GameEnded');
  }

  enter(){
    try {
      super.gameController.startGame();
    } catch(e){
      console.error(e);
    }
    super.enter();
  }

  exit(){
    super.exit();
  }
}

class AppStarted extends State {
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

class AppEnded extends State {
  constructor(name, gameController) {
    super(name, gameController);

  }

  enter() {
    super.enter();
  }

}
