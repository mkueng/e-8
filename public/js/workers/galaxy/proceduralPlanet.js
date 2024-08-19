'use strict'
class ProceduralPlanet {

  #offScreenContext;
  #offScreenCanvas;
  #scaledCanvas;
  #scaledContext;
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
                  stripeFactor,
                  octavesRange,
                  lacunarityRange,
                  persistenceOffset,
                  baseFrequencyOffset,
                  inFrontOfStar,
                  r,g,b,q
  })=>{

    const width = 7 * radius;
    const height = 7 * radius;

    this.#initializeCanvases(width, height, radius);
    this.#valueVector = [];

    this.#generateNoise({
      width: width,
      height: height,
      noiseRange: noiseRange,
      stripeFactor: stripeFactor,
      octavesRange: octavesRange,
      lacunarityRange: 0.25,
      persistenceOffset: persistenceOffset,
      baseFrequencyOffset: baseFrequencyOffset
    });

    //2d map of the planet surface
    this.#drawMap(r,g,b,q, width, height,this.#mapContext);
    //return this.#mapCanvas.convertToBlob();
    this.#wrapSphere(radius, width, height, this.#mapContext, this.#offScreenContext);
    this.#addAtmosphere(r,g,b,radius, this.#offScreenContext);
    //shadow
    this.#addGradient(radius, this.#offScreenContext, "source-over", inFrontOfStar);
    this.#addGradient(radius, this.#offScreenContext, "overlay", inFrontOfStar);

    // only draw image where mask is
    this.#offScreenContext.globalCompositeOperation = 'destination-in';

    // draw our circle mask
    this.#offScreenContext.fillStyle = '#000';
    this.#offScreenContext.beginPath();
    this.#offScreenContext.arc(
      radius + 40, // x
      radius + 40, // y
      radius + (radius / 30), // radius
      0.5, // start angle
      2.5* Math.PI // end angle
    );
    this.#offScreenContext.fill();

    // restore to default composite operation (is draw over current image)
    this.#offScreenContext.globalCompositeOperation = 'source-over';
    return this.#offScreenCanvas.convertToBlob();
  }

  #initializeCanvases = (width, height, radius) => {

    this.#mapCanvas = null;
    this.#mapCanvas = new OffscreenCanvas(width, height);
    this.#mapContext = this.#mapCanvas.getContext("2d");
    this.#mapContext.clearRect(0,0,  width, height)

    this.#offScreenCanvas = new OffscreenCanvas(radius*2+80, radius*2+80);
    this.#offScreenContext = this.#offScreenCanvas.getContext("2d");
    this.#scaledCanvas = new OffscreenCanvas(2*radius*2+80, 2*radius*2+80);
    this.#scaledContext = this.#scaledCanvas.getContext("2d");
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
                     stripeFactor,
                     octavesRange,
                     lacunarityRange,
                     persistenceOffset,
                     baseFrequencyOffset
  })=> {

    const noise = new Noise(noiseRange);

    const octaves = (8);
    const lacunarity = (lacunarityRange);
    const persistence = persistenceOffset = 2.1;
    const baseFrequency = baseFrequencyOffset*3;


    for (let y = 0; y < height; y+=2) {
      for (let x = 0; x < width; x+=2) {
        let value = 0;
        let frequency = baseFrequency;
        let amplitude = 1;

        for (let i = 0; i < octaves; i++) {
          value += amplitude * noise.perlin3(x / (stripeFactor*100) * frequency, y / 100 * frequency, frequency);
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

        if (value < 1) {
          ctx.fillStyle = `rgba(${Math.floor(q*3)}, ${Math.floor(value*g)}, ${Math.floor(value*b)}, 0.9)`; // Ocean
        } else {
          //ctx.fillStyle = "#fac";
          ctx.fillStyle = `rgba(${Math.floor(value * r)}, ${Math.floor(value * g)}, ${Math.floor(value * b)}, 1)`; // Land
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
    offScreenCtx.globalAlpha = 1;
    const gradient = this.#offScreenContext.createRadialGradient(
      radius+40, radius+40, 20,
      radius+40, radius+40, radius+20
    );

    gradient.addColorStop(0.2, "rgba("+r+","+ g+"," +b+", 0.6)");
    gradient.addColorStop(0.96, "rgba("+r+","+ g+"," +b+", 0.9)");
    gradient.addColorStop(1, "rgba("+r+15+","+ g+15+"," +b+15+", 1)");

    offScreenCtx.fillStyle = gradient;
    offScreenCtx.globalCompositeOperation = "source-over";
    offScreenCtx.fillRect(20, 20, radius*2+30, radius*2+30);
    offScreenCtx.globalAlpha = 1;
  }

  /**
   *
   * @param radius
   * @param offScreenCtx
   * @param compositionOperation
   */
  #addGradient = (radius, offScreenCtx, compositionOperation, inFrontOfStar)=>{
    offScreenCtx.beginPath();
    offScreenCtx.strokeStyle = "transparent";
    offScreenCtx.globalCompositeOperation = compositionOperation;
    let gradient = null;

    if (inFrontOfStar) {
      gradient = this.#offScreenContext.createRadialGradient( radius+40,radius+40, 10, radius+40, radius+40, radius+5);
      gradient.addColorStop(0, "rgba(1, 1, 1, 0.5)");
      gradient.addColorStop(0.97, "rgba(1, 1, 1, 0.5)");
      gradient.addColorStop(1, 'rgba(155, 155, 155, 0.1)');
    } else {
      gradient = this.#offScreenContext.createLinearGradient(0,0,radius*2+40,0);
      gradient.addColorStop(0, "rgba(1, 1, 1, 0.6)");
      gradient.addColorStop(0.55, "rgba(1, 1, 1, 0.6)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)");
    }

    offScreenCtx.globalAlpha = 1;
    offScreenCtx.fillStyle = gradient;
    offScreenCtx.fillRect(20,20,  radius*2+40,radius*2+40);
    offScreenCtx.closePath();
  }
}