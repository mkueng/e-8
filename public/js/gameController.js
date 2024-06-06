class GameController {

    #game;
    #playerShipHandler;
    #enemyShipHandler;
    #galaxy;


    constructor() {

        //this.stateHandler.trigger(StateHandler.actions.startGame);
    }

    init = async () =>{

        // galaxy
        this.#galaxy = new Galaxy({scale:200});
        this.#galaxy.init();

        // dust
        await e8.global.dustHandler.init();
        e8.global.dustHandler.invokeDust();

        // asteroids
        await e8.global.asteroidHandler.init();
        e8.global.asteroidHandler.invokeAsteroids(1000,10);

        // haze
        await e8.global.hazeHandler.init();
        e8.global.hazeHandler.invokeHaze();

        this.#playerShipHandler = new PlayerShipHandler();
        this.#enemyShipHandler = new EnemyShipHandler();
        //await this.#enemyShipHandler.invoke();

        this.game = new Game({});
        document.querySelector("#game").style.display = "block";
    }

    startGame =  ()=>{
        this.game.start();
    }



}