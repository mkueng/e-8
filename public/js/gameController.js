class GameController {

    #dustHandler;
    #asteroidHandler;
    #hazeHandler;
    #playerShipHandler;
    #enemyShipHandler;
    #freighterHandler;
    #poiHandler;
    #terminal;
    #particleGenerator;
    #backdrop;
    #spaceStationHandler;
    #scanner;
    #galaxy;
    #game;
    #inputHandler


    constructor({
      inputHandler,
      resourceHandler,
      canvasHandler,
      resizeImageWorker
                }) {
        Object.assign(this, {
            inputHandler,
            resourceHandler,
            canvasHandler,
            resizeImageWorker
        });
    }

    init = async () =>{

        this.createFactories();
        await this.initFactories();

        // galaxy
        this.#galaxy = new Galaxy({
            scale:e8.global.scaleOfGalaxy,
            canvasHandler:this.canvasHandler,
            inputHandler: this.inputHandler
        });
        this.#galaxy.init();

        // dust
        this.#dustHandler = new DustHandler({
            canvasHandler: this.canvasHandler
        });
        await this.#dustHandler.init();

        // asteroids
        this.#asteroidHandler = new AsteroidHandler({
            canvasHandler: this.canvasHandler,
            resourceHandler: this.resourceHandler
        });
        this.#asteroidHandler.init();

        // haze
        this.#hazeHandler = new HazeHandler({
            canvasHandler: this.canvasHandler,
            resizeImageWorker: this.resizeImageWorker
        });
        await this.#hazeHandler.init();

        //hud
        this.#scanner = new Scanner({
            galaxy: this.#galaxy,
            canvasHandler: this.canvasHandler

        });
        await this.#scanner.init();

        // player ship
        this.#playerShipHandler = new PlayerShipHandler({
            inputHandler: this.inputHandler,
            canvasHandler: this.canvasHandler,
            playerShipFactory: this.playerShipFactory

        });
        this.#playerShipHandler.init();

        //particleGenerator
        this.#particleGenerator = new ParticleGenerator();

        // enemy ships
        this.#enemyShipHandler = new EnemyShipHandler({
            canvasHandler: this.canvasHandler,
            particleGenerator:this.#particleGenerator,
            resourceHandler: this.resourceHandler,
            propulsionFactory: this.propulsionFactory,
            shieldFactory: this.shieldFactory,
            explosionFactory: this.explosionFactory,
            weaponFactory: this.weaponFactory
        });
        await this.#enemyShipHandler.init();

        // freighters
        this.#freighterHandler = new FreighterHandler({
            canvasHandler: this.canvasHandler,
            resourceHandler: this.resourceHandler,
            propulsionFactory: this.propulsionFactory,
            engineTrailFactory: this.engineTrailFactory

        });
        await this.#freighterHandler.init();

        //POI
        this.#poiHandler = new POIHandler({
            inputHandler: this.inputHandler,
            poiFactory: this.poiFactory

        });

        //terminal
        this.#terminal = new Terminal({
            canvasHandler: this.canvasHandler,
            resourceHandler: this.resourceHandler
        })

        //backdrop
        this.#backdrop = new Backdrop({
            canvasHandler: this.canvasHandler
        });

        //spaceStation
        this.#spaceStationHandler = new SpaceStationHandler({
            canvasHandler: this.canvasHandler,
            resourceHandler: this.resourceHandler,
            poiHandler: this.#poiHandler,
            inputHandler: this.inputHandler
        });


        this.#game = new Game({
            poiHandler: this.#poiHandler,
            terminal: this.#terminal,
            spaceStationHandler: this.#spaceStationHandler,
            dustHandler: this.#dustHandler,
            playerShipHandler: this.#playerShipHandler,
            asteroidHandler: this.#asteroidHandler,
            hazeHandler: this.#hazeHandler,
            enemyShipHandler: this.#enemyShipHandler,
            freighterHandler: this.#freighterHandler
        });

    }

    initFactories = async () =>{
        await this.weaponFactory.init();
        await this.propulsionFactory.init();
        await this.shieldFactory.init();
        await this.explosionFactory.init();
    }

    createFactories = () => {


        this.engineTrailFactory = new EngineTrailFactory({
            resourceHandler: this.resourceHandler
        });

        this.propulsionFactory = new PropulsionFactory({
            resourceHandler: this.resourceHandler
        });

        this.explosionFactory = new ExplosionFactory({
            resourceHandler: this.resourceHandler
        });

        this.shieldFactory = new ShieldFactory({
            resourceHandler: this.resourceHandler
        });

        this.weaponFactory = new WeaponFactory({
            resourceHandler: this.resourceHandler
        });

        this.fuelFactory = new FuelFactory({
            resourceHandler: this.resourceHandler
        });


        this.playerShipFactory = new PlayerShipFactory({
            resourceHandler: this.resourceHandler,
            canvasHandler: this.canvasHandler,
            engineTrailFactory: this.engineTrailFactory,
            propulsionFactory: this.propulsionFactory,
            explosionFactory: this.explosionFactory,
            shieldFactory: this.shieldFactory,
            weaponFactory: this.weaponFactory,
            fuelFactory: this.fuelFactory
        })


        this.poiFactory = new PoiFactory({})

    }

    startGame = async ()=>{
        await this.#game.start();
    }

    pauseGame = ()=>{
        this.#game.pause();
    }

    restartGame = ()=>{
        this.#game.restart();
    }
}