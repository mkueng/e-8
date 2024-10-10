class PlayerShipPropertiesClassA {

  static imageResourceObjects = {
    "initial" : {
      name : "ship01ClassA",
      filename : "playerShip",
      type : ResourceObject.TYPES.png,
      resourcePath : "/resources/ships/playerShip/"
    },

    "eagle" : {
      name : "ship_02",
      filename : "playerShip",
      type : ResourceObject.TYPES.png,
      resourcePath : "/resources/ships/playerShip/"
    }
  }

  static generic = {
    maxVelX: 4000,
    maxVelY: 10,
    accX: 100.15,
    accY: 0.17,
  }

  static cargo = {
    maxTotal: 1000,
    crystals: {
      amount: 50,
      max: 200
    }
  }

  static engineTrail = {
    type: EngineTrailFactory.ENGINE_TRAIL_TYPES.engineTrailA,
    posDX : -40,
    posDY :53
  }

  static propulsion = {
    type : PropulsionFactory.PROPULSION_TYPES.ionA,
    posDX: -25,
    posDY: 25,
    isActive : false
  }

  static throttle = {
    type: PropulsionFactory.PROPULSION_TYPES.throttle,
    posDX: 70,
    posDY: 8,
    isActive: false
  }

  static fuel = {
    type: FuelFactory.FUEL_TYPES.xenon,
    amount: 100,
    max: 100
  }

  static shield = {
    type: ShieldFactory.SHIELD_TYPES.shieldA,
    posDX: -90,
    posDY: -90,
    width: 350,
    height: 300
  }

  static terminationSequence = {
    type: ExplosionFactory.EXPLOSION_TYPES.classAPlayerShipExplosion,
    posDX: -40,
    posDY: -50
  }

  static features = [
    {
      Tractor: {
        controlAssignment: "KeyT",
        type: Tractor
      }
    },
    {
      Probe: {
        controlAssignment: "KeyP",
        type: Probe
      }
    }
  ]

  static weapons = {

    PT : {
      controlAssignment : "Space",
      type: WeaponFactory.WEAPON_TYPES.photonTorpedo,
      amount: 2000,
      posDX: 70,
      posDY: 50
    },

    FaF : {
      controlAssignment : "KeyK",
      type : WeaponFactory.WEAPON_TYPES.photonTorpedoFireAndForget,
      amount: 1000,
      posDX : 60,
      posDY : 50
    },

    Laser : {
      controlAssignment : "KeyF",
      type : WeaponFactory.WEAPON_TYPES.laser,
      amount: 100,
      posDX : 72,
      posDY : 47
    }
  }
}