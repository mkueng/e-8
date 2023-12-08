'use strict';

class EnemyShipFactory {
  static instance = new this();

  static SHIP_TYPE = {
    classA: { shipSize: 1, scale: 0.5, weapons : [ WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy] },
    classB: { shipSize: 2, scale: 0.6, weapons : [ WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy] },
    classC: { shipSize: 3, scale: 0.8,weapons : [ WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy] },
  };

  invoke = async(canvas)=>{
    await ProceduralEnemyShipImageType1.instance.invoke();
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
      let terminationSequence = await ExplosionFactory.instance.createExplosion({
        type: ExplosionFactory.EXPLOSION_TYPES.classAEnemyShipExplosion,
        canvas: this.canvas,
        posDX: -10,
        posDY: -45,
      });

      let weapons = {
        [WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy]: await WeaponFactory.instance.createWeapon({
          type: WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy,
          amount: 1,
          canvas: this.canvas,
          posDX: -20,
          posDY: 12,
        }),
      };

      const shipImageBlob = await ProceduralEnemyShipImageType1.instance.create({ shipSize, scale });
      const img = new Image();

      img.onload = () => {
        let shipObject = new EnemyShip({
          image: img,
          width: img.width,
          height: img.height,
          posX: Math.floor(Math.random() * 700 + 600),
          posY: Math.floor(Math.random() * 1000 + 50),
          posDX: 0,
          posDY: 0,
          velX: -3 * Math.random(),
          velY: 0,
          weapons: weapons,
          canvas: this.canvas,
          terminationSequence: terminationSequence,
        });


        resolve(shipObject);
      };

      img.src = URL.createObjectURL(shipImageBlob);
    });
  };
}
