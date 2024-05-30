class GameController {

    game;
    constructor({
      gameLoop,
      terminal
    }) {
        this.gameLoop = gameLoop;
        this.game = new Game({
            gameLoop: this.gameLoop
        });
        document.querySelector("#game").style.display = "block";

        //this.stateHandler.trigger(StateHandler.actions.startGame);
    }

    startGame =  ()=>{
        this.game.start();
    }



}