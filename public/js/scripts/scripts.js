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
    await ScriptLoader.loadScript("js/localStorage/localStorageHandler.js?v=0.12");

    // utility
    await ScriptLoader.loadScript("js/util/util.js");
    await ScriptLoader.loadScript("js/workers/utility/utilityWorker.js?v=0.12");

    // font
    await ScriptLoader.loadScript("js/font/fontHandler.js?v=0.12");

    // screen
    await ScriptLoader.loadScript("js/screen/screen.js?v=0.12");

    // fsm
    await ScriptLoader.loadScript("js/state/state.js?v=0.12");
    await ScriptLoader.loadScript("js/state/states.js");
    await ScriptLoader.loadScript("js/state/finiteStateMachine.js?v=0.12");
    await ScriptLoader.loadScript("js/state/stateHandler.js?v=0.12");

    // gameObject
    await ScriptLoader.loadScript("js/gameObjects/gameObject.js?v=0.12");
    await ScriptLoader.loadScript("js/gameObjects/gameObjectsHandler.js?v=0.12");

    // resource
    await ScriptLoader.loadScript("js/resource/resourceHandler.js?v=0.12");
    await ScriptLoader.loadScript("js/resource/resourceObject.js?v=0.12");
    await ScriptLoader.loadScript("js/resource/resourceLoader.js?v=0.12");
    await ScriptLoader.loadScript("js/workers/fetchResourcesWorker.js?v=0.12");

    // settings
    await ScriptLoader.loadScript("js/settings/settingsHandler.js?v=0.12");

    // stages
    await ScriptLoader.loadScript("js/stages/stage.js?v=0.12");


    // imageResize
    await ScriptLoader.loadScript("js/workers/resizeImageWorker.js?v=0.12");

    // input
    await ScriptLoader.loadScript("js/input/inputHandler.js?v=0.12");

    // info
    await ScriptLoader.loadScript("js/info/info.js?v=0.12");
    await ScriptLoader.loadScript("js/info/freighterCargoInfo.js?v=0.12");
    await ScriptLoader.loadScript("js/info/infoHandler.js?v=0.12");


    // backdrop
    await ScriptLoader.loadScript("js/backdrop/backdrop.js?v=0.12");

    //dust
    await ScriptLoader.loadScript("js/dust/dustHandler.js?v=0.12");
    await ScriptLoader.loadScript("js/dust/dustParticles.js?v=0.12");


    //particles
    await ScriptLoader.loadScript("js/particles/particlesObject.js?v=0.12");
    await ScriptLoader.loadScript("js/particles/particleGenerator.js?v=0.12");

    //asteroid
    await ScriptLoader.loadScript("js/asteroid/asteroidHandler.js?v=0.12");

    // shield
    await ScriptLoader.loadScript("js/shield/shield.js?v=0.12");
    await ScriptLoader.loadScript("js/shield/shieldTypes.js?v=0.12");
    await ScriptLoader.loadScript("js/shield/shieldFactory.js?v=0.12");

    // collision
    await ScriptLoader.loadScript("js/collisionDetection/collisionDetector.js?v=0.12");

    // hud
    await ScriptLoader.loadScript("js/hud/hudHandler.js?v=0.12");
    await ScriptLoader.loadScript("js/hud/hud.js?v=0.12");

    await ScriptLoader.loadScript("js/hud/radar.js?v=0.12");
    await ScriptLoader.loadScript("js/hud/hudLeft.js?v=0.12");
    await ScriptLoader.loadScript("js/hud/hudRight.js?v=0.12");

    // canvas
    await ScriptLoader.loadScript("js/canvas/canvasHandler.js?v=0.12");

    // sound
    await ScriptLoader.loadScript("js/sound/soundHandler.js?v=0.12");
    await ScriptLoader.loadScript("js/speechModule/speechHandler.js?v=0.12");
    await ScriptLoader.loadScript("js/sound/proceduralMusic.js?v=0.12");
    await ScriptLoader.loadScript("js/sound/sequencer.js?v=0.12");

    // galaxy
    await ScriptLoader.loadScript("js/galaxy/galaxy.js?v=0.12");
    await ScriptLoader.loadScript("js/workers/galaxy/galaxyWorker.js?v=0.12");
    await ScriptLoader.loadScript("js/galaxy/planet.js?v=0.12");
    await ScriptLoader.loadScript("js/workers/galaxy/proceduralPlanet.js?v=0.12");
    await ScriptLoader.loadScript("js/workers/galaxy/noise.js?v=0.12");
    await ScriptLoader.loadScript("js/workers/galaxy/sphereImageLib.js?v=0.12");

    // weapon
    await ScriptLoader.loadScript("js/weapon/weapon.js?v=0.12");
    await ScriptLoader.loadScript("js/weapon/photonTorpedo.js?v=0.12");
    await ScriptLoader.loadScript("js/weapon/laser.js?v=0.12");
    await ScriptLoader.loadScript("js/weapon/photonTorpedoEnemy.js?v=0.12");
    await ScriptLoader.loadScript("js/weapon/photonTorpedoFireAndForget.js?v=0.12");
    await ScriptLoader.loadScript("js/weapon/weaponFactory.js?v=0.12");

    // trail
    await ScriptLoader.loadScript("js/engineTrail/engineTrail.js?v=0.12");
    await ScriptLoader.loadScript("js/engineTrail/engineTrailA.js?v=0.12");
    await ScriptLoader.loadScript("js/engineTrail/engineTrailB.js?v=0.12");
    await ScriptLoader.loadScript("js/engineTrail/engineTrailParticle.js?v=0.12");
    await ScriptLoader.loadScript("js/engineTrail/engineTrailFactory.js?v=0.12");

    // fuel
    await ScriptLoader.loadScript("js/fuel/fuel.js?v=0.12");
    await ScriptLoader.loadScript("js/fuel/fuelFactory.js?v=0.12");

    // propulsion
    await ScriptLoader.loadScript("js/propulsion/propulsionTypes.js?v=0.12");
    await ScriptLoader.loadScript("js/propulsion/propulsion.js?v=0.12");
    await ScriptLoader.loadScript("js/propulsion/propulsionFactory.js?v=0.12");

    // explosion
    await ScriptLoader.loadScript("js/explosion/explosion.js?v=0.12");
    await ScriptLoader.loadScript("js/explosion/classAPlayerShipExplosion.js?v=0.12");
    await ScriptLoader.loadScript("js/explosion/classAEnemyShipExplosion.js?v=0.12");
    await ScriptLoader.loadScript("js/explosion/explosionFactory.js?v=0.12");

    // features
    await ScriptLoader.loadScript("js/tractor/tractor.js?v=0.12");
    await ScriptLoader.loadScript("js/probe/probe.js?v=0.12");

    // playerShip
    await ScriptLoader.loadScript("js/playerShip/playerShipPropertiesClassA.js?v=0.12");
    await ScriptLoader.loadScript("js/playerShip/playerShipPropertiesClassB.js?v=0.12");
    await ScriptLoader.loadScript("js/playerShip/playerShipFactory.js?v=0.12");
    await ScriptLoader.loadScript("js/playerShip/playerShipHandler.js?v=0.12");
    await ScriptLoader.loadScript("js/playerShip/playerShip.js?v=0.12");

    // enemyShip
    await ScriptLoader.loadScript("js/procedural/ships/proceduralShipImage.js?v=0.12");
    await ScriptLoader.loadScript("js/enemyShip/proceduralEnemyShipImageType1.js?v=0.12");
    await ScriptLoader.loadScript("js/enemyShip/proceduralEnemyShipType1.js?v=0.12");
    await ScriptLoader.loadScript("js/enemyShip/enemyShipHandler.js?v=0.12");
    await ScriptLoader.loadScript("js/enemyShip/proceduralEnemyShipFactory.js?v=0.12");
    await ScriptLoader.loadScript("js/enemyShip/enemyShip.js?v=0.12");

    // haze
    await ScriptLoader.loadScript("js/haze/haze.js?v=0.12");
    await ScriptLoader.loadScript("js/haze/hazeHandler.js?v=0.12");

    // cargo
    await ScriptLoader.loadScript("js/cargo/cargo.js?v=0.12");
    await ScriptLoader.loadScript("js/cargo/units.js?v=0.12");
    await ScriptLoader.loadScript("js/cargo/antimatter.js?v=0.12");
    await ScriptLoader.loadScript("js/cargo/crystals.js?v=0.12");

    // freighter
    await ScriptLoader.loadScript("js/freighter/freighter.js?v=0.12");
    await ScriptLoader.loadScript("js/freighter/freighterTypes.js?v=0.12");
    await ScriptLoader.loadScript("js/freighter/freighterFactory.js?v=0.12");
    await ScriptLoader.loadScript("js/freighter/freighterHandler.js?v=0.12");

    //poi
    await ScriptLoader.loadScript("js/poi/poiObjectClasses.js?v=0.12");
    await ScriptLoader.loadScript("js/poi/poi.js?v=0.12");
    await ScriptLoader.loadScript("js/poi/poiHighlight.js?v=0.12");
    await ScriptLoader.loadScript("js/poi/poiHandler.js?v=0.12");
    await ScriptLoader.loadScript("js/poi/poiFactory.js?v=0.12");

    //terminal
    await ScriptLoader.loadScript("js/terminal/terminal.js?v=0.12");

    // spaceStation
    await ScriptLoader.loadScript("js/spaceStation/spaceStationHandler.js?v=0.12");

    // game
    await ScriptLoader.loadScript("js/gameController.js?v=0.12");
    await ScriptLoader.loadScript("js/game.js?v=0.12");
    await ScriptLoader.loadScript("js/gameLoop/gameLoop.js?v=0.12");

  }
}