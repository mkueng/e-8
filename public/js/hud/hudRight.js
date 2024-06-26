class HudRight extends Hud{

  constructor(){
    super({
      canvas : e8.global.canvasHandler.getCanvas(CanvasHandler.canvasTypes.hudDynamicRight).canvas
    });
  }

  init = async ()=>{
    this.context.transform(-0.08, 2.4, 1, 0, 15, 0);
    this.context.transform(-0.08, 2.4, 1, 0, 15, 0);
    this.context.font = "10px myFont";
    this.initStaticHud();

    GameObjectsHandler.instance.addGameObject(this);
  }


  update = ()=>{

  }


  render = () => {

    const {context: ctx, canvas, offscreenCanvas} = this;
    const colors = e8.global.colors;

    ctx.clearRect(-10,-10, canvas.width+20, canvas.height+20);

    ctx.drawImage(offscreenCanvas, 0, 0);
  }
}