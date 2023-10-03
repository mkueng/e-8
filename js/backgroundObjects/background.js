class Background {

  constructor(args){
    this.id = args.id;
    this.image = args.image;
    this.width = args.width;
    this.height = args.height;
    this.x = args.x;
    this.y = args.y;
    this.step = args.step;
    this.context = args.context;
    this.doubleDraw = args.doubleDraw || false;
    this.callback = args.callback;
  }
}