class GameController {

    #game;
    #playerShipHandler;
    #enemyShipHandler;


    constructor() {





        //this.stateHandler.trigger(StateHandler.actions.startGame);
    }

    init = async () =>{
        this.#playerShipHandler = new PlayerShipHandler();
        this.#enemyShipHandler = new EnemyShipHandler();
        await this.#enemyShipHandler.invoke();
        this.game = new Game({
            gameLoop: this.gameLoop
        });
        document.querySelector("#game").style.display = "block";
    }

    startGame =  ()=>{
        this.game.start();
    }



}