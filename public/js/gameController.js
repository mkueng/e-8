class GameController {

    #dustHandler;
    #asteroidHandler;
    #hazeHandler;
    #playerShipHandler;
    #enemyShipHandler;
    #freighterHandler;
    #canvasHandler;
    #resourceHandler;
    #poiHandler;
    #terminal;
    #particleGenerator;
    #backdrop;
    #spaceStationHandler;
    #scanner;
    #galaxy;
    #game;
    #inputHandler;
    #weaponFactory;
    #shieldFactory;
    #propulsionFactory;
    #explosionFactory;
    #engineTrailFactory;
    #playerShipFactory;
    #fuelFactory;
    #poiFactory;
    #resizeImageWorker;

    /**
     *
     * @param inputHandler
     * @param resourceHandler
     * @param canvasHandler
     * @param resizeImageWorker
     */
    constructor({
                  inputHandler,
                  resourceHandler,
                  canvasHandler,
                  resizeImageWorker
    }) {
      this.#inputHandler = inputHandler;
      this.#resourceHandler = resourceHandler;
      this.#canvasHandler = canvasHandler;
      this.#resizeImageWorker  = resizeImageWorker;
    }

    init = async () => {
      this.#particleGenerator = new ParticleGenerator();
      this.createFactories();
      await this.initFactories();
      this.createHandlers();
      await this.initHandlers();
      await this.setup();
      await this.initGame();
    }

    setup = async () => {
      // galaxy
      this.#galaxy = new Galaxy({
        scale:e8.global.scaleOfGalaxy,
        canvasHandler:this.#canvasHandler,
        inputHandler: this.#inputHandler
      });
      this.#galaxy.init();

      //hud
      this.#scanner = new Scanner({
        galaxy: this.#galaxy,
        canvasHandler: this.#canvasHandler
      });

      await this.#scanner.init();

      //terminal
      this.#terminal = new Terminal({
        canvasHandler: this.#canvasHandler,
        resourceHandler: this.#resourceHandler
      })

      //backdrop
      this.#backdrop = new Backdrop({
        canvasHandler: this.#canvasHandler
      });
    }

    initGame = async () => {
      this.#game = new Game({
        poiHandler : this.#poiHandler,
        terminal : this.#terminal,
        spaceStationHandler : this.#spaceStationHandler,
        dustHandler : this.#dustHandler,
        playerShipHandler : this.#playerShipHandler,
        asteroidHandler : this.#asteroidHandler,
        hazeHandler : this.#hazeHandler,
        enemyShipHandler : this.#enemyShipHandler,
        freighterHandler : this.#freighterHandler
      });
    }
    
    initHandlers = async () =>{
        await this.#dustHandler.init();
        await this.#asteroidHandler.init();
        await this.#hazeHandler.init();
        await this.#playerShipHandler.init();
        await this.#enemyShipHandler.init({canvas:null});
        await this.#freighterHandler.init();

    }

    createHandlers = () => {
        // dust
        this.#dustHandler = new DustHandler({
            canvasHandler: this.#canvasHandler
        });

        // asteroids
        this.#asteroidHandler = new AsteroidHandler({
            canvasHandler: this.#canvasHandler,
            resourceHandler: this.#resourceHandler
        });

        // haze
        this.#hazeHandler = new HazeHandler({
            canvasHandler: this.#canvasHandler,
            resizeImageWorker: this.#resizeImageWorker
        });

        // player ship
        this.#playerShipHandler = new PlayerShipHandler({
            inputHandler: this.#inputHandler,
            canvasHandler: this.#canvasHandler,
            playerShipFactory: this.#playerShipFactory

        });

        // freighters
        this.#freighterHandler = new FreighterHandler({
            canvasHandler: this.#canvasHandler,
            resourceHandler: this.#resourceHandler,
            propulsionFactory: this.#propulsionFactory,
            engineTrailFactory: this.#engineTrailFactory

        });

        //POI
        this.#poiHandler = new POIHandler({
            inputHandler: this.#inputHandler,
            poiFactory: this.#poiFactory
        });

        // enemy ships
        this.#enemyShipHandler = new EnemyShipHandler({
            canvasHandler: this.#canvasHandler,
            particleGenerator:this.#particleGenerator,
            resourceHandler: this.#resourceHandler,
            propulsionFactory: this.#propulsionFactory,
            shieldFactory: this.#shieldFactory,
            explosionFactory: this.#explosionFactory,
            weaponFactory: this.#weaponFactory
        });

        //spaceStation
        this.#spaceStationHandler = new SpaceStationHandler({
            canvasHandler: this.#canvasHandler,
            resourceHandler: this.#resourceHandler,
            poiHandler: this.#poiHandler,
            inputHandler: this.#inputHandler
        });
    }

    /**
     * @name initFactories
     * @returns {Promise<void>}
     */
    initFactories = async () =>{
        await this.#weaponFactory.init();
        await this.#propulsionFactory.init();
        await this.#shieldFactory.init();
        await this.#explosionFactory.init();
    }





    /**
     * @name createFactories
     */
    createFactories = () => {

        /**
         *
         * @type {EngineTrailFactory}
         */
        this.#engineTrailFactory = new EngineTrailFactory({
            resourceHandler: this.#resourceHandler
        });

        /**
         *
         * @type {PropulsionFactory}
         */
        this.#propulsionFactory = new PropulsionFactory({
            resourceHandler: this.#resourceHandler
        });

        /**
         *
         * @type {ExplosionFactory}
         */
        this.#explosionFactory = new ExplosionFactory({
            resourceHandler: this.#resourceHandler
        });

        /**
         *
         * @type {ShieldFactory}
         */
        this.#shieldFactory = new ShieldFactory({
            resourceHandler: this.#resourceHandler
        });

        /**
         *
         * @type {WeaponFactory}
         */
        this.#weaponFactory = new WeaponFactory({
            resourceHandler: this.#resourceHandler
        });

        /**
         *
         * @type {FuelFactory}
         */
        this.#fuelFactory = new FuelFactory();

        /**
         *
         * @type {PlayerShipFactory}
         */
        this.#playerShipFactory = new PlayerShipFactory({
            resourceHandler: this.#resourceHandler,
            canvasHandler: this.#canvasHandler,
            engineTrailFactory: this.#engineTrailFactory,
            propulsionFactory: this.#propulsionFactory,
            explosionFactory: this.#explosionFactory,
            shieldFactory: this.#shieldFactory,
            weaponFactory: this.#weaponFactory,
            fuelFactory: this.#fuelFactory
        })

        /**
         *
         * @type {PoiFactory}
         */
        this.#poiFactory = new PoiFactory()

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