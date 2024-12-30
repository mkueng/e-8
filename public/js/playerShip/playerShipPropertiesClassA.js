class PlayerShipPropertiesClassA {

  static imageResourceObjects = {
    "initial" : {
      name : "ship01ClassA",
      filename : "SpaceShip3D-2D",
      type : ResourceObject.TYPES.png,
      resourcePath : "/resources/ships/ship_01/images/"
    },

    "eagle" : {
      name : "ship01ClassA",
      filename : "SpaceShip3D-2D",
      type : ResourceObject.TYPES.png,
      resourcePath : "/resources/ships/ship_01/images/"
    }
  }

  static generic = {
    maxVelX: 4000,
    maxVelY: 10,
    accX: 0.065,
    accY: 0.065,
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
    posDX : -30,
    posDY : 22
  }

  static propulsion = {
    type : PropulsionFactory.PROPULSION_TYPES.ionA,
    posDX: -10,
    posDY: 19,
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
      posDX : 92,
      posDY : 25
    }
  }
}