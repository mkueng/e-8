class GameController {

    game;
    constructor({
    }) {
        this.resizeImageWorker =new Worker('js/workers/resizeImageWorker.js');
        this.resourceHandler = new ResourceHandler();


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