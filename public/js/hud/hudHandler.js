class HudHandler {

  #staticContext;
  #dynamicContextLeft;
  #dynamicContextRight;

  #initContexts = () => {

  }


  constructor() {

    setInterval(() => {
      //this.#renderDisplayLeft();
      //this.#renderDisplayRight();

      //console.log("hud render time: ", stop - start);
    }, 500);
  }

  init = async() => {

    //this.#initContexts();
    //this.fillRectRight = this.#dynamicContextRight.fillRect.bind(this.#dynamicContextRight);


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
      PlayerShip.fuel < 30 ? "red" :
        PlayerShip.fuel < 60 ? "yellow" :
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

    ctx.strokeRect(40, 76, 103, 8);
    ctx.fillStyle = shieldInfoBarColor;
    this.fillRectRight(40, 77, this.#shield, 6);
  }


}