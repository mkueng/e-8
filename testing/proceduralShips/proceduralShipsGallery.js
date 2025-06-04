class ProceduralShipsGallery {

  constructor() {
    e8.global.screenHeight = 5000;
    this.canvasHandler = new CanvasHandler();
    this.canvasHandler.initCanvases();
    this.resourceHandler = new ResourceHandler({ resourcesBasePath: "../../public/" });

    this.propulsionFactory = new PropulsionFactory({resourceHandler: this.resourceHandler});
    this.shieldFactory = new ShieldFactory({resourceHandler: this.resourceHandler});
    this.explosionFactory = new ExplosionFactory({resourceHandler: this.resourceHandler});
    this.weaponFactory = new WeaponFactory({resourceHandler: this.resourceHandler});
    this.particleGenerator = new ParticleGenerator();

    this.enemyShipHandler = new EnemyShipHandler({
      canvasHandler: this.canvasHandler,
      resourceHandler: this.resourceHandler,
      propulsionFactory: this.propulsionFactory,
      shieldFactory: this.shieldFactory,
      explosionFactory: this.explosionFactory,
      weaponFactory: this.weaponFactory,
      particleGenerator: this.particleGenerator
    })


    this.init().then(() => {

      let posY = 40;

      const shipTypes = ProceduralEnemyShipFactory.shipTypes

      Object.entries(shipTypes).forEach(([key, shipType]) => {

        let shipTypeVariations = shipType.constructor.shipTypeVariations;

        Object.entries(shipTypeVariations).forEach(([key, value]) => {
          this.createShip({
            shipType: shipType,
            shipTypeVariation: value,
            posX: 300,
            posY: posY
          }).then(ship => {

            ship.shield.animationLoop = true;
            ship.velX = 0;
            ship.activate();
            setInterval(()=>{
              ship.fireWeapon();
            },1000)




          })
          posY += 150;
        })
      })

      this.drawAnimations();
    })

    /**
     *
     * @param shipType
     * @param shipTypeVariation
     * @param posX
     * @param posY
     * @returns {Promise<*>}
     */
    this.createShip = async({shipType, shipTypeVariation, posX, posY}) => {
      return await this.proceduralEnemyShipFactory.createShip({
        shipType: shipType,
        shipTypeVariation: shipTypeVariation,
        canvas: this.canvasHandler.getCanvas(CanvasHandler.canvasTypes.gallery).canvas,
        posX: posX,
        posY: posY
      });
    }
  }

  init = async () => {

    await this.enemyShipHandler.init(this.canvasHandler.getCanvas(CanvasHandler.canvasTypes.gallery));
    await this.shieldFactory.init();
    await this.propulsionFactory.init();
    await this.explosionFactory.init();
    await this.weaponFactory.init();

    this.proceduralEnemyShipFactory = new ProceduralEnemyShipFactory({
      canvasHandler: this.canvasHandler,
      resourceHandler: this.resourceHandler,
      enemyShipHandler: this.enemyShipHandler,
      shieldFactory: this.shieldFactory,
      propulsionFactory: this.propulsionFactory,
      explosionFactory: this.explosionFactory,
      weaponFactory: this.weaponFactory,
      particleGenerator: this.particleGenerator,
    })

    await this.proceduralEnemyShipFactory.invoke();

  }

  /**
   *
   */
  drawAnimations = () =>{



    GameObjectsHandler.instance.removeGameObjects();
    const length = GameObjectsHandler.gameObjects.length;
    for (let i = 0; i < length; i++) {
      GameObjectsHandler.gameObjects[i].updateStatic();
    }

    // Clear contexts
    for (let context in GameObjectsHandler.contexts) {

      GameObjectsHandler.contexts[context]
        .clearRect(0, 0, e8.global.screenWidth, e8.global.screenHeight);
    }

    // Render game objects
    const len = GameObjectsHandler.gameObjects.length;
    for (let i = 0; i < len; i++) {
      GameObjectsHandler.gameObjects[i].renderStatic();
    }


    requestAnimationFrame(this.drawAnimations);
  }


}