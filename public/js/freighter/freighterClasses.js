class ClassAFreighter {

  static resources = {};

  static imageResourceObject = new ResourceObject({
    name : "classAFreighter4",
    fileName : "classAFreighter4",
    fileType : ResourceObject.TYPES.png,
    resourcePath : "/resources/freighters/"
  })

  static properties = {
    posX: null,
    posY: null,
    posDX: 0,
    posDY: 0,
    velX: -0.7,
    velY: 0,
    maxVelX: 3,
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

  static invoke = async ({resourceHandler}) => {
    ClassAFreighter.resources = await Freighter.fetchResources({
      resourceHandler: resourceHandler,
      imageResourceObject: ClassAFreighter.imageResourceObject
    })
  }

}

class ClassBFreighter {

}