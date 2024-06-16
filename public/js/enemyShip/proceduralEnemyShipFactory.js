'use strict';

class ProceduralEnemyShipFactory {

  static shipTypes = {
    EnemyShipType1: ProceduralEnemyShipType1
  }

  constructor({
    enemyShipHandler
  }){
    this.particlesContext = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.explosion).context;
    this.particlesCanvas = e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.explosion).canvas;
    this.enemyShipHandler = enemyShipHandler;
    ProceduralEnemyShipFactory.shipTypes.EnemyShipType1 = new ProceduralEnemyShipType1()
  }

  /**
   *
   * @returns {Promise<void>}
   */
  invoke = async () =>{
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
      const shieldInstance = e8.global.shieldFactory.createShield({ ...shield, canvas });

      //create terminationSequence
      let terminationSequence = [];
      for (let i=0; i < shipSize; i++){
        const explosion = e8.global.explosionFactory.createExplosion({
          type: ExplosionFactory.EXPLOSION_TYPES.classAEnemyShipExplosion,
          canvas: canvas,
          posDX: (i*(Math.random()*50+20))-50,
          posDY: (Math.random()*30-50),
        });
        terminationSequence.push(explosion)
      }

      let weapons = {
        [WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy]: e8.global.weaponFactory.createWeapon({
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
        const velX = -1 * ((Math.random()*4*(1/shipSize))+3);
     
        let shipObject = new EnemyShip({
          canvas: canvas,
          height: img.height,
          imageData: shipImageData.imageData,
          particles: particlesObject,
          posDX: 0,
          posDY: 0,
          posX: e8.global.screenWidth,//+e8.global.screenWidth,
          posY: Math.floor(Math.random() * e8.global.screenHeight),
          posZ: velX*-0.2,
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
