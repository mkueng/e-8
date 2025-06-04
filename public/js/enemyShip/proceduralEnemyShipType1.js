class ProceduralEnemyShipType1 {

  #proceduralEnemyShipType1Image;
  #particleGenerator;

  static shipTypeVariations = {
    0: {
      shipSize: 1,
      scale: 0.6,
      weapons: [{
        type : WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy,
        amount: 10,
        posDX: -50,
        posDY: 13
      }
      ],
      propulsion:  {
        type : PropulsionFactory.PROPULSION_TYPES.ionB,
        posDX: 85,
        posDY: -2,
        isActive: true
      },
      spinner: {
        type : PropulsionFactory.PROPULSION_TYPES.spinner,
        posDX: 5,
        posDY: 0
      },
      particles: [],
      playerShipTracking : true,
      shield: {
        type: ShieldFactory.SHIELD_TYPES.shieldB,
        posDX:-40,
        posDY:-12,
        width: 170,
        height: 60
      },
    },
    1: {
      shipSize: 3,
      scale: 0.7,
      particles: [],
      playerShipTracking : true,
      weapons: [{
        type : WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy,
        amount: 10,
        posDX: -50,
        posDY: 15
      }
      ],
      propulsion:  {
        type : PropulsionFactory.PROPULSION_TYPES.ionB,
        posDX: 175,
        posDY: 1,
        isActive: true
      },
      spinner: {
        type : PropulsionFactory.PROPULSION_TYPES.spinner,
        posDX: 5,
        posDY: 4
      },
      shield: {
        type: ShieldFactory.SHIELD_TYPES.shieldB,
        posDX:-40,
        posDY:-28,
        width: 220,
        height:100
      },
    },
    2: {
      shipSize: 5,
      scale: 0.8,
      particles: [],
      playerShipTracking : false,
      weapons: [{
        type : WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy,
        amount: 20,
        posDX: -20,
        posDY: 16
      }
      ],
      propulsion:  {
        type : PropulsionFactory.PROPULSION_TYPES.ionB,
        posDX: 280,
        posDY: 3,
        isActive: true
      },
      spinner: {
        type : PropulsionFactory.PROPULSION_TYPES.spinner,
        posDX: 5,
        posDY: 8
      },
      shield: {
        type: ShieldFactory.SHIELD_TYPES.shieldB,
        posDX:-70,
        posDY:-25,
        width: 300,
        height:100
      },
    },
    3: {
      shipSize: 7,
      scale: 1.0,
      particles: [],
      playerShipTracking : false,
      weapons: [{
        type : WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy,
        amount: 20,
        posDX: -50,
        posDY: 23
      }
      ],
      propulsion:  {
        type : PropulsionFactory.PROPULSION_TYPES.ionB,
        posDX: 435,
        posDY: 8,
        isActive: true
      },
      spinner: {
        type : PropulsionFactory.PROPULSION_TYPES.spinner,
        posDX: 5,
        posDY: 8
      },
      shield: {
        type: ShieldFactory.SHIELD_TYPES.shieldB,
        posDX:-70,
        posDY:-22,
        width: 300,
        height:100
      },
    }
  }

  /**
   *
   * @param particleGenerator
   * @param resourceHandler
   * @param canvasHandler
   */
  constructor({
                particleGenerator,
                resourceHandler,
                canvasHandler
  }){
    this.type = "EnemyShipType1";
    this.#particleGenerator = particleGenerator;
    this.#proceduralEnemyShipType1Image = new ProceduralEnemyShipImageType1({
      particleGenerator,
      resourceHandler,
      canvasHandler
    })
  }

  /**
   *
   * @returns {Promise<void>}
   */
  invoke = async () =>{
    await this.#proceduralEnemyShipType1Image.invoke();
    await this.#createParticlesForAllShipTypeVariations({
      shipType: this.#proceduralEnemyShipType1Image,
      shipTypeVariations: ProceduralEnemyShipType1.shipTypeVariations
    })
  }

  /**
   *
   * @param shipTypeVariation
   * @returns {Promise<*>}
   */
  createImage = async ({shipTypeVariation}) =>{
    return await this.#proceduralEnemyShipType1Image.create({
      shipSize: shipTypeVariation.shipSize,
      scale: shipTypeVariation.scale
    });
  }

  /**
   *
   * @param shipType
   * @param shipTypeVariations
   * @returns {Promise<void>}
   */
  #createParticlesForAllShipTypeVariations = async ({shipType, shipTypeVariations}) =>{
    for (const variation in shipTypeVariations) {
      const shipTypeImageData = await shipType.create({
        shipSize: shipTypeVariations[variation].shipSize,
        scale: shipTypeVariations[variation].scale
      });

      shipTypeVariations[variation].particles = this.#particleGenerator.createParticles({
        imageData: shipTypeImageData.imageData,
        stride: 22,
        particleWidthRange: 8,
        particleHeightRange: 8,
        velocityRangeX: 5,
        velocityRangeY: 5,
        colorRange: 0,
        colorOffset: 255
      });
    }
  }
}