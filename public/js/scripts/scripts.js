class Scripts {
  // Private instance stored in a closure
  static #instance = null;

  // Private constructor to prevent direct instantiation
  constructor() {
    if (Scripts.#instance) {
      throw new Error("Instance of Scripts already exists. Use Scripts.getInstance() to get the instance.");
    }
  }

  // Static method to get the instance
  static getInstance() {
    if (!Scripts.#instance) {
      Scripts.#instance = new Scripts();
    }
    return Scripts.#instance;
  }

  loadScripts = async () => {
    await ScriptLoader.loadScript("js/localStorage/localStorageHandler.js");

    // utility
    await ScriptLoader.loadScript("js/util/util.js");
    await ScriptLoader.loadScript("js/workers/utility/utilityWorker.js");

    // font
    await ScriptLoader.loadScript("js/font/fontHandler.js");

    // screen
    await ScriptLoader.loadScript("js/screen/screen.js");

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
    await ScriptLoader.loadScript("js/freighter/freighterTypes.js");
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

    // game
    await ScriptLoader.loadScript("js/gameController.js");
    await ScriptLoader.loadScript("js/game.js");
    await ScriptLoader.loadScript("js/gameLoop/gameLoop.js");

  }
}