'use strict';

class ProceduralEnemyShipFactory {

  static shipTypes = {
    "ProceduralEnemyShipType1": ProceduralEnemyShipType1,
    "ProceduralEnemyShipType2": ProceduralEnemyShipType2
  }

  static shipDependencies = {
    propulsion: "Propulsion",
    shield: "Shield"
  }

  /**
   *
   * @param canvasHandler
   * @param enemyShipHandler
   * @param shieldFactory
   * @param propulsionFactory
   * @param explosionFactory
   * @param weaponFactory
   * @param particleGenerator
   * @param resourceHandler
   */
  constructor({
                canvasHandler,
                enemyShipHandler,
                shieldFactory,
                propulsionFactory,
                explosionFactory,
                weaponFactory,
                particleGenerator,
                resourceHandler
  }){

    Object.assign(this, {
      canvasHandler,
      propulsionFactory,
      shieldFactory,
      explosionFactory,
      weaponFactory
    })

    this.particlesContext = canvasHandler.getCanvas(CanvasHandler.canvasTypes.explosion).context;
    this.particlesCanvas = canvasHandler.getCanvas(CanvasHandler.canvasTypes.explosion).canvas;
    this.enemyShipHandler = enemyShipHandler;
    ProceduralEnemyShipFactory.shipTypes.ProceduralEnemyShipType1 = new ProceduralEnemyShipType1({
      particleGenerator,
      resourceHandler,
      canvasHandler
    });
    ProceduralEnemyShipFactory.shipTypes.ProceduralEnemyShipType2 = new ProceduralEnemyShipType2({
      particleGenerator,
      resourceHandler,
      canvasHandler
    });
  }

  /**
   *
   * @returns {Promise<void>}
   */
  invoke = async () =>{
    await ProceduralEnemyShipFactory.shipTypes.ProceduralEnemyShipType1.invoke();
    await ProceduralEnemyShipFactory.shipTypes.ProceduralEnemyShipType2.invoke();
  }

  /**
   *
   * @param shipType
   * @param shipTypeVariation
   * @param canvas
   * @param posX
   * @param posY
   * @returns {Promise<unknown>}
   */
  createShip = async ({shipType, shipTypeVariation, canvas, posX, posY}) => {
    const {shipSize, shield, propulsion, spinner, weapons, hasPlayerShipTracking} = shipTypeVariation;


    return new Promise(async (resolve) => {
      const shieldInstance = this.shieldFactory.createShield({ ...shield, canvas });
      const propulsionInstance = this.propulsionFactory.createPropulsion({ ...propulsion, canvas });
      //const spinnerInstance = this.propulsionFactory.createPropulsion({ ...spinner, canvas });

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

      let weaponsInstances = {};
      weapons.forEach(weapon => {
        weaponsInstances[weapon.type.name] = this.weaponFactory.createWeapon({...weapon,canvas})
      })

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
        const velX = -1 * ((Math.random()*4*(1/shipSize))+3) /10;
     
        let shipObject = new EnemyShip({
          activeWeaponID: weapons[0].type.name,
          canvas: canvas,
          height: img.height,
          imageData: shipImageData.imageData,
          particles: particlesObject,
          posDX: 0,
          posDY: 0,
          posX: posX || e8.global.screenWidth+e8.global.screenWidth,//+e8.global.screenWidth,
          posY: posY || Math.floor(Math.random() * e8.global.screenHeight),
          posZ: 3,
          dependencies: [
            propulsionInstance,
            shieldInstance
          ],
          terminationSequence: terminationSequence,
          velX: velX,
          velY: 0,
          weapons: weaponsInstances,
          width: img.width,
          image: img,
          enemyShipHandler: this.enemyShipHandler,
          hasPlayerShipTracking : hasPlayerShipTracking
        });
        resolve(shipObject);
      };
    });
  };
}