'use strict';

class EnemyShipFactory {

  static shipTypes = {
    EnemyShipType1: EnemyShipType1
  }

  constructor({
    enemyShipHandler,
    resourceHandler,
    canvasHandler,
    particleGenerator,
  }){
    this.particlesContext = canvasHandler.getCanvas(CanvasHandler.canvasTypes.explosion).context;
    this.particlesCanvas = canvasHandler.getCanvas(CanvasHandler.canvasTypes.explosion).canvas;
    this.enemyShipHandler = enemyShipHandler;
    this.explosionFactory = new ExplosionFactory({resourceHandler});
    this.weaponFactory = new WeaponFactory({resourceHandler});
    this.shieldFactory = new ShieldFactory({resourceHandler});

    EnemyShipFactory.shipTypes.EnemyShipType1 = new EnemyShipType1({
      resourceHandler, canvasHandler, particleGenerator
    })
  }

  /**
   *
   * @returns {Promise<void>}
   */
  invoke = async () =>{
    await this.shieldFactory.invoke();
    await this.weaponFactory.invoke();
    await this.explosionFactory.invoke();
    await EnemyShipFactory.shipTypes.EnemyShipType1.invoke();
  }

  /**
   *
   * @param type
   * @param variation
   * @param canvas
   * @returns {Promise<unknown>}
   */
  createShip = async ({type, typeVariation, canvas}) => {
    const {shipSize, shield} = typeVariation;

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
        particles: typeVariation.particles.slice(),
        context: this.particlesContext,
        canvas: this.particlesCanvas
      })

      //wait for ship image to be created
      const shipImageData = await type.createImage({typeVariation});
      const img = new Image();
      //create object URL from shipImage data
      img.src = URL.createObjectURL(shipImageData.blob);

      //create ship instance once ship image is loaded
      img.onload = () => {
        const velX = -1 * (Math.random()*3+2-(shipSize/4));
     
        let shipObject = new EnemyShip({
          canvas: canvas,
          enemyShipHandler: this.enemyShipHandler,
          height: img.height,
          imageData: shipImageData.imageData,
          particles: particlesObject,
          posDX: 0,
          posDY: 0,
          posX: e8.global.screenWidth,
          posY: Math.floor(Math.random() * e8.global.screenHeight),
          shield: shieldInstance,
          terminationSequence: terminationSequence,
          velX: velX,
          velY: 0,
          weapons: weapons,
          width: img.width,
          image: img,
        });
        resolve(shipObject);
      };
    });
  };
}
