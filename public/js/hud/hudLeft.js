class HudLeft extends Hud{

  #weapons = {}

  constructor(){
    super({
      canvas: e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.hudDynamicLeft).canvas
    });
  }

  init = async () =>{
    this.context.transform(0.05, 1.2, 1, 0, 10, 0);
    this.context.transform(0.05, 1.2, 1, 0, 10, 0);
    this.context.font = "10px myFont";
    this.initStaticHud();
    this.context.fillStyle = e8.global.colors.lightVanilla;

    GameObjectsHandler.instance.addGameObject(this);
  }


  update = ()=>{

  }


  render = () => {
    const {context: ctx, canvas, offscreenCanvas} = this;
    const colors = e8.global.colors;

    // Clear the canvas
    ctx.clearRect(-10, -10, canvas.width+20, canvas.height+20);

    // Draw the static parts of the HUD
    ctx.drawImage(offscreenCanvas, 0, 0);

    ctx.fillText("WEAPONS STATUS", 10, 20);

    // Draw the dynamic parts of the HUD

    ctx.lineWidth = 1;


    let offset = 0;
    Object.entries(this.#weapons).forEach(([weapon, { units }]) => {
      ctx.beginPath();
      ctx.roundRect(offset, 33, 50, 30, 3);
      ctx.stroke();
      ctx.fillText(weapon, 5 + offset, 58);
      ctx.fillText(units.length, 5 + offset, 44);
      offset += 60;
    });
  };
}