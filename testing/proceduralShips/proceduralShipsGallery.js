class ProceduralShipsGallery {

  constructor() {
    e8.global.canvasHandler = new CanvasHandler();
    e8.global.resourceHandler = new ResourceHandler({ resourcesBasePath: "../../public/resources" });
    this.canvas = document.getElementById("canvas");
    this.canvas.width = e8.global.screenWidth - 20;
    this.canvas.height = 5000;
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
    this.y = 50;

    this.init().then(() => {
      console.log("init complete");
      Promise.all(
        Object.values(this.enemyShips).flatMap(({ instance, variations }) =>
          Object.values(variations).flatMap(variation =>
            Array.from({ length: 3 }, () =>
              this.createShip({ shipType: instance, variation }).then(shipImageData =>
                this.drawShip({ shipImageData:shipImageData, shipType:instance.type, variation:variation})
              )
            )
          )
        )
      );
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

  drawShip ({shipImageData, shipType, variation}) {
    const img = new Image();
    img.src = URL.createObjectURL(shipImageData.blob);
    img.onload = () => {
      this.y =this.y + img.height+50;
      this.ctx.fillText(
        shipType+" | " +
        "Size: " + variation.shipSize +  " | " +
       "Scale: " + variation.scale + " | " +
        "Shield: " + variation.shield.type + " | " +
        "Propulsion: " + variation.propulsion.type + " | " +
        "Weapons: " + variation.weapons.map(type => type.resourceObject.name).join(", "),
        this.x, this.y);

      this.ctx.drawImage(img, this.x, this.y+20);
    }
  }

  createShip = async ({ shipType, variation}) => {
    return await shipType.createImage({
      shipTypeVariation: variation
    });
  }
}