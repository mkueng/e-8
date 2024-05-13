'use strict';

class ProceduralEnemyShipFactory {

  static shipTypes = {
    EnemyShipType1: ProceduralEnemyShipType1
  }

  constructor({
    resourceHandler,
    canvasHandler,
    particleGenerator,
    enemyShipHandler
  }){
    this.particlesContext = canvasHandler.getCanvas(CanvasHandler.canvasTypes.explosion).context;
    this.particlesCanvas = canvasHandler.getCanvas(CanvasHandler.canvasTypes.explosion).canvas;
    this.enemyShipHandler = enemyShipHandler,
    this.explosionFactory = new ExplosionFactory({resourceHandler});
    this.weaponFactory = new WeaponFactory({resourceHandler});
    this.shieldFactory = new ShieldFactory({resourceHandler});

    ProceduralEnemyShipFactory.shipTypes.EnemyShipType1 = new ProceduralEnemyShipType1({
      resourceHandler, canvasHandler, particleGenerator
    })
  }

  /**
   *
   * @returns {Promise<void>}
   */
  invoke = async () =>{
    await this.shieldFactory.fetchResources();
    await this.weaponFactory.invoke();
    await this.explosionFactory.invoke();
    await ProceduralEnemyShipFactory.shipTypes.EnemyShipType1.invoke();
  }

  /**
   *
   * @param shipType
   * @param shipTypeVariation
   * @param canvas
   * @returns {Promise<unknown>}
   */
  createShip = async ({shipType, shipTypeVariation, canvas}) => {
    const {shipSize, shield, playerShipTracking} = shipTypeVariation;

    return new Promise(async (resolve) => {

      //create shield instance
      const shieldInstance = this.shieldFactory.createShield({ ...shield, canvas });

      //create terminationSequence
      let terminationSequence = [];
      for (let i=0; i < shipSize; i++){
        const explosion = this.explosionFactory.createExplosion({
          type: ExplosionFactory.EXPLOSION_TYPES.classAEnemyShipExplosion,
          canvas: canvas,
          posDX: (i*(Math.random()*50+20))-50,
          posDY: (Math.random()*30-50),
        });
        terminationSequence.push(explosion)
      }

      let weapons = {
        [WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy]: this.weaponFactory.createWeapon({
          type: WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy,
          amount: 1,
          canvas: canvas,
          posDX: -20,
          posDY: 12,
        }),
      };

      let particlesObject = new ParticlesObject({
        particles: shipTypeVariation.particles.slice(),
        context: this.particlesContext,
        canvas: this.particlesCanvas
      })

      //wait for ship image to be created
      const shipImageData = await shipType.createImage({shipTypeVariation});
      const img = new Image();
      //create object URL from shipImage data
      img.src = URL.createObjectURL(shipImageData.blob);

      //create ship instance once ship image is loaded
      img.onload = () => {
        const velX = -1 * (Math.random()*3+2-(shipSize/5));
     
        let shipObject = new EnemyShip({
          canvas: canvas,
          height: img.height,
          imageData: shipImageData.imageData,
          particles: particlesObject,
          posDX: 0,
          posDY: 0,
          posX: e8.global.screenWidth,//+e8.global.screenWidth,
          posY: Math.floor(Math.random() * e8.global.screenHeight),
          shield: shieldInstance,
          terminationSequence: terminationSequence,
          velX: velX,
          velY: 0,
          weapons: weapons,
          width: img.width,
          image: img,
          enemyShipHandler: this.enemyShipHandler,
          playerShipTracking : playerShipTracking
        });
        resolve(shipObject);
      };
    });
  };
}
