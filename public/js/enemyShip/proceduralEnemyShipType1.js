class ProceduralEnemyShipType1 {

  #proceduralEnemyShipType1Image;

  static shipTypeVariations = {
    0: {
      shipSize: 1,
      scale: 0.5,
      weapons: [WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy],
      propulsion:  {
        type : PropulsionFactory.PROPULSION_TYPES.ionB,
        posDX: 75,
        posDY: 7,
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
        posDX:-60,
        posDY:-8,
        width: 170,
        height: 50
      },
    },
    1: {
      shipSize: 3,
      scale: 0.6,
      particles: [],
      playerShipTracking : true,
      weapons : [ WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy],
      propulsion:  {
        type : PropulsionFactory.PROPULSION_TYPES.ionB,
        posDX: 165,
        posDY: 10,
        isActive: true
      },
      spinner: {
        type : PropulsionFactory.PROPULSION_TYPES.spinner,
        posDX: 5,
        posDY: 4
      },
      shield: {
        type: ShieldFactory.SHIELD_TYPES.shieldB,
        posDX:-80,
        posDY:-28,
        width: 220,
        height:100
      },
    },
    2: {
      shipSize: 7,
      scale: 0.8,
      particles: [],
      playerShipTracking : false,
      weapons : [ WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy],
      propulsion:  {
        type : PropulsionFactory.PROPULSION_TYPES.ionB,
        posDX: 380,
        posDY: 17,
        isActive: true
      },
      spinner: {
        type : PropulsionFactory.PROPULSION_TYPES.spinner,
        posDX: 5,
        posDY: 8
      },
      shield: {
        type: ShieldFactory.SHIELD_TYPES.shieldB,
        posDX:-100,
        posDY:-22,
        width: 300,
        height:100
      },
    }
  }

  constructor(){
    this.#proceduralEnemyShipType1Image = new ProceduralEnemyShipImageType1()
  }

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

      shipTypeVariations[variation].particles = e8.global.particleGenerator.createParticles({
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