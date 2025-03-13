class ProceduralShipsGallery {

  constructor() {
    e8.global.canvasHandler = new CanvasHandler();
    e8.global.resourceHandler = new ResourceHandler({ resourcesBasePath: "../../public/resources" });
    this.canvas = document.getElementById("canvas");
    this.canvas.width = e8.global.screenWidth - 20;
    this.canvas.height = e8.global.screenHeight -20;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "15px courier,sans-serif";
    this.ctx.fillStyle = "white";
    this.enemyShips = {};

    this.particleGenerator = new ParticleGenerator();
    this.enemyShips = this.createEnemyShipObjects({
      particleGenerator: this.particleGenerator,
      shipTypes:ProceduralEnemyShipFactory.shipTypes
    });
    console.log("this.enemyShips:", this.enemyShips);
    
    this.x = 50;
    this.y = 100;

    this.init().then(() => {
      console.log("init complete");
      for (const enemyShip in this.enemyShips) {
        
      }
    });
  }

  init = async () => {
    await Promise.all(Object.values(this.enemyShips).map(ship => ship.instance.invoke()));
  }

  createEnemyShipObjects({particleGenerator,shipTypes}) {
    return Object.fromEntries(
        Object.entries(shipTypes).map(([shipType, ShipClass]) => [
          shipType,
          {
            instance: new ShipClass({ particleGenerator }),
            variations: ShipClass.shipTypeVariations
          }
        ])
    );
  }


  createShips = async ({shipTypes}) => {
    console.log("shipTypes:", shipTypes);
    for (const shipType in shipTypes) {
      for (let i = 0; i < 6; i++) {
        await this.createShip({shipType: shipTypes[shipType]})
      }
    }
  }

  drawShip ({shipImageData}) {
    const img = new Image();
    img.src = URL.createObjectURL(shipImageData.blob);
    img.onload = () => {
      this.ctx.drawImage(img, this.x, this.y);
      this.x = this.x + img.width+20;
      if (this.x > this.canvas.width - 100) {
        this.x = 50;
        this.y =this.y + img.height+50;
      }
      /*
      if (this.variation < this.variationKeys.length-1) {
        this.variation++;
      } else {
        this.variation = 0;
      }
      if (this.y < this.canvas.height - 100) {
        this.createShip({shipType: this.enemyShipType1})
      }*/
    }
  }

  createShip = async ({ shipType, variation}) => {
    //console.log("shipType:", shipType);
    //const { shipSize, shield, propulsion, spinner, playerShipTracking } = shipTypeVariation;
    return await shipType.createImage({
      shipTypeVariation: variation
    });
  }
}