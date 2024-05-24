'use strict'

class GameInit {

  asteroidHandler;
  backdrop;
  canvasHandler;
  enemyShipHandler;
  fontHandler;
  galaxy;
  gameLoop;
  hazeHandler;
  hudHandler;
  infoHandler;
  inputHandler;
  playerShipHandler;
  proceduralMusic;
  resourceHandler;
  settingsHandler;
  stateHandler;
  gameState;
  localStorageHandler;

  constructor() {
      document.addEventListener("visibilitychange", () => {
          if (document.hidden) {
              e8.global.tabIsActive = false;
              console.log("tab inactive");
              this.gameLoop.pause();

        /*
        subscribers.forEach(
          (subscriber) =>{
            subscriber({
              message: "tab deactivated",
              content: ""
            })
          }
        )*/
      } else {
        console.log("tab active");
        e8.global.tabIsActive = true;
        this.gameLoop.restart();
        /*
        subscribers.forEach(
          (subscriber) =>{
            subscriber({
              message: "tab active",
              content: ""
            })
          }
        )*/
      }
    });


    this.initGame().then((r)=>{
      document.querySelector("#game").style.display = "block";
      //document.addEventListener("keydown", this.startMusic, true);
       //this.settingsHandler.showSettings();
    })
  }

  startGame = ()=>{
    /*
    this.gameState = this.stateHandler.getState().name;
    this.gameLoop.start();
    this.asteroidHandler.createAsteroids(10000,10);
    this.enemyShipHandler.startCreation(5000);

     */
  }

  pauseGame = ()=>{
    this.gameState = this.stateHandler.getState().name;
    this.gameLoop.pause();
  }

  restartGame = () =>{
    this.gameState = this.stateHandler.getState().name;
    this.gameLoop.restart();
  }

  startMusic = ()=>{
      SoundHandler.playMusic();
      document.removeEventListener("keydown", this.startMusic, true);
  }


  initGame = async ()=> {
      // localStorage
      await ScriptLoader.loadScript("js/localStorage/localStorageHandler.js");
      this.localStorageHandler = new LocalStorageHandler();
      const resizeImageWorker = new Worker('js/workers/resizeImageWorker.js');
    //this.utilityWorker = new Worker('js/workers/utility/utilityWorker.js');
    // this.enemyShipWorker = new Worker('js/workers/enemyShip/enemyShipWorker');




      // utility
      await ScriptLoader.loadScript("js/util/util.js");
      await ScriptLoader.loadScript("js/workers/utility/utilityWorker.js");

      // config
      await ScriptLoader.loadScript("js/config.js");

      // font
      await ScriptLoader.loadScript("js/font/fontHandler.js");

      this.fontHandler = new FontHandler();
      await this.fontHandler.loadFont();

      // fsm
      await ScriptLoader.loadScript("js/state/state.js");
      await ScriptLoader.loadScript("js/state/states.js");
      await ScriptLoader.loadScript("js/state/finiteStateMachine.js");
      await ScriptLoader.loadScript("js/state/stateHandler.js");

      // gameObject
      await ScriptLoader.loadScript("js/gameObjects/gameObject.js");
      await ScriptLoader.loadScript("js/gameObjects/gameObjectsHandler.js");

      // resource
      await ScriptLoader.loadScript("js/resource/resourceHandler.js");
      await ScriptLoader.loadScript("js/resource/resourceObject.js");
      await ScriptLoader.loadScript("js/resource/resourceLoader.js");
      await ScriptLoader.loadScript("js/workers/fetchResourcesWorker.js");

      // settings
      await ScriptLoader.loadScript("js/settings/settingsHandler.js");

      // stages
      await ScriptLoader.loadScript("js/stages/stage.js");

      // imageResize
      await ScriptLoader.loadScript("js/workers/resizeImageWorker.js");

      // input
      await ScriptLoader.loadScript("js/input/inputHandler.js");

      // info
      await ScriptLoader.loadScript("js/info/info.js");
      await ScriptLoader.loadScript("js/info/freighterCargoInfo.js");
      await ScriptLoader.loadScript("js/info/infoHandler.js");


      // backdrop
      await ScriptLoader.loadScript("js/backdrop/backdrop.js");

      //dust
      await ScriptLoader.loadScript("js/dust/dustHandler.js");
      await ScriptLoader.loadScript("js/dust/dustParticles.js");


      //particles
      await ScriptLoader.loadScript("js/particles/particlesObject.js");
      await ScriptLoader.loadScript("js/particles/particleGenerator.js");

      //asteroid
      await ScriptLoader.loadScript("js/asteroid/asteroidHandler.js");

      // shield
      await ScriptLoader.loadScript("js/shield/shield.js");
      await ScriptLoader.loadScript("js/shield/shieldTypes.js");
      await ScriptLoader.loadScript("js/shield/shieldFactory.js");

      // collision
      await ScriptLoader.loadScript("js/collisionDetection/collisionDetector.js");

      // hud
      await ScriptLoader.loadScript("js/hud/hudHandler.js");



      // canvas
      await ScriptLoader.loadScript("js/canvas/canvasHandler.js");

      // sound
      await ScriptLoader.loadScript("js/sound/soundHandler.js");
      await ScriptLoader.loadScript("js/speechModule/speechHandler.js");
      await ScriptLoader.loadScript("js/sound/proceduralMusic.js");
      await ScriptLoader.loadScript("js/sound/sequencer.js");

      SoundHandler.setFXGain({percentage: 0.0});
      SoundHandler.setMusicGain({percentage: 0});


      // galaxy
      await ScriptLoader.loadScript("js/galaxy/galaxy.js");
      await ScriptLoader.loadScript("js/workers/galaxy/galaxyWorker.js");
      await ScriptLoader.loadScript("js/galaxy/planet.js");
      await ScriptLoader.loadScript("js/workers/galaxy/proceduralPlanet.js");
      await ScriptLoader.loadScript("js/workers/galaxy/noise.js");
      await ScriptLoader.loadScript("js/workers/galaxy/sphereImageLib.js");

      // weapon
      await ScriptLoader.loadScript("js/weapon/weapon.js");
      await ScriptLoader.loadScript("js/weapon/photonTorpedo.js");
      await ScriptLoader.loadScript("js/weapon/laser.js");
      await ScriptLoader.loadScript("js/weapon/photonTorpedoEnemy.js");
      await ScriptLoader.loadScript("js/weapon/photonTorpedoFireAndForget.js");
      await ScriptLoader.loadScript("js/weapon/weaponFactory.js");

      // trail
      await ScriptLoader.loadScript("js/engineTrail/engineTrail.js");
      await ScriptLoader.loadScript("js/engineTrail/engineTrailA.js");
      await ScriptLoader.loadScript("js/engineTrail/engineTrailB.js");
      await ScriptLoader.loadScript("js/engineTrail/engineTrailParticle.js");
      await ScriptLoader.loadScript("js/engineTrail/engineTrailFactory.js");


      // fuel
      await ScriptLoader.loadScript("js/fuel/fuel.js");
      await ScriptLoader.loadScript("js/fuel/fuelFactory.js");

      // propulsion
      await ScriptLoader.loadScript("js/propulsion/propulsionTypes.js");
      await ScriptLoader.loadScript("js/propulsion/propulsion.js");
      await ScriptLoader.loadScript("js/propulsion/propulsionFactory.js");

      // explosion
      await ScriptLoader.loadScript("js/explosion/explosion.js");
      await ScriptLoader.loadScript("js/explosion/classAPlayerShipExplosion.js");
      await ScriptLoader.loadScript("js/explosion/classAEnemyShipExplosion.js");
      await ScriptLoader.loadScript("js/explosion/explosionFactory.js");

      // features
      await ScriptLoader.loadScript("js/tractor/tractor.js");
      await ScriptLoader.loadScript("js/probe/probe.js");



      // playerShip
      await ScriptLoader.loadScript("js/playerShip/playerShipPropertiesClassA.js");
      await ScriptLoader.loadScript("js/playerShip/playerShipPropertiesClassB.js");
      await ScriptLoader.loadScript("js/playerShip/playerShipFactory.js");
      await ScriptLoader.loadScript("js/playerShip/playerShipHandler.js");
      await ScriptLoader.loadScript("js/playerShip/playerShip.js");

      // enemyShip
      await ScriptLoader.loadScript("js/procedural/ships/proceduralShipImage.js");
      await ScriptLoader.loadScript("js/enemyShip/proceduralEnemyShipImageType1.js");
      await ScriptLoader.loadScript("js/enemyShip/proceduralEnemyShipType1.js");
      await ScriptLoader.loadScript("js/enemyShip/enemyShipHandler.js");
      await ScriptLoader.loadScript("js/enemyShip/proceduralEnemyShipFactory.js");
      await ScriptLoader.loadScript("js/enemyShip/enemyShip.js");

      // haze
      await ScriptLoader.loadScript("js/haze/haze.js");
      await ScriptLoader.loadScript("js/haze/hazeHandler.js");

    // cargo
    await ScriptLoader.loadScript("js/cargo/cargo.js");
    await ScriptLoader.loadScript("js/cargo/units.js");
    await ScriptLoader.loadScript("js/cargo/antimatter.js");
    await ScriptLoader.loadScript("js/cargo/crystals.js");

    // freighter
    await ScriptLoader.loadScript("js/freighter/freighter.js");
    await ScriptLoader.loadScript("js/freighter/freighterClasses.js");
    await ScriptLoader.loadScript("js/freighter/freighterFactory.js");
    await ScriptLoader.loadScript("js/freighter/freighterHandler.js");

    //poi
    await ScriptLoader.loadScript("js/poi/poiObjectClasses.js");
    await ScriptLoader.loadScript("js/poi/poi.js");
    await ScriptLoader.loadScript("js/poi/poiHighlight.js");
    await ScriptLoader.loadScript("js/poi/poiHandler.js");
    await ScriptLoader.loadScript("js/poi/poiFactory.js");


    //terminal
    await ScriptLoader.loadScript("js/terminal/terminal.js");

    // spaceStation
    await ScriptLoader.loadScript("js/spaceStation/spaceStationHandler.js");

    this.stateHandler = new StateHandler(this);
    this.speechHandler = new SpeechHandler()
    this.resourceHandler = new ResourceHandler();

    this.proceduralMusic = new ProceduralMusic();
    this.canvasHandler = new CanvasHandler();
    this.infoHandler = new InfoHandler()
    this.inputHandler = new InputHandler();

    this.settingsHandler = new SettingsHandler({
      localStorageHandler: this.localStorageHandler,
      inputHandler: this.inputHandler,
      canvasHandler: this.canvasHandler,
      stateHandler: this.stateHandler
    });

    this.terminal = new Terminal(this.resourceHandler, this.canvasHandler);
    await this.terminal.invoke();

    this.poiHandler = new POIHandler({resourceHandler: this.resourceHandler, inputHandler: this.inputHandler, canvasHandler: this.canvasHandler});
    await this.poiHandler.invoke();

    this.particleGenerator = new ParticleGenerator();
    this.propulsionFactory = new PropulsionFactory({resourceHandler:this.resourceHandler});
    await this.propulsionFactory.fetchResources();
    this.engineTrailFactory = new EngineTrailFactory({canvasHandler:this.canvasHandler,resourceHandler:this.resourceHandler});
    this.weaponFactory = new WeaponFactory({resourceHandler:this.resourceHandler});
    await this.weaponFactory.invoke();
    this.fuelFactory = new FuelFactory();
    this.shieldFactory = new ShieldFactory({resourceHandler:this.resourceHandler});
    await this.shieldFactory.fetchResources();
    this.explosionFactory = new ExplosionFactory({resourceHandler:this.resourceHandler});
    await this.explosionFactory.invoke();


    this.backdrop = new Backdrop({
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler
    });

    this.hudHandler = new HudHandler({
      canvasHandler: this.canvasHandler
    });

    this.gameLoop = new GameLoop({
      hudHandler: this.hudHandler
    });
    this.galaxy = new Galaxy({
      gameLoop: this.gameLoop,
      canvasHandler: this.canvasHandler,
      scale: 200
    });
    this.hazeHandler = new HazeHandler({
      gameLoop: this.gameLoop,
      canvasHandler: this.canvasHandler,
      resizeImageWorker
    });

    this.dustHandler = new DustHandler({
      canvasHandler: this.canvasHandler
    });

    this.asteroidHandler = new AsteroidHandler({
      gameLoop: this.gameLoop,
      canvasHandler: this.canvasHandler,
      resourceHandler: this.resourceHandler,
      resizeImageWorker
    })

    this.playerShipHandler = new PlayerShipHandler({
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler,
      inputHandler: this.inputHandler,
      hudHandler: this.hudHandler,
      propulsionFactory: this.propulsionFactory,
      weaponFactory: this.weaponFactory,
      shieldFactory: this.shieldFactory,
      explosionFactory: this.explosionFactory,
      fuelFactory: this.fuelFactory,
      engineTrailFactory: this.engineTrailFactory

    });
    this.enemyShipHandler = new EnemyShipHandler({
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler,
      particleGenerator: this.particleGenerator
    });

    this.freighterHandler = new FreighterHandler({
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler,
      particleGenerator: this.particleGenerator,
      propulsionFactory: this.propulsionFactory,
      engineTrailFactory: this.engineTrailFactory
    });


    this.spaceStationHandler = new SpaceStationHandler({
      galaxy: this.galaxy,
      resourceHandler: this.resourceHandler,
      canvasHandler: this.canvasHandler,
      inputHandler: this.inputHandler,
      poiHandler: this.poiHandler
    })

    await this.spaceStationHandler.invoke();
    await this.speechHandler.invoke();
    await this.proceduralMusic.fetchAudioAssets();
    await this.freighterHandler.invoke();
    await this.playerShipHandler.create();

    await this.freighterHandler.create();

    await this.asteroidHandler.invoke();

    this.stateHandler.trigger(StateHandler.actions.startGame);
    await this.enemyShipHandler.invoke();
  }


  // global
  subscribeForGlobalEvents = () => {
    ns.init.subscribeForGlobalEvents((event)=>{

      switch(event.message){

        case "tab deactivated" : {
          //StateHandler.instance.currentState.stage.pause();
          break;
        }

        case  "tab inactive" : {
          //StateHandler.instance.currentState.stage.resume();
          break;
        }
      }

    })
  }

}