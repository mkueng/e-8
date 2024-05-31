class HudHandler {

  #staticContext;
  #dynamicContextLeft;
  #dynamicContextRight;

  #initContexts = () => {

    //dynamic middle
    this.dynamicContextMiddle = this.canvasHandler.getCanvas("hudDynamicMiddle").context;
    this.dynamicContextMiddle.width = this.canvasHandler.getCanvas("hudDynamicMiddle").width;
    this.dynamicContextMiddle.height = this.canvasHandler.getCanvas("hudDynamicMiddle").height;

    //dynamic left
    this.#dynamicContextLeft = this.canvasHandler.getCanvas("hudDynamicLeft").context;
    this.#dynamicContextLeft.width = this.canvasHandler.getCanvas("hudDynamicLeft").width;
    this.#dynamicContextLeft.height = this.canvasHandler.getCanvas("hudDynamicLeft").height;
    this.#dynamicContextLeft.transform(0.1, 1.2, 1, 0, 0, 0)
    this.#dynamicContextLeft.font = "11px myFont";

    //dynamic right
    this.#dynamicContextRight = this.canvasHandler.getCanvas("hudDynamicRight").context;
    this.#dynamicContextRight.width = this.canvasHandler.getCanvas("hudDynamicRight").width;
    this.#dynamicContextRight.height = this.canvasHandler.getCanvas("hudDynamicRight").height;
    this.#dynamicContextRight.transform(-0.15, 1.2, 1, 0, 50, 0);
    this.#dynamicContextRight.font = "10px myFont";
  }


  constructor() {
    this.canvasHandler = e8.global.canvasHandler;
    this.#initContexts();

    this.hudImage = document.querySelector("#hud");
    this.naviImage = document.querySelector("#navi");
    this.naviOrbImage = document.querySelector("#navi-orb");
    this.naviImagePosX = (e8.global.screenWidth / 6 - this.naviImage.width) / 2
    this.naviOrbImagePosX = (e8.global.screenWidth / 6 - (this.naviOrbImage.width / 2));
    this.propulsionInfoBarColor = "green";
    this.#initContexts();
    this.fillRectNavi = this.dynamicContextMiddle.fillRect.bind(this.dynamicContextMiddle);
    this.fillRectRight = this.#dynamicContextRight.fillRect.bind(this.#dynamicContextRight);
    this.fillRectLeft = this.#dynamicContextLeft.fillRect.bind(this.#dynamicContextLeft);

    this.#updateDisplayLeft();
    this.#updateDisplayRight();

    setInterval(() => {
      this.#updateDisplayRight();
      this.#updateDisplayLeft();
    }, 1000);


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

  #updateDisplayLeft = () => {
    this.#dynamicContextLeft.clearRect(-20, -20, this.#dynamicContextLeft.width, this.#dynamicContextLeft.height);
    this.#dynamicContextLeft.lineWidth = 7;
    this.#dynamicContextLeft.strokeStyle = "grey";
    this.#dynamicContextLeft.fillStyle = e8.global.colors.info;
    this.#dynamicContextLeft.fillText("WEAPONS STATUS", 0, 10);
    this.#dynamicContextLeft.strokeRect(-20, 20, this.#dynamicContextLeft.width, this.#dynamicContextLeft.height);
    let i=0;

    for (const weapon in this.#weapons) {
      this.#dynamicContextLeft.fillStyle = e8.global.colors.info;
      this.#dynamicContextLeft.fillText(weapon, 5, 35+i);
      this.#dynamicContextLeft.fillStyle = e8.global.colors.vanilla;
      this.#dynamicContextLeft.fillText(this.#weapons[weapon].units.length, 300, 35+i);
        i+=15;
    }
  }

  #updateDisplayRight = () => {
    this.#dynamicContextRight.clearRect(-20, -20, this.#dynamicContextRight.width + 20, this.#dynamicContextRight.height + 20);
    this.#dynamicContextRight.fillStyle = e8.global.colors.neutral;
    this.#dynamicContextRight.fillText("SHIP STATUS", -30, -10);
    this.#dynamicContextRight.lineWidth = 7;
    this.#dynamicContextRight.strokeStyle = "grey";
    this.#dynamicContextRight.strokeRect(-100, 0, this.#dynamicContextRight.width + 20, this.#dynamicContextRight.height);
    this.#dynamicContextRight.fillText("TIME - " + this.#time, -20, 15);
    this.#dynamicContextRight.fillText("COORDINATES - " + this.#coordinates, -20, 30);
    this.#dynamicContextRight.fillStyle = e8.global.colors.neutral;
    this.#dynamicContextRight.fillText("SYSTEMS STATUS - " + this.#systemsStatus, -20, 45);
    this.#dynamicContextRight.fillStyle = e8.global.colors.info;
    this.#dynamicContextRight.fillText("FUEL", -20, 60);
    this.fillRectRight(60, 55, this.#fuel, 6);
    this.#dynamicContextRight.fillText("SHIELD", -20, 75);

    let shieldInfoBarColor;
    if (this.#shield) {

      shieldInfoBarColor =
          this.#shield < 30 ? "red" :
              this.#shield < 60 ? "yellow" :
                  "lightgreen";
    } else shieldInfoBarColor = "grey";

    this.#dynamicContextRight.strokeRect(80, 67, 100, 8);
    this.#dynamicContextRight.fillStyle = shieldInfoBarColor;
    this.fillRectRight(80, 68, this.#shield, 6);
  }

  renderNavi = () => {
    const {dynamicContextMiddle, naviOrbImagePosX, naviOrbImage, hudImage} = this;
    const {screenWidth, screenHeight, colors} = e8.global;
    const {enemyShips} = EnemyShipHandler;

    dynamicContextMiddle.clearRect(0, 0, dynamicContextMiddle.width, dynamicContextMiddle.height);

    for (const { posX, posY, width } of Object.values(enemyShips)) {
      const naviCoordXQuotient = screenWidth / posX * 3.5;
      const naviCoordYQuotient = screenHeight / posY * 2.2;
      const rectX = naviOrbImagePosX + naviOrbImage.width / naviCoordXQuotient + 77;
      const rectY = 30 + naviOrbImage.height / naviCoordYQuotient;

      dynamicContextMiddle.fillStyle = width > 150 ? colors.alloyOrange : colors.tiffanyBlue;
      dynamicContextMiddle.fillRect(rectX, rectY, 5, 5);
    }

    dynamicContextMiddle.drawImage(naviOrbImage, naviOrbImagePosX, 10);
    dynamicContextMiddle.drawImage(hudImage, 0, 0, dynamicContextMiddle.width, dynamicContextMiddle.height);
  }

}