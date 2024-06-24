class ClassAFreighter {

  static resources = {};

  static imageResourceObject = new ResourceObject({
    name : "classAFreighter4",
    fileName : "classAFreighter_01",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/freighters/"
  })

  static properties = {
    posX: null,
    posY: null,
    posDX: 0,
    posDY: 0,
    velX: -0.2,
    velY: 0,
    maxVelX: 1,
    maxVelY: 3,
    cargo: {
      units: 300, //new Units({amount:300}),
      crystals: 400, //new Crystals({amount: 500}),
      fuel: 1000, //new Fuel({amount:1000}),
      antimatter: 600//new Antimatter({amount: 200})
    }
  }

  static shield = {
    type: ShieldFactory.SHIELD_TYPES.classAShield,
    posDX: -70,
    posDY: -115
  }

  static propulsion = {
    type : PropulsionFactory.PROPULSION_TYPES.ionC,
    posDX: +584,
    posDY: +40,
    isActive: true
  }

  static engineTrail = {
    type: EngineTrailFactory.ENGINE_TRAIL_TYPES.engineTrailB,
    posDX : +594,
    posDY : +44,
  }


  static invoke = async ({resourceHandler}) => {
    ClassAFreighter.resources = await Freighter.fetchResources({
      resourceHandler: resourceHandler,
      imageResourceObject: ClassAFreighter.imageResourceObject
    })
  }
}

class ClassBFreighter {
  static resources = {};

  static imageResourceObject = new ResourceObject({
    name : "classBFreighter",
    fileName : "classBFreighter",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/freighters/"
  })

  static properties = {
    posX: null,
    posY: null,
    width : 400,
    height: 100,
    posDX: 0,
    posDY: 0,
    velX: -0.2,
    velY: 0,
    maxVelX: 1,
    maxVelY: 3,
    cargo: {
      units: 300, //new Units({amount:300}),
      crystals: 400, //new Crystals({amount: 500}),
      fuel: 1000, //new Fuel({amount:1000}),
      antimatter: 600//new Antimatter({amount: 200})
    }
  }

  static shield = {
    type: ShieldFactory.SHIELD_TYPES.classAShield,
    posDX: -70,
    posDY: -115
  }

  static propulsion = {
    type : PropulsionFactory.PROPULSION_TYPES.ionC,
    posDX: +584,
    posDY: +40,
    isActive: true
  }

  static engineTrail = {
    type: EngineTrailFactory.ENGINE_TRAIL_TYPES.engineTrailB,
    posDX : +594,
    posDY : +44,
  }


  static invoke = async ({resourceHandler}) => {
    ClassBFreighter.resources = await Freighter.fetchResources({
      resourceHandler: resourceHandler,
      imageResourceObject: ClassBFreighter.imageResourceObject
    })
  }
}