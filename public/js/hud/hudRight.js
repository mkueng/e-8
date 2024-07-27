class HudRight extends Hud{

  #ticker = -1;

  constructor(){
    super({
      isContextPreventedOfBeingCleared: true,
      canvas : e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.hudDynamicRight).canvas
    });
  }

  init = async ()=>{
    this.context.transform(-0.08, 2.4, 1, 0, 15, 0);
    this.context.transform(-0.08, 2.4, 1, 0, 15, 0);
    this.context.font = "5px myFont";
    this.fillRect = this.context.fillRect.bind(this.context);
    this.initStaticHud({lineWidth: 17});

    GameObjectsHandler.instance.addGameObject(this);
  }


  update = ()=>{

  }


  render = () => {
    this.#ticker++;
    if (this.#ticker % 30 === 0) {
      const {context: ctx, canvas, offscreenCanvas} = this;
      const colors = e8.global.colors;

      ctx.clearRect(-10, -10, canvas.width + 20, canvas.height + 20);
      ctx.drawImage(offscreenCanvas, 0, 0);

      if (PlayerShip.status === "red") {
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = e8.global.colors.alloyOrange;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = colors.lightVanilla;
      ctx.strokeStyle = e8.global.colors.neutral;
      ctx.fillText("SHIP STATUS", 5, 6);
      ctx.fillText("COORDINATES : " + PlayerShip.coordinates.toFixed(0), 5, 16);
      ctx.fillText("VELOCITY : " + PlayerShip.velX.toFixed(2), 5, 22);


      //Fuel
      ctx.fillText("FUEL", 5, 35);
      let fuelInfoBarColor;
      fuelInfoBarColor =
        PlayerShip.fuel < 30 ? e8.global.colors.auburn :
          PlayerShip.fuel < 60 ? e8.global.colors.vanilla :
            e8.global.colors.tiffanyBlue;

      ctx.strokeRect(40, 31, 52, 4);
      ctx.fillStyle = fuelInfoBarColor;
      let fuelBarWidth = 50 * (PlayerShip.fuel / 100);
      this.fillRect(41, 32, fuelBarWidth, 2);

      //Shield
      ctx.fillStyle = colors.lightVanilla;
      ctx.fillText("SHIELD", 5, 42);
      let shieldInfoBarColor;
      if (PlayerShip.shield) {

        shieldInfoBarColor =
          PlayerShip.shield < 30 ? e8.global.colors.auburn :
            PlayerShip.shield < 60 ? e8.global.colors.vanilla :
              e8.global.colors.tiffanyBlue;
      } else shieldInfoBarColor = "grey";
      ctx.strokeRect(40, 38, 52, 4);
      ctx.fillStyle = shieldInfoBarColor;
      let shieldBarWidth = 50 * (PlayerShip.shield / 100);
      this.fillRect(41, 39, shieldBarWidth, 2);

    }
  }
}