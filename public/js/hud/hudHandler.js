class HudHandler {

  #staticContext;
  #dynamicContextLeft;
  #dynamicContextRight;

  #initContexts = () => {

    //dynamic middle
    this.dynamicContextMiddle = e8.global.canvasHandler.getCanvas("hudDynamicMiddle").context;
    this.dynamicContextMiddle.width = e8.global.canvasHandler.getCanvas("hudDynamicMiddle").width;
    this.dynamicContextMiddle.height = e8.global.canvasHandler.getCanvas("hudDynamicMiddle").height;
    this.dynamicContextMiddle.globalAlpha = 0.8;

    //dynamic left
    this.#dynamicContextLeft = e8.global.canvasHandler.getCanvas("hudDynamicLeft").context;
    this.#dynamicContextLeft.width = e8.global.canvasHandler.getCanvas("hudDynamicLeft").width;
    this.#dynamicContextLeft.height = e8.global.canvasHandler.getCanvas("hudDynamicLeft").height;
    this.#dynamicContextLeft.transform(0.05, 1.2, 1, 0, 10, 0);
    this.#dynamicContextLeft.transform(0.05, 1.2, 1, 0, 10, 0)
    this.#dynamicContextLeft.font = "10px myFont";

    //dynamic right
    this.#dynamicContextRight = e8.global.canvasHandler.getCanvas("hudDynamicRight").context;
    this.#dynamicContextRight.width = e8.global.canvasHandler.getCanvas("hudDynamicRight").width;
    this.#dynamicContextRight.height = e8.global.canvasHandler.getCanvas("hudDynamicRight").height;
    this.#dynamicContextRight.transform(-0.05, 1.2, 1, 0, 40, 0);
    this.#dynamicContextRight.transform(-0.05, 1.2, 1, 0, 40, 0);
    this.#dynamicContextRight.font = "10px myFont";
  }


  constructor() {
    this.hudImage = document.querySelector("#hud");
    this.naviOrbImage = document.querySelector("#navi-orb");
    this.naviOrbImagePosX = (e8.global.screenWidth / 6 - (this.naviOrbImage.width / 2));

    setInterval(() => {
      this.#renderDisplayLeft();
      this.#renderDisplayRight();

      //console.log("hud render time: ", stop - start);
    }, 500);
  }

  init = async() => {

    this.#initContexts();
    this.fillRectRight = this.#dynamicContextRight.fillRect.bind(this.#dynamicContextRight);


  }

  #time;
  #coordinates;
  #fuel;
  #shield;
  #systemsStatus;
  #weapons;


  updateHudInfo = ({
                     time,
                     coordinates,
                     fuel,
                     shield,
                     systemsStatus,
                     weapons
                   }) => {
    this.#time = time || this.#time;
    this.#fuel = fuel || this.#fuel;
    this.#shield = shield || this.#shield;
    this.#weapons = weapons || this.#weapons;
    this.#coordinates = coordinates || this.#coordinates;
    this.#systemsStatus = systemsStatus || this.#systemsStatus;
  }

  #renderDisplayLeft = () => {
    const ctx = this.#dynamicContextLeft;
    const colors = e8.global.colors;

    ctx.clearRect(-20, -20, ctx.width, ctx.height);
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 8;
    ctx.fillStyle = colors.lightVanilla;
    ctx.strokeStyle = colors.vanilla;
    ctx.strokeRect(-20, 22, ctx.width, ctx.height);
    ctx.fillRect(-20, 20, ctx.width, ctx.height);
    ctx.globalAlpha = 0.8;
    ctx.fillText("WEAPONS STATUS", 0, 10);

    let i=0;
    ctx.lineWidth = 1;
    Object.entries(this.#weapons).forEach(([weapon, { units }], index) => {
      const offset = index * 60;
      ctx.beginPath();
      ctx.roundRect(offset, 33, 50, 30, 3);
      ctx.stroke();
      ctx.fillText(weapon, 5 + offset, 58);
      ctx.fillText(units.length, 5 + offset, 44);
    });
  }


  #renderDisplayRight = () => {
    const ctx = this.#dynamicContextRight;
    const colors = e8.global.colors;

    ctx.clearRect(-40, -20, this.#dynamicContextRight.width + 20, this.#dynamicContextRight.height + 20);
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 8;
    ctx.fillStyle = colors.lightVanilla;
    ctx.fillRect(-100, 0, this.#dynamicContextRight.width + 20, this.#dynamicContextRight.height);

    ctx.strokeRect(-100, 2, this.#dynamicContextRight.width + 20, this.#dynamicContextRight.height);
    ctx.globalAlpha = 0.6;
    ctx.fillText("SHIP STATUS", -20, -10);
    ctx.lineWidth = 2;
    ctx.fillText("TIME - " + this.#time, -20, 20);
    ctx.fillText("COORDINATES - " + this.#coordinates, -20, 35);
    ctx.fillText("SYSTEMS STATUS - " + this.#systemsStatus, -20, 50);
    ctx.fillStyle = colors.info;
    ctx.strokeStyle = e8.global.colors.alloyOrange;
    ctx.beginPath();
    ctx.roundRect(225, 55, 45,30,45);
    ctx.roundRect(225, 15, 45,30,45);
    ctx.roundRect(280, 15, 45,30,45);
    ctx.roundRect(280, 55, 45,30,45);
    ctx.stroke();
    ctx.strokeStyle = e8.global.colors.neutral;
    ctx.fillText("FUEL", -20, 67);

    let fuelInfoBarColor;
    if (this.#fuel > 100) this.#fuel = 100;

    fuelInfoBarColor =
      this.#fuel < 30 ? "red" :
        this.#fuel < 60 ? "yellow" :
          "lightgreen";

    ctx.strokeRect(40, 60, 100, 8);
    ctx.fillStyle = fuelInfoBarColor;
    this.fillRectRight(40, 61, this.#fuel, 6);
    ctx.fillStyle = colors.info;
    ctx.fillText("SHIELD", -20, 84);

    let shieldInfoBarColor;
    if (this.#shield) {

      shieldInfoBarColor =
          this.#shield < 30 ? "red" :
              this.#shield < 60 ? "yellow" :
                  "lightgreen";
    } else shieldInfoBarColor = "grey";

    ctx.strokeRect(40, 76, 100, 8);
    ctx.fillStyle = shieldInfoBarColor;
    this.fillRectRight(40, 77, this.#shield, 6);
  }

  renderNavi = () => {
    const { dynamicContextMiddle: ctx, naviOrbImagePosX, naviOrbImage, hudImage } = this;
    const { screenWidth, screenHeight, colors } = e8.global;
    const enemyShips = EnemyShipHandler.enemyShips;

    ctx.clearRect(0, 0, ctx.width, ctx.height);

    Object.values(enemyShips).forEach(({ posX, posY, width }) => {
      const rectX = naviOrbImagePosX + naviOrbImage.width / (screenWidth / posX * 3.5) + 65;
      const rectY = 30 + naviOrbImage.height / (screenHeight / posY * 2.2);

      ctx.fillStyle = width > 150 ? colors.alloyOrange : colors.tiffanyBlue;
      ctx.fillRect(rectX, rectY, 5, 5);
    });

    ctx.drawImage(naviOrbImage, naviOrbImagePosX, 10);
    ctx.drawImage(hudImage, 0, 0, ctx.width, ctx.height);
  }
}