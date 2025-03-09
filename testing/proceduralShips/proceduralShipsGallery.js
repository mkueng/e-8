class ProceduralShipsGallery {

  constructor() {
    this.canvas = document.getElementById("canvas");
    this.canvas.width = e8.global.screenWidth - 20;
    this.canvas.height = e8.global.screenHeight -20;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "15px courier,sans-serif";
    this.ctx.fillStyle = "white";

    this.particleGenerator = new ParticleGenerator();
    for (const shipType in ProceduralEnemyShipFactory.shipTypes)

    this.proceduralEnemyShipType2 = new ProceduralEnemyShipType1({ particleGenerator: this.particleGenerator });

    e8.global.canvasHandler = new CanvasHandler();
    e8.global.resourceHandler = new ResourceHandler({ resourcesBasePath: "../../public/resources" });

    this.enemyShipType1  = new ProceduralEnemyShipType1({ particleGenerator: this.particleGenerator })
    this.enemyShipType2 = new ProceduralEnemyShipType2({ particleGenerator: this.particleGenerator })

    this.variation = 0;
    this.x = 50;
    this.y = 100;

    this.init().then(() => {
      console.log("init complete");
    });
  }

  init = async () => {
    await this.enemyShipType1.invoke();
    await this.enemyShipType2.invoke();
    this.variationKeys1 = Object.keys(ProceduralEnemyShipType1.shipTypeVariations);
    this.variationKeys2 = Object.keys(ProceduralEnemyShipType2.shipTypeVariations);
    await this.createShips({
      shipTypes: {
        shipType1: this.enemyShipType1,
        shipType2: this.enemyShipType2
      }
    });
  }

  createShips = async ({shipTypes}) => {
    console.log("shipTypes:", shipTypes);
    for (const shipType in shipTypes) {
      for (let i = 0; i < 6; i++) {
        await this.createShip({shipType: shipTypes[shipType]})
      }
    }
  }

  createShip = async ({ shipType}) => {
    console.log("shipType:", shipType);
    //const { shipSize, shield, propulsion, spinner, playerShipTracking } = shipTypeVariation;
    const shipImageData = await shipType.createImage({

      shipTypeVariation: ProceduralEnemyShipType2.shipTypeVariations[""+this.variation]

    });
    const img = new Image();
    img.src = URL.createObjectURL(shipImageData.blob);
    img.onload = () => {
      this.ctx.drawImage(img, this.x, this.y);
      this.x = this.x + img.width+20;
      if (this.x > this.canvas.width - 100) {
        this.x = 50;
        this.y =this.y + img.height+50;
      }
      if (this.variation < this.variationKeys.length-1) {
        this.variation++;
      } else {
        this.variation = 0;
      }
      if (this.y < this.canvas.height - 100) {
        this.createShip({shipType: this.enemyShipType1})
      }
    }


  }
}