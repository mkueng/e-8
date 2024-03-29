class ProceduralPlanet {

  #offScreenContext;
  #offScreenCanvas;
  #mapCanvas;
  #mapContext;
  #valueVector;

  constructor(){
  }


  /**
   *
   * @param canvas
   * @param radius
   * @param noiseRange
   * @param octavesRange
   * @param lacunarityRange
   * @param persistenceOffset
   * @param baseFrequencyOffset
   * @param r
   * @param g
   * @param b
   * @param q
   */
  createPlanet=({

                  radius,
                  noiseRange,
                  octavesRange,
                  lacunarityRange,
                  persistenceOffset,
                  baseFrequencyOffset,
                  r,g,b,q

                })=>{

    const width = 6.5 * radius;
    const height = 6.5 * radius;

    this.#initializeCanvases(width, height, radius);
    this.#valueVector = [];

    this.#generateNoise({
      width : width,
      height : height,
      noiseRange : noiseRange,
      octavesRange : octavesRange,
      lacunarityRange : lacunarityRange,
      persistenceOffset : persistenceOffset,
      baseFrequencyOffset : baseFrequencyOffset
    });

    this.#drawMap(r,g,b,q, width, height,this.#mapContext);
    this.#wrapSphere(radius, width, height, this.#mapContext, this.#offScreenContext);
    this.#addAtmosphere(r,g,b,radius, this.#offScreenContext);
    this.#addGradient(radius, this.#offScreenContext);

    // only draw image where mask is
    this.#offScreenContext.globalCompositeOperation = 'destination-in';

    // draw our circle mask
    this.#offScreenContext.fillStyle = '#000';
    this.#offScreenContext.beginPath();
    this.#offScreenContext.arc(
      radius+40, // x
      radius+40, // y
      radius+7, // radius
      0, // start angle
      2 * Math.PI // end angle
    );
    this.#offScreenContext.fill();

    // restore to default composite operation (is draw over current image)
    this.#offScreenContext.globalCompositeOperation = 'source-over';
    //return this.#offScreenContext.getImageData(0, 0, this.#offScreenContext.canvas.width, this.#offScreenContext.canvas.height);
    return this.#offScreenCanvas.convertToBlob();
  }

  #initializeCanvases = (width, height, radius) => {
    this.#mapCanvas = null;
    this.#mapCanvas = new OffscreenCanvas(width, height);
    this.#mapContext = this.#mapCanvas.getContext("2d");
    this.#mapContext.clearRect(0,0,  width, height)

    this.#offScreenCanvas= null;
    this.#offScreenCanvas = new OffscreenCanvas(radius*2+80, radius*2+80);
    this.#offScreenContext = this.#offScreenCanvas.getContext("2d");
    this.#offScreenContext.clearRect(0,0, radius*2+80, radius*2+80);

  };

  /**
   *
   * @param width
   * @param height
   * @param noiseRange
   * @param octavesRange
   * @param lacunarityRange
   * @param persistenceOffsetas
   * @param baseFrequencyOffset
   */
  #generateNoise =({
                    width,
                    height,
                    noiseRange,
                    octavesRange,
                    lacunarityRange,
                    persistenceOffset,
                    baseFrequencyOffset
                  })=> {

    const noise = new Noise(noiseRange);
    const octaves = (octavesRange);
    const lacunarity = (lacunarityRange)+1; //2
    const persistence = (Math.random())+persistenceOffset;
    const baseFrequency = Math.floor(Math.random()+baseFrequencyOffset);

    for (let y = 0; y < height; y+=2) {
      for (let x = 0; x < width; x+=2) {
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
  #drawMap =(r, g, b, q, width, height, ctx)=>{
    let index = 0;
    for (let y = 0; y < height; y+=2) {
      for (let x = 0; x < width; x+=2) {
        let value = 0;
        value = this.#valueVector[index];

        if (value < 0.5) {
          ctx.fillStyle = `rgba(${Math.floor(value * g)}, ${Math.floor(value * b)}, ${Math.floor(value * q)}, 0.3)`; // Ocean
        } else {
          ctx.fillStyle = `rgba(${Math.floor(value * r)}, ${Math.floor(value * g)}, ${Math.floor(value * q)}, 1)`; // Land
        }

        ctx.fillRect(x, y, 2, 2);
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
  #wrapSphere = (radius, width, height, mapCtx, offScreenCtx)=>{
    const fromImage = mapCtx.getImageData(0, 0, width, height);
    const toImage = offScreenCtx.getImageData(0, 0, radius*2, radius*2);
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
  #addAtmosphere =(r, g, b, radius, offScreenCtx)=>{

    offScreenCtx.globalAlpha =0.8;
    const gradient = this.#offScreenContext.createRadialGradient(
      radius+40, radius+40, 20,
      radius+40, radius+40, radius+20
    );

    gradient.addColorStop(0.2, "rgba("+r+","+ g+"," +b+", 0.6)");
    gradient.addColorStop(0.87, "rgba("+r+","+ g+"," +b+", 0.8)");
    gradient.addColorStop(1, "rgba("+r+","+ g+"," +b+", 1)");

    offScreenCtx.fillStyle = gradient;
    offScreenCtx.globalCompositeOperation = "source-over";
    offScreenCtx.fillRect(20, 20, radius*2+30, radius*2+30);
    offScreenCtx.globalAlpha =1;
  }

  /**
   *
   * @param radius
   * @param offScreenCtx
   */
  #addGradient = (radius, offScreenCtx)=>{
    offScreenCtx.beginPath();
    offScreenCtx.strokeStyle = "transparent"
    const gradient = this.#offScreenContext.createLinearGradient(0,0,radius*2+40,0)
    gradient.addColorStop(0, "rgba(1, 1, 1, 0.9)");
    gradient.addColorStop(0.55, "rgba(1, 1, 1, 0.8)");
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
    offScreenCtx.fillStyle = gradient;
    offScreenCtx.fillRect(20,20,  radius*2+40,radius*2+40);
    offScreenCtx.closePath();
  }
}