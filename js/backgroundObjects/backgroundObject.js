class BackgroundObject {
  constructor(args = {}) {
    this.props = {
      id: args.id,
      imageSrc: null,
      width: args.width,
      height: args.height,
      x: args.x,
      y: args.y,
      step: args.step,
      canvasId: args.canvasId,
      offscreenCanvas: null,
      onStage: args.onStage || 0,
      interval: args.interval || 0
    }
  }

  init = async () => {
    const resource = await ResourceHandler.instance.getResources([this.props.id]);
    this.props.imageSrc = resource[0].image.src;
    this.props.offscreenCanvas = CanvasHandler.instance.getBackgroundCanvas(this.props.canvasId).canvas;
    return this;
  }
}
