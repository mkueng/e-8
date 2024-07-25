class Scripts {
  // Private instance stored in a closure
  static #instance = null;
  static version  = "0.25";

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
    const version = document.getElementById("version");
    version.innerText = "v"+Scripts.version;
    await ScriptLoader.loadScript("js/localStorage/localStorageHandler.js?v="+Scripts.version);

    // utility
    await ScriptLoader.loadScript("js/util/util.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/workers/utility/utilityWorker.js?v="+Scripts.version);

    // font
    await ScriptLoader.loadScript("js/font/fontHandler.js?v="+Scripts.version);

    // screen
    await ScriptLoader.loadScript("js/screen/screen.js?v="+Scripts.version);

    // fsm
    await ScriptLoader.loadScript("js/state/state.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/state/states.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/state/finiteStateMachine.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/state/stateHandler.js?v="+Scripts.version);

    // gameObject
    await ScriptLoader.loadScript("js/gameObjects/gameObject.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/gameObjects/gameObjectsHandler.js?v="+Scripts.version);

    // resource
    await ScriptLoader.loadScript("js/resource/resourceHandler.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/resource/resourceObject.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/resource/resourceLoader.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/workers/fetchResourcesWorker.js?v="+Scripts.version);

    // settings
    await ScriptLoader.loadScript("js/settings/settingsHandler.js?v="+Scripts.version);

    // stages
    await ScriptLoader.loadScript("js/stages/stage.js?v="+Scripts.version);


    // imageResize
    await ScriptLoader.loadScript("js/workers/resizeImageWorker.js?v="+Scripts.version);

    // input
    await ScriptLoader.loadScript("js/input/inputHandler.js?v="+Scripts.version);

    // info
    await ScriptLoader.loadScript("js/info/info.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/info/freighterCargoInfo.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/info/infoHandler.js?v="+Scripts.version);

    // sun
    await ScriptLoader.loadScript("js/galaxy/sun/sun.js?v="+Scripts.version);


    // backdrop
    await ScriptLoader.loadScript("js/backdrop/backdrop.js?v="+Scripts.version);

    //dust
    await ScriptLoader.loadScript("js/dust/dustHandler.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/dust/dustParticles.js?v="+Scripts.version);


    //particles
    await ScriptLoader.loadScript("js/particles/particlesObject.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/particles/particleGenerator.js?v="+Scripts.version);

    //asteroid
    await ScriptLoader.loadScript("js/asteroid/asteroidHandler.js?v="+Scripts.version);

    // shield
    await ScriptLoader.loadScript("js/shield/shield.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/shield/shieldTypes.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/shield/shieldFactory.js?v="+Scripts.version);

    // collision
    await ScriptLoader.loadScript("js/collisionDetection/collisionDetector.js?v="+Scripts.version);

    // hud
    await ScriptLoader.loadScript("js/hud/hud.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/hud/radar.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/hud/hudLeft.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/hud/hudRight.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/hud/scanner.js?v="+Scripts.version);


    // canvas
    await ScriptLoader.loadScript("js/canvas/canvasHandler.js?v="+Scripts.version);

    // sound
    await ScriptLoader.loadScript("js/sound/soundHandler.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/speechModule/speechHandler.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/sound/proceduralMusic.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/sound/sequencer.js?v="+Scripts.version);

    // galaxy
    await ScriptLoader.loadScript("js/galaxy/galaxy.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/workers/galaxy/galaxyWorker.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/galaxy/planet.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/workers/galaxy/proceduralPlanet.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/workers/galaxy/noise.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/workers/galaxy/sphereImageLib.js?v="+Scripts.version);

    // weapon
    await ScriptLoader.loadScript("js/weapon/weapon.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/weapon/photonTorpedo.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/weapon/laser.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/weapon/photonTorpedoEnemy.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/weapon/photonTorpedoFireAndForget.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/weapon/weaponFactory.js?v="+Scripts.version);

    // trail
    await ScriptLoader.loadScript("js/engineTrail/engineTrail.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/engineTrail/engineTrailA.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/engineTrail/engineTrailB.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/engineTrail/engineTrailParticle.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/engineTrail/engineTrailFactory.js?v="+Scripts.version);

    // fuel
    await ScriptLoader.loadScript("js/fuel/fuel.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/fuel/fuelFactory.js?v="+Scripts.version);

    // propulsion
    await ScriptLoader.loadScript("js/propulsion/propulsionTypes.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/propulsion/propulsion.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/propulsion/propulsionFactory.js?v="+Scripts.version);

    // explosion
    await ScriptLoader.loadScript("js/explosion/explosion.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/explosion/classAPlayerShipExplosion.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/explosion/classAEnemyShipExplosion.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/explosion/explosionFactory.js?v="+Scripts.version);

    // features
    await ScriptLoader.loadScript("js/tractor/tractor.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/probe/probe.js?v="+Scripts.version);

    // playerShip
    await ScriptLoader.loadScript("js/playerShip/playerShipPropertiesClassA.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/playerShip/playerShipPropertiesClassB.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/playerShip/playerShipFactory.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/playerShip/playerShipHandler.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/playerShip/playerShip.js?v="+Scripts.version);

    // enemyShip
    await ScriptLoader.loadScript("js/procedural/ships/proceduralShipImage.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/enemyShip/proceduralEnemyShipImageType1.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/enemyShip/proceduralEnemyShipType1.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/enemyShip/enemyShipHandler.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/enemyShip/proceduralEnemyShipFactory.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/enemyShip/enemyShip.js?v="+Scripts.version);

    // haze
    await ScriptLoader.loadScript("js/haze/haze.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/haze/hazeHandler.js?v="+Scripts.version);

    // cargo
    await ScriptLoader.loadScript("js/cargo/cargo.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/cargo/units.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/cargo/antimatter.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/cargo/crystals.js?v="+Scripts.version);

    // freighter
    await ScriptLoader.loadScript("js/freighter/freighter.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/freighter/freighterTypes.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/freighter/freighterFactory.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/freighter/freighterHandler.js?v="+Scripts.version);

    //poi
    await ScriptLoader.loadScript("js/poi/poiObjectClasses.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/poi/poi.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/poi/poiHighlight.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/poi/poiHandler.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/poi/poiFactory.js?v="+Scripts.version);

    //terminal
    await ScriptLoader.loadScript("js/terminal/terminal.js?v="+Scripts.version);

    // spaceStation
    await ScriptLoader.loadScript("js/spaceStation/spaceStationHandler.js?v="+Scripts.version);

    // game
    await ScriptLoader.loadScript("js/gameController.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/game.js?v="+Scripts.version);
    await ScriptLoader.loadScript("js/gameLoop/gameLoop.js?v="+Scripts.version);

  }
}