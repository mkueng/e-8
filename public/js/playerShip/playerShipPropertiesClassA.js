class PlayerShipPropertiesClassA {

  static imageResourceObjects = {
    "initial" : {
      name : "ship01ClassA",
      filename : "ship_05",
      type : ResourceObject.TYPES.png,
      resourcePath : "/resources/ships/ship_05/images/"
    },

    "eagle" : {
      name : "ship_02",
      filename : "ship_05",
      type : ResourceObject.TYPES.png,
      resourcePath : "/resources/ships/ship_05/images/"
    }
  }

  static generic = {
    maxVelX: 0.5,
    maxVelY: 0.5,
    accX: 0.02,
    accY: 0.015,
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
    posDX : -25,
    posDY : 22
  }

  static propulsion = {
    type : PropulsionFactory.PROPULSION_TYPES.ionA,
    posDX: 5,
    posDY: 20,
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
    posDX: -100,
    posDY: -100,
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
      posDX: 50,
      posDY: 20
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
      posDY : 15
    }
  }
}