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

        // player ship
        this.#playerShipHandler = new PlayerShipHandler();
        this.#playerShipHandler.init();
        await this.#playerShipHandler.createShip();

        // enemy ships
        this.#enemyShipHandler = new EnemyShipHandler();
        await this.#enemyShipHandler.init();
        this.#enemyShipHandler.startCreation(1000);

        this.game = new Game({});
        document.querySelector("#game").style.display = "block";
    }

    startGame =  ()=>{
        this.game.start();
    }



}