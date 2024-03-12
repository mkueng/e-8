class PlayerShipPropertiesClassB {

  static propulsion = {
    type : PropulsionFactory.PROPULSION_TYPES.ionA,
    posDX: -15,
    posDY: 25
  }

  static fuel = {
    type: FuelFactory.FUEL_TYPES.xenon,
    amount: 100,
    max: 200
  }

  static shield = {
    type: ShieldFactory.SHIELD_TYPES.classAShield,
    posDX: -70,
    posDY: -115
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

    PhotonTorpedo : {
      controlAssignment : "Space",
      type: WeaponFactory.WEAPON_TYPES.photonTorpedo,
      amount: 10,
      posDX: 90,
      posDY: 27
    },

    PhotonTorpedoFireAndForget : {
      controlAssignment : "ControlRight",
      type : WeaponFactory.WEAPON_TYPES.photonTorpedoFireAndForget,
      amount: 10,
      posDX : 60,
      posDY : 27
    },

    Laser : {
      controlAssignment : "KeyL",
      type : WeaponFactory.WEAPON_TYPES.laser,
      amount: 1,
      posDX : 145,
      posDY : 25
    }
  }

}