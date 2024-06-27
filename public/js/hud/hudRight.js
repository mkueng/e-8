class HudRight extends Hud{

  constructor(){
    super({
      canvas : e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.hudDynamicRight).canvas
    });
  }

  init = async ()=>{
    this.context.transform(-0.08, 2.4, 1, 0, 15, 0);
    this.context.transform(-0.08, 2.4, 1, 0, 15, 0);
    this.context.font = "5px myFont";
    this.fillRect = this.context.fillRect.bind(this.context);
    this.initStaticHud({});

    GameObjectsHandler.instance.addGameObject(this);
  }


  update = ()=>{

  }


  render = () => {

    const {context: ctx, canvas, offscreenCanvas} = this;
    const colors = e8.global.colors;

    ctx.clearRect(-10,-10, canvas.width+20, canvas.height+20);
    ctx.drawImage(offscreenCanvas, 0, 0);
    ctx.fillStyle = colors.lightVanilla;
    ctx.strokeStyle = e8.global.colors.neutral;
    ctx.fillText("SHIP STATUS", 5, 10);
    ctx.fillText("COORDINATES : " + PlayerShip.coordinates.toFixed(2), 5, 20);
    ctx.fillText("VELOCITY : " + PlayerShip.velX.toFixed(2), 5, 27);


    //Fuel
    ctx.fillText("FUEL", 5, 34);
    let fuelInfoBarColor;
    fuelInfoBarColor =
      PlayerShip.fuel < 30 ? "red" :
        PlayerShip.fuel < 60 ? "yellow" :
          "lightgreen";

    ctx.strokeRect(40, 30, 52, 6);
    ctx.fillStyle = fuelInfoBarColor;
    let fuelBarWidth = 50 * (PlayerShip.fuel / 100);
    this.fillRect(41, 31, fuelBarWidth, 4);

    //Shield
    ctx.fillStyle = colors.lightVanilla;
    ctx.fillText("SHIELD", 5, 42);
    let shieldInfoBarColor;
    if (PlayerShip.shield) {

      shieldInfoBarColor =
          PlayerShip.shield < 30 ? "red" :
              PlayerShip.shield < 60 ? "yellow" :
                  "lightgreen";
    } else shieldInfoBarColor = "grey";
    ctx.strokeRect(40, 38, 52, 6);
ctx.fillStyle = shieldInfoBarColor;
    let shieldBarWidth = 50 * (PlayerShip.shield / 100);
    this.fillRect(41, 39, shieldBarWidth, 4);


  }
}