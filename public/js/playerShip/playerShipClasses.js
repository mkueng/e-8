/**
 * Class A
 */
class ClassAShip {

  static resourceObject = new ResourceObject({
    name : "ship01ClassA",
    fileName : "SpaceShip3D-2D",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/ships/ship_01/images/"
  })

  static properties = {
    posX: 100,
    posY: 100,
    posDX: 0,
    posDY: 0,
    velX: 0,
    velY: 0,
    maxVelX: 4,
    maxVelY: 4,
    accX: 0.3,
    accY: 0.3
  }

  static engineTrail = {
    posDX : -20,
    posDY :27
  };
  static propulsion = {
    type : PropulsionFactory.PROPULSION_TYPES.ionA,
    posDX: -15,
    posDY: 25
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

/**
 * Class B
 */
class ClassBShip {

  static #resourceObject = new ResourceObject({
    name : "ship01ClassA",
    fileName : "ship_01",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/ships/ship_02/images/"
  })

  static properties = {
    posX: 100,
    posY: 100,
    posDX: 0,
    posDY: 0,
    velX: 0,
    velY: 0,
    maxVelX: 4,
    maxVelY: 4,
    accX: 0.3,
    accY: 0.3
  }

  static engineTrail = {
    posDX : -10,
    posDY :32
  };
  static propulsion = {
    type : PropulsionFactory.PROPULSION_TYPES.ionA,
    posDX: -10,
    posDY: 30
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

  static weapons = {

    PhotonTorpedo : {
      controlAssignment : "Space",
      type: WeaponFactory.WEAPON_TYPES.photonTorpedo,
      amount: 10,
      posDX: 60,
      posDY: 27
    },

    PhotonTorpedoFireAndForget : {
      controlAssignment : "ControlRight",
      type : WeaponFactory.WEAPON_TYPES.photonTorpedoFireAndForget,
      amount: 10,
      posDX : 60,
      posDY : 27
    }
  }

}