'use strict';

class EnemyShipFactory {


  static SHIP_TYPE = {
    0: { shipSize: 1, scale: 0.5, weapons : [ WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy] },
    1: { shipSize: 3, scale: 0.6, weapons : [ WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy] },
    2: { shipSize: 7, scale: 0.8,weapons : [ WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy] },
  };


  constructor({
    enemyShipHandler,
    resourceHandler,
    canvasHandler
  }){
    this.enemyShipHandler = enemyShipHandler;
    this.proceduralEnemyShipImageType1 = new ProceduralEnemyShipImageType1({resourceHandler, canvasHandler});
    this.explosionFactory = new ExplosionFactory({resourceHandler});
    this.weaponFactory = new WeaponFactory({resourceHandler})
  }

  /**
   *
   * @param canvas
   * @returns {Promise<void>}
   */
  invoke = async(canvas)=>{
    await this.proceduralEnemyShipImageType1.invoke();
    this.canvas = canvas
  }

  /**
   *
   * @param type {{shipSize: number, scale: number, weapons: [string]}}
   * @returns {Promise<void>}
   */
  createShip = async (type) => {
    const { shipSize, scale } = type;

    return new Promise(async (resolve) => {

      let terminationSequence = [];
      for (let i=0; i < shipSize; i++){
        const explosion = await  this.explosionFactory.createExplosion({
          type: ExplosionFactory.EXPLOSION_TYPES.classAEnemyShipExplosion,
          canvas: this.canvas,
          posDX: (i*(Math.random()*50+20))-50,
          posDY: (Math.random()*30-50),
        });
        terminationSequence.push(explosion)
      }

      //console.log("terminationSequence: ", terminationSequence);
      /*
      let terminationSequence = await  this.explosionFactory.createExplosion({
        type: ExplosionFactory.EXPLOSION_TYPES.classAEnemyShipExplosion,
        canvas: this.canvas,
        posDX: -10,
        posDY: -45,
      });
*/
      let weapons = {
        [WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy]: await  this.weaponFactory.createWeapon({
          type: WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy,
          amount: 1,
          canvas: this.canvas,
          posDX: -20,
          posDY: 12,
        }),
      };

      const shipImageBlob = await this.proceduralEnemyShipImageType1.create({ shipSize, scale });
      const img = new Image();

      img.onload = () => {
        let shipObject = new EnemyShip({
          image: img,
          width: img.width,
          height: img.height,
          posX: window.global.screenWidth,
          posY: Math.floor(Math.random() * window.global.screenHeight),
          posDX: 0,
          posDY: 0,
          velX: -1 * Math.random()*5,
          velY: 0,
          weapons: weapons,
          canvas: this.canvas,
          terminationSequence: terminationSequence,
          enemyShipHandler: this.enemyShipHandler
        });


        resolve(shipObject);
      };

      img.src = URL.createObjectURL(shipImageBlob);
    });
  };
}
