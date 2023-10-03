class ProceduralPlanet {

  #offScreenContext = null;
  #offScreenCanvas = null;

  #mapCanvas;
  #mapContext;

  #canvas = null;
  #ctx = null;
  #valueVector = [];

  constructor(){
  }

  createPlanet=(radius)=>{

    const width = 6.5*radius;
    const height = 6.5*radius;

    this.initializeCanvases(width, height, radius);

    this.generateNoise(width,height);

    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*155+100);
    const q = Math.floor(Math.random()*100+155);


    this.drawMap(r,g,b,q, width, height,this.#mapContext);
    this.wrapSphere(radius, width, height, this.#mapContext, this.#offScreenContext);
    this.addAtmosphere(r,g,b,radius, this.#offScreenContext);
    this.addGradient(radius, this.#offScreenContext);

    // only draw image where mask is
    this.#offScreenContext.globalCompositeOperation = 'destination-in';

    // draw our circle mask
    this.#offScreenContext.fillStyle = '#000';
    this.#offScreenContext.beginPath();
    this.#offScreenContext.arc(
      radius+40, // x
      radius+40, // y
      radius+5, // radius
      0, // start angle
      2 * Math.PI // end angle
    );
    this.#offScreenContext.fill();

    // restore to default composite operation (is draw over current image)
    this.#offScreenContext.globalCompositeOperation = 'source-over';
    this.#ctx.drawImage( this.#offScreenCanvas,0,0);
  }

  init= ()=>{
    this.createPlanet(300);
  }

  initializeCanvases = (width, height, radius) => {
    this.#mapCanvas = new OffscreenCanvas(width, height);
    this.#mapContext = this.#mapCanvas.getContext("2d");

    this.#offScreenCanvas = new OffscreenCanvas(width, height);
    this.#offScreenContext = this.#offScreenCanvas.getContext("2d");

    this.#canvas = document.createElement("canvas");
    this.#canvas.width = radius * 3;
    this.#canvas.height = radius * 3;
    this.#canvas.id = "planets";
    document.querySelector("#game").appendChild(this.#canvas);
    this.#ctx = this.#canvas.getContext("2d");
  };

  /**
   *
   * @param width
   * @param height
   */
  generateNoise =(width, height)=> {
    const noise = new Noise(Math.random());
    const octaves = (Math.random()*5);
    const lacunarity = (Math.random()*2)+1;
    const persistence = (Math.random())+0.1;
    const baseFrequency = Math.floor(Math.random()+1)

    for (let y = 0; y < height; y+=4) {
      for (let x = 0; x < width; x+=4) {
        let value = 0;
        let frequency = baseFrequency;
        let amplitude = 1;

        for (let i = 0; i < octaves; i++) {
          value += amplitude * noise.perlin2(x / 100 * frequency, y / 100 * frequency);
          frequency *= lacunarity;
          amplitude *= persistence;
        }
        value = (value + 1) / 2;
        this.#valueVector.push(value);
      }
    }
  }

  /**
   *
   * @param r
   * @param g
   * @param b
   * @param q
   * @param width
   * @param height
   * @param ctx
   */
  drawMap =(r,g,b,q, width, height, ctx)=>{
    let index = 0;
    for (let y = 0; y < height; y+=4) {
      for (let x = 0; x < width; x+=4) {
        let value = 0;
        value = this.#valueVector[index];

        if (value < 0.5) {
          ctx.fillStyle = `rgba(${Math.floor(value * g)}, ${Math.floor(value * b)}, ${Math.floor(value * q)}, 0.3)`; // Ocean
        } else {
          ctx.fillStyle = `rgba(${Math.floor(value * r)}, ${Math.floor(value * g)}, ${Math.floor(value * q)}, 1)`; // Land
        }

        ctx.fillRect(x, y, 4, 4);
        index++;
      }
    }
  }

  /**
   *
   * @param radius
   * @param width
   * @param height
   * @param mapCtx
   * @param offScreenCtx
   */
  wrapSphere = (radius, width, height, mapCtx, offScreenCtx)=>{
    const  fromImage = mapCtx.getImageData(0, 0, width, height);
    const  toImage = offScreenCtx.getImageData(0, 0, radius*2, radius*2);

    const xRotate = Math.PI / 2;
    const yRotate = 35.3;
    const image = SphereImageLib.WrapSphere(fromImage, toImage, xRotate, yRotate, radius);
    offScreenCtx.putImageData(image, 40,40);
  }

  /**
   *
   * @param r
   * @param g
   * @param b
   * @param radius
   * @param offScreenCtx
   */
  addAtmosphere =(r,g,b, radius, offScreenCtx)=>{
    this.#offScreenContext.globalAlpha = 0.75;
    const gradient = this.#ctx.createRadialGradient(
      radius+40, radius+40, 20,
      radius+40, radius+40, radius+20
    );

    gradient.addColorStop(0, "rgba("+r+","+ g+"," +b+", 1)");
    gradient.addColorStop(0.85, "rgba("+r+","+ g+"," +b+", 0.9)");
    gradient.addColorStop(1, "rgba("+r+","+ g+"," +b+", 0.5)");

    offScreenCtx.fillStyle = gradient;
    offScreenCtx.globalCompositeOperation = "source-over";
    offScreenCtx.fillRect(20, 20, radius*2+60, radius*2+60);
  }

  /**
   *
   * @param radius
   * @param offScreenCtx
   */
  addGradient = (radius, offScreenCtx)=>{
    offScreenCtx.beginPath();
    offScreenCtx.strokeStyle = "transparent"
    const gradient = this.#ctx.createLinearGradient(0,0,radius*2+40,0)
    gradient.addColorStop(0, "rgba(1, 1, 1, 0.8)");
    gradient.addColorStop(0.55, "rgba(1, 1, 1, 0.4)");
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
    offScreenCtx.fillStyle = gradient;
    offScreenCtx.fillRect(20,20,  radius*2+40,radius*2+40);
    offScreenCtx.closePath();
  }

}