class ProceduralEnemyShipType2 {

  #proceduralEnemyShipType2Image;
  #particleGenerator;

  static shipTypeVariations = {
    0: {
      shipSize: 2,
      scale: 1,
      weapons: [{
        type : WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy2,
        amount: 1,
        posDX: -50,
        posDY: 45
      }
      ],
      propulsion:  {
        type : PropulsionFactory.PROPULSION_TYPES.ionB,
        posDX: 340,
        posDY: 31,
        isActive: true
      },
      particles: [],
      playerShipTracking : true,
      shield: {
        type: ShieldFactory.SHIELD_TYPES.shieldC,
        posDX:-70,
        posDY:7,
        width: 280,
        height: 90
      },
    },
    1: {
      shipSize: 3,
      scale: 1,
      particles: [],
      playerShipTracking : true,
      weapons: [{
        type : WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy2,
        amount: 10,
        posDX: -50,
        posDY: 45
      }
      ],
      propulsion:  {
        type : PropulsionFactory.PROPULSION_TYPES.ionB,
        posDX: 445,
        posDY: 31,
        isActive: true
      },
      shield: {
        type: ShieldFactory.SHIELD_TYPES.shieldC,
        posDX:-65,
        posDY:0,
        width: 320,
        height:100
      },
    },
    2: {
      shipSize: 4,
      scale: 1,
      particles: [],
      playerShipTracking : false,
      weapons: [{
        type : WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy2,
        amount: 10,
        posDX: -50,
        posDY: 45
      }
      ],
      propulsion:  {
        type : PropulsionFactory.PROPULSION_TYPES.ionB,
        posDX: 540,
        posDY: 32,
        isActive: true
      },
      shield: {
        type: ShieldFactory.SHIELD_TYPES.shieldC,
        posDX:-87,
        posDY:0,
        width: 300,
        height:100
      },
    },
    3: {
      shipSize: 5,
      scale: 1,
      particles: [],
      playerShipTracking : false,
      weapons: [{
        type: WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy2,
        amount: 10,
        posDX: -50,
        posDY: 45
      }
      ],
      propulsion:  {
        type : PropulsionFactory.PROPULSION_TYPES.ionB,
        posDX: 640,
        posDY: 32,
        isActive: true
      },
      shield: {
        type: ShieldFactory.SHIELD_TYPES.shieldC,
        posDX:-80,
        posDY:-2,
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
    this.type = "EnemyShipType2";
    this.#particleGenerator = particleGenerator;
    this.#proceduralEnemyShipType2Image = new ProceduralEnemyShipImageType2({
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
    await this.#proceduralEnemyShipType2Image.invoke();
    await this.#createParticlesForAllShipTypeVariations({
      shipType: this.#proceduralEnemyShipType2Image,
      shipTypeVariations: ProceduralEnemyShipType2.shipTypeVariations
    })
  }

  /**
   *
   * @param shipTypeVariation
   * @returns {Promise<*>}
   */
  createImage = async ({shipTypeVariation}) =>{
    return await this.#proceduralEnemyShipType2Image.create({
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