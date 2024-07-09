class HudLeft extends Hud{

  #ticker = -1;

  constructor(){
    super({
      isContextPreventedOfBeingCleared: true,
      canvas: e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.hudDynamicLeft).canvas,

    });
  }

  init = async () =>{
    this.context.transform(0.05, 1.2, 1, 0, 10, 0);
    this.context.transform(0.05, 1.2, 1, 0, 10, 0);
    this.context.font = "10px myFont";
    this.initStaticHud({lineWidth: 34});
    this.context.fillStyle = e8.global.colors.lightVanilla;
    this.context.strokeStyle = e8.global.colors.vanilla;
    GameObjectsHandler.instance.addGameObject(this);
  }


  update = ()=>{
  }


  render = () => {
    this.#ticker++;
    if (this.#ticker % 60 === 0) {
      const weapons = PlayerShip.weapons;
      const {context: ctx, canvas, offscreenCanvas} = this;
      const colors = e8.global.colors;

      // Clear the canvas
      ctx.clearRect(-10, -10, canvas.width+20, canvas.height+20);

      // Draw the static parts of the HUD
      ctx.drawImage(offscreenCanvas, 0, 0);
      ctx.fillText("WEAPONS STATUS", 10, 12);


      let offset = 10;
      Object.entries(weapons).forEach(([weapon, {units}]) => {
        ctx.beginPath();
        ctx.roundRect(offset, 27, 50, 30, 3);
        ctx.stroke();
        ctx.fillText(weapon, 5 + offset, 51);
        ctx.fillText(units.length, 5 + offset, 40);
        offset += 58;
      });
    }
  };
}