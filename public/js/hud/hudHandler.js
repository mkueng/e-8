class HudHandler {

  #staticContext;
  #dynamicContextLeft;
  #dynamicContextRight;

  #initContexts = () => {

    //dynamic middle
    this.dynamicContextMiddle = e8.global.canvasHandler.getCanvas("hudDynamicMiddle").context;
    this.dynamicContextMiddle.width = e8.global.canvasHandler.getCanvas("hudDynamicMiddle").width;
    this.dynamicContextMiddle.height = e8.global.canvasHandler.getCanvas("hudDynamicMiddle").height;

    //dynamic left
    this.#dynamicContextLeft = e8.global.canvasHandler.getCanvas("hudDynamicLeft").context;
    this.#dynamicContextLeft.width = e8.global.canvasHandler.getCanvas("hudDynamicLeft").width;
    this.#dynamicContextLeft.height = e8.global.canvasHandler.getCanvas("hudDynamicLeft").height;
    this.#dynamicContextLeft.transform(0.05, 1.2, 1, 0, 10, 0)
    this.#dynamicContextLeft.font = "8px myFont";

    //dynamic right
    this.#dynamicContextRight = e8.global.canvasHandler.getCanvas("hudDynamicRight").context;
    this.#dynamicContextRight.width = e8.global.canvasHandler.getCanvas("hudDynamicRight").width;
    this.#dynamicContextRight.height = e8.global.canvasHandler.getCanvas("hudDynamicRight").height;
    this.#dynamicContextRight.transform(-0.05, 1.2, 1, 0, 40, 0);
    this.#dynamicContextRight.font = "8px myFont";
  }


  constructor() {
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
    this.renderNavi();

    this.#updateDisplayLeft();
    this.#updateDisplayRight();

    setInterval(() => {
      this.#updateDisplayRight();
      this.#updateDisplayLeft();

    }, 1000);
  }

  init = async() => {

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
    this.#dynamicContextLeft.globalAlpha = 0.1;
    this.#dynamicContextLeft.lineWidth = 3;
    this.#dynamicContextLeft.strokeRect(-20, 22, this.#dynamicContextLeft.width, this.#dynamicContextLeft.height);
    this.#dynamicContextLeft.fillRect(-20, 20, this.#dynamicContextLeft.width, this.#dynamicContextLeft.height);
    this.#dynamicContextLeft.lineWidth = 1;
    this.#dynamicContextLeft.globalAlpha = 0.8;
    this.#dynamicContextLeft.strokeStyle = e8.global.colors.vanilla;
    this.#dynamicContextLeft.fillStyle = e8.global.colors.lightVanilla;
    this.#dynamicContextLeft.fillText("WEAPONS STATUS", 0, 10);


    let i=0;


    for (const weapon in this.#weapons) {
      this.#dynamicContextLeft.beginPath();
      this.#dynamicContextLeft.roundRect(i, 30, 50,30,3);
      this.#dynamicContextLeft.stroke();
      //this.#dynamicContextLeft.fillStyle = e8.global.colors.info;
      this.#dynamicContextLeft.fillText(weapon, 5+i, 55);
      //this.#dynamicContextLeft.fillStyle = e8.global.colors.vanilla;
      this.#dynamicContextLeft.fillText(this.#weapons[weapon].units.length, 5+i, 40);
        i+=60;
    }
  }

  #updateDisplayRight = () => {
    this.#dynamicContextRight.clearRect(-40, -20, this.#dynamicContextRight.width + 20, this.#dynamicContextRight.height + 20);
    this.#dynamicContextRight.globalAlpha = 0.1;
    this.#dynamicContextRight.fillStyle = e8.global.colors.lightVanilla;
    this.#dynamicContextRight.fillRect(-100, 0, this.#dynamicContextRight.width + 20, this.#dynamicContextRight.height);
    this.#dynamicContextRight.lineWidth = 3;
    this.#dynamicContextRight.strokeRect(-100, 2, this.#dynamicContextRight.width + 20, this.#dynamicContextRight.height);
    this.#dynamicContextRight.globalAlpha = 0.6;
    this.#dynamicContextRight.fillText("SHIP STATUS", -20, -10);
    this.#dynamicContextRight.lineWidth = 2;



    this.#dynamicContextRight.fillText("TIME - " + this.#time, -20, 15);
    this.#dynamicContextRight.fillText("COORDINATES - " + this.#coordinates, -20, 30);

    this.#dynamicContextRight.fillText("SYSTEMS STATUS - " + this.#systemsStatus, -20, 45);
    this.#dynamicContextRight.fillStyle = e8.global.colors.info;
    this.#dynamicContextRight.strokeStyle = e8.global.colors.alloyOrange;
    this.#dynamicContextRight.beginPath();
    this.#dynamicContextRight.roundRect(160, 10, 50,30,3);
    this.#dynamicContextRight.roundRect(220, 10, 50,30,3);
    this.#dynamicContextRight.roundRect(280, 10, 50,30,3);
    this.#dynamicContextRight.stroke();
    this.#dynamicContextRight.strokeStyle = e8.global.colors.neutral;
    this.#dynamicContextRight.fillText("FUEL", -20, 60);
    this.#dynamicContextRight.strokeRect(40, 54, 100, 8);


    if (this.#fuel > 100) this.#fuel = 100;
    this.fillRectRight(40, 55, this.#fuel, 6);
    this.#dynamicContextRight.fillText("SHIELD", -20, 75);

    let shieldInfoBarColor;
    if (this.#shield) {

      shieldInfoBarColor =
          this.#shield < 30 ? "red" :
              this.#shield < 60 ? "yellow" :
                  "lightgreen";
    } else shieldInfoBarColor = "grey";

    this.#dynamicContextRight.strokeRect(40, 67, 100, 8);
    this.#dynamicContextRight.fillStyle = shieldInfoBarColor;
    this.fillRectRight(40, 68, this.#shield, 6);
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