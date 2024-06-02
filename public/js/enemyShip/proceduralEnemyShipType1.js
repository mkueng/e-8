class ProceduralEnemyShipType1 {

  #proceduralEnemyShipType1Image;

  static shipTypeVariations = {
    0: {
      shipSize: 1,
      scale: 0.5,
      weapons: [WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy],
      particles: [],
      playerShipTracking : true,
      shield: {
        type: ShieldFactory.SHIELD_TYPES.shieldB,
        posDX:-60,
        posDY:-10,
        width: 150,
        height: 50
      },
    },
    1: {
      shipSize: 3,
      scale: 0.6,
      particles: [],
      playerShipTracking : true,
      weapons : [ WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy],
      shield: {
        type: ShieldFactory.SHIELD_TYPES.shieldB,
        posDX:-80,
        posDY:-28,
        width: 200,
        height:100
      },
    },
    2: {
      shipSize: 7,
      scale: 0.8,
      particles: [],
      playerShipTracking : false,
      weapons : [ WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy],
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

  createImage = async ({shipTypeVariation}) =>{
    return await this.#proceduralEnemyShipType1Image.create({
      shipSize: shipTypeVariation.shipSize,
      scale: shipTypeVariation.scale
    });
  }


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