'use strict'
class ProceduralPlanetWorker {

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
   * @name createPlanet
   * @param radius
   * @param noiseRange
   * @param stripeFactor
   * @param octavesRange
   * @param lacunarityRange
   * @param persistenceOffset
   * @param baseFrequencyOffset
   * @param inFrontOfStar
   * @param r
   * @param g
   * @param b
   * @param q
   * @returns {Promise<Blob>}
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
    this.#valueVector = [];

    this.#initializeCanvases(width, height, radius);
    this.#generateNoise({
      width: width,
      height: height,
      noiseRange: noiseRange,
      stripeFactor: stripeFactor,
      octavesRange: octavesRange,
      lacunarityRange: 0.26,
      persistenceOffset: persistenceOffset,
      baseFrequencyOffset: baseFrequencyOffset
    });

    // 2D map of the planet surface
    this.#drawMap(r,g,b,q, width, height,this.#mapContext);
    this.#wrapSphere(radius, width, height, this.#mapContext, this.#offScreenContext);
    this.#addCloudLayer(width, height, this.#offScreenContext,stripeFactor/7);
    this.#addAtmosphere(r,g,b, radius, this.#offScreenContext);




   this.#addGradient(radius, this.#offScreenContext, "source-over", inFrontOfStar, r,r,b);

    // only draw image where mask is
    this.#offScreenContext.globalCompositeOperation = 'destination-in';

    // draw circle mask
    this.#offScreenContext.fillStyle = '#000';
    this.#offScreenContext.beginPath();
    this.#offScreenContext.arc(
      radius + 40, // x
      radius + 40, // y
      radius + (radius / 50), // radius
      0.5, // start angle
      2.5* Math.PI // end angle
    );
    this.#offScreenContext.fill();

    // restore to default composite operation (is draw over current image)
    this.#offScreenContext.globalCompositeOperation = 'source-over';
    return this.#offScreenCanvas.convertToBlob();
  }

  /**
   * @name initializeCanvases
   * @param width
   * @param height
   * @param radius
   */
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
   * @name generateNoise
   * @param width
   * @param height
   * @param noiseRange
   * @param stripeFactor
   * @param octavesRange
   * @param lacunarityRange
   * @param persistenceOffset
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
    const baseFrequency = baseFrequencyOffset*5;

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
   * @name drawMap
   * @param r
   * @param g
   * @param b
   * @param q
   * @param width
   * @param height
   * @param ctx
   */
  #drawMap = (r, g, b, q, width, height, ctx) => {
    let index = 0;
    const r1 = r * 1, g1 = g * 3, b1 = b * 4;

    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        const value = this.#valueVector[index++];
        let fillStyle;

        if (value < 2) {
          fillStyle = `rgba(${Math.floor(value * r1)}, ${Math.floor(value * g1)}, ${Math.floor(value * b1)}, 1)`;
        } else {
          fillStyle = `rgba(${Math.floor(value * b)}, ${Math.floor(value * r)}, ${Math.floor(value * g)}, 1)`;
        }

        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, 2, 2);
      }
    }
  };


  /**
   * @name wrapSphere
   * @param radius
   * @param width
   * @param height
   * @param mapCtx
   * @param offScreenCtx
   */
  #wrapSphere = (radius, width, height, mapCtx, offScreenCtx) => {
    const fromImage = mapCtx.getImageData(0, 0, width, height);
    const toImage = offScreenCtx.createImageData(radius * 2, radius * 2); // Directly create new ImageData
    const image = SphereImageLib.WrapSphere(fromImage, toImage, Math.PI / 2, 35.3, radius);
    offScreenCtx.putImageData(image, 40, 40);
  };


  /**
   *
   * @param r
   * @param g
   * @param b
   * @param radius
   * @param offScreenCtx
   */
  #addAtmosphere = (r, g, b, radius, offScreenCtx) => {
    // Define gradient parameters
    const centerX = radius + 40;
    const centerY = radius + 40;
    const innerRadius = 20;
    const outerRadius = radius + 20;

    // Create gradient
    const gradient = offScreenCtx.createRadialGradient(
      centerX, centerY, innerRadius,
      centerX, centerY, outerRadius
    );

    gradient.addColorStop(0.0, `rgba(${r - 45}, ${g - 45}, ${b - 45}, 0.5)`);
    gradient.addColorStop(0.45, `rgba(${r + 15}, ${g + 15}, ${b + 15}, 0.6)`);
    gradient.addColorStop(1.0, `rgba(${r + 15}, ${g + 15}, ${b + 15}, 0.7)`);

    // Apply gradient
    offScreenCtx.save(); // Save canvas state
    offScreenCtx.globalAlpha = 1;
    offScreenCtx.globalCompositeOperation = "source-over";
    offScreenCtx.fillStyle = gradient;
    offScreenCtx.fillRect(20, 20, radius * 2 + 40, radius * 2 + 40);
    offScreenCtx.restore(); // Restore canvas state
  };



  #addArcGradient = (radius, offScreenCtx, compositionOperation, inFrontOfStar, r, g, b) => {
    offScreenCtx.save();

    // Parameters
    const centerX = radius + 40;
    const centerY = radius + 40;

    // Set global settings
    offScreenCtx.globalCompositeOperation = compositionOperation;
    offScreenCtx.globalAlpha = 0.9;

    // Create a radial gradient — with *offset inner and outer centers*
    const lightOffset = inFrontOfStar ? 0 : radius * (-0.8); // Offset only if behind star
    const gradient = offScreenCtx.createRadialGradient(
      centerX - lightOffset, centerY, radius * 0.1,   // Inner center (light side)
      centerX, centerY, radius * 1.7                        // Outer center (full sphere)
    );

    // Shadow fade colors
    if (inFrontOfStar) {
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.3)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.8)");
    } else {
      gradient.addColorStop(0, `rgba(${r + 100}, ${g + 100}, ${b + 100}, 0.7)`);
      gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.6)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    }

    // Draw circle with gradient
    offScreenCtx.beginPath();
    offScreenCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    offScreenCtx.closePath();
    offScreenCtx.fillStyle = gradient;
    offScreenCtx.fill();

    offScreenCtx.restore();
  };


  /**
   *
   * @param radius
   * @param offScreenCtx
   * @param compositionOperation
   * @param inFrontOfStar
   * @param r
   * @param g
   * @param b
   */
  #addGradient = (radius, offScreenCtx, compositionOperation, inFrontOfStar, r, g, b) => {
    offScreenCtx.save(); // Save current state

    // Set global properties
    offScreenCtx.beginPath();
    offScreenCtx.globalCompositeOperation = compositionOperation;
    offScreenCtx.globalAlpha = 0.98
    offScreenCtx.strokeStyle = "transparent";

    const centerX = radius + 40;
    const centerY = radius + 40;
    const gradientWidth = radius * 2 + 40;

    let gradient;

    if (!inFrontOfStar) {
      gradient = offScreenCtx.createRadialGradient(centerX-(radius*2.2), centerY,0, centerX, centerY, radius *3.5);
      gradient.addColorStop(0.505, "rgba(1, 1, 1, 0.99)");
      gradient.addColorStop(0.52, "rgba(1, 1, 1, 0.97)");
      gradient.addColorStop(0.8, `rgba(255, 255,255, 0.3)`);
    } else {

      gradient = offScreenCtx.createRadialGradient(centerX-(radius*3), centerY,0, centerX, centerY, radius *3.5);
      gradient.addColorStop(0.505, "rgba(1, 1, 1, 1)");
      gradient.addColorStop(0.53, "rgba(1, 1, 1, 0.9)");
      gradient.addColorStop(0.8, `rgba(255, 255,255, 0.6)`);



      // Linear gradient for behind the star

      /*
      gradient = offScreenCtx.createLinearGradient(0, 0, gradientWidth, 0);
      gradient.addColorStop(0, "rgba(1, 1, 1, 1)");
      gradient.addColorStop(0.57, "rgba(1, 1, 1, 0.96)");
      gradient.addColorStop(1, `rgba(${r + 100}, ${g + 100}, ${b + 100}, 0.7)`);

       */
    }

    // Apply the gradient
    offScreenCtx.fillStyle = gradient;
    offScreenCtx.fillRect(30, 30, gradientWidth, gradientWidth);

    offScreenCtx.closePath();
    offScreenCtx.restore(); // Restore canvas state
  };


  /**
   *
   * @param width
   * @param height
   * @param ctx
   * @param threshold
   */
  #addCloudLayer = (width, height, ctx, threshold) => {
    const cloudNoise = new Noise(0.5); // Initialize cloud noise with a different range
    const cloudFrequency = 0.015; // Frequency for clouds
    const cloudPersistence = 0.7; // Smoothness of clouds
    const cloudThreshold = threshold; // Noise value above which clouds are drawn

    ctx.globalAlpha = 0.8; // Semi-transparent clouds
    ctx.globalCompositeOperation = "lighter"; // Blend clouds softly

    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        let value = 0;
        let frequency = cloudFrequency;
        let amplitude = 1;

        // Multi-octave Perlin noise for clouds
        for (let i = 0; i < 4; i++) {
          value += amplitude * cloudNoise.perlin2(x * frequency, y * frequency);
          frequency *= 1.9; // Increase frequency
          amplitude *= cloudPersistence; // Reduce amplitude
        }

        value = (value + 1) / 2; // Normalize to range [0, 1]

        if (value > cloudThreshold) {
          // Draw cloud pixel
          const alpha = (value - cloudThreshold) * 2; // Opacity increases with noise value
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }

    ctx.globalAlpha = 1; // Reset alpha
    ctx.globalCompositeOperation = "source-over"; // Reset blending mode
  };

}