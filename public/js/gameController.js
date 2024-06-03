class GameController {

    #game;
    #playerShipHandler;
    #enemyShipHandler;


    constructor() {

        //this.stateHandler.trigger(StateHandler.actions.startGame);
    }

    init = async () =>{

        // dust
        await e8.global.dustHandler.init();
        e8.global.dustHandler.invoke();

        // asteroids
        await e8.global.asteroidHandler.init();
        e8.global.asteroidHandler.invokeAsteroids(1000,10);

        this.#playerShipHandler = new PlayerShipHandler();
        this.#enemyShipHandler = new EnemyShipHandler();
        //await this.#enemyShipHandler.invoke();
        this.gameLoop = new GameLoop();
        this.game = new Game({
            gameLoop: this.gameLoop
        });
        document.querySelector("#game").style.display = "block";
    }

    startGame =  ()=>{
        this.game.start();
    }



}