class GameController {

    #gameLoop;
    #game;
    #playerShipHandler;
    #enemyShipHandler;
    #galaxy;

    constructor() {
    }

    init = async () =>{

        // galaxy
        this.#galaxy = new Galaxy({scale:e8.global.scaleOfGalaxy});
        this.#galaxy.init();

        // dust
        await e8.global.dustHandler.init();

        // asteroids
        await e8.global.asteroidHandler.init();

        // haze
        await e8.global.hazeHandler.init();

        // player ship
        this.#playerShipHandler = new PlayerShipHandler();
        this.#playerShipHandler.init();

        //hud
        this.scanner = new Scanner({galaxy: this.#galaxy});
        await this.scanner.init();

        // enemy ships
        this.#enemyShipHandler = new EnemyShipHandler();
        await this.#enemyShipHandler.init();

        // freighters
        this.freighterHandler = new FreighterHandler();
        await this.freighterHandler.init();

        // game loop
        this.#gameLoop = new GameLoop();

        this.#game = new Game({
            gameLoop: this.#gameLoop,
            dustHandler: e8.global.dustHandler,
            playerShipHandler: this.#playerShipHandler,
            asteroidHandler: e8.global.asteroidHandler,
            hazeHandler: e8.global.hazeHandler,
            enemyShipHandler: this.#enemyShipHandler,
            freighterHandler: this.freighterHandler
        });

    }

    startGame = async ()=>{
        await this.#game.start();
    }
}