class ClassBPlayerShip extends PlayerShip{

  static #resourceObject = new ResourceObject({
    id : "ship01ClassA",
    filename : "ship_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/ships/ship_02/images/ship_02.png"
  })

  static async create(canvas) {

    let engineTrailFactory = await EngineTrailFactory.instance.invoke({
      posDX: -10,
      posDY: 32
    });

    let propulsion = await PropulsionFactory.instance.createPropulsion({
      type: PropulsionFactory.PROPULSION_TYPES.ionA,
      canvas: canvas,
      posDX: -10,
      posDY: 30
    });

    let shield = await ShieldFactory.instance.createShield({
      relatedShip: this,
      type: ShieldFactory.SHIELD_TYPES.classAShield,
      canvas,
      posDX: -70,
      posDY: -115
    })

    let terminationSequence = await ExplosionFactory.instance.createExplosion({
      type: ExplosionFactory.EXPLOSION_TYPES.classAPlayerShipExplosion,
      canvas: canvas,
      posDX: -40,
      posDY: -50
    })

    let weapons = {

      PhotonTorpedo : {
        controlAssignment : "Space",
        units: await WeaponFactory.instance.createWeapon({
          type: WeaponFactory.WEAPON_TYPES.photonTorpedo,
          controlAssignment : "Space",
          amount: 10,
          canvas: canvas,
          posDX: 60,
          posDY: 27
        })
      },

      PhotonTorpedoFireAndForget : {
        controlAssignment : "ControlRight",
        units :  await WeaponFactory.instance.createWeapon({
          type : WeaponFactory.WEAPON_TYPES.photonTorpedoFireAndForget,
          controlAssignment : "ControlRight",
          amount: 10,
          canvas: canvas,
          posDX : 60,
          posDY : 27
        })
      }
    }

    let imageResource = await ResourceHandler.instance.fetchResource(ClassBPlayerShip.#resourceObject);

    return new this({
      image : imageResource.image,
      width : imageResource.image.width,
      height : imageResource.image.height,
      posX : 100,
      posY : 100,
      posDX : 0,
      posDY : 0,
      velX : 0,
      velY : 0,
      maxVelX : 4,
      maxVelY : 4,
      accX : 0.3,
      accY : 0.3,
      canvas : canvas,
      dependencies  : [propulsion],
      weapons : weapons,
      shield : shield,
      terminationSequence : terminationSequence,
      engineTrailFactory : engineTrailFactory
    })
  }

  constructor({
                image,
                width,
                height,
                posX,
                posY,
                posDX,
                posDY,
                velX,
                velY,
                maxVelX,
                maxVelY,
                accX,
                accY,
                canvas,
                dependencies,
                weapons,
                shield,
                terminationSequence,
                engineTrailFactory
              }){
    super({
      image,
      width,
      height,
      posX,
      posY,
      posDX,
      posDY,
      velX,
      velY,
      maxVelX,
      maxVelY,
      accX,
      accY,
      canvas,
      dependencies,
      weapons,
      shield,
      terminationSequence,
      engineTrailFactory
    })
  }
}