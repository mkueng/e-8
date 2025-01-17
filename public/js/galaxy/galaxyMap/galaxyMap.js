'use strict'

/**
 * @Name GalaxyMap
 */
class GalaxyMap {
  #planetMap;
  #sunMap;
  #galaxyMap;
  #planetMapKeys;
  #canvas;
  #isDragging = false;
  #currentOffsetX  = -0;
  #startX; // Start position of mouse
  #ctx;
  #range = 3000000000;
  #interval = null;
  #galaxyToScreenScaleFactor = 0;

  /**
   * @Name constructor
   * @param planetMap
   * @param sunMap
   */
  constructor({ planetMap, sunMap }) {
    this.#galaxyToScreenScaleFactor = e8.global.scaleOfGalaxy / e8.global.screenWidth;

    this.#planetMap = planetMap;
    this.#sunMap = sunMap;
    this.#planetMapKeys = Object.keys(planetMap);

    const filteredPlanetMap = this.filterPlanetMap({coordinatesOffset: (this.#currentOffsetX *-1)});
    const filteredSunMap = this.filterSunMap({coordinatesOffset: (this.#currentOffsetX *-1)});

    this.#addGalaxyMapCSS();
    this.#initializeGalaxyMap();
    this.drawPlanetMap(filteredPlanetMap, filteredSunMap);

    e8.global.inputHandler.subscribe(this,
      [InputHandler.eventTypes.keyEvent
      ]
    );
  }

  /**
   * @Name addGalaxyMapCSS
   */
  #addGalaxyMapCSS() {
    const style = document.createElement("style");
    style.innerHTML = `
      .galaxyMap {
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, rgba(0, 25  , 50, 0.9) 20%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 1) 100%);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * @Name initializeGalaxyMap
   */
  #initializeGalaxyMap() {
    const galaxyMapDiv = document.createElement("div");
    galaxyMapDiv.id = "galaxyMap";
    galaxyMapDiv.style.visibility = "hidden";
    galaxyMapDiv.classList.add("galaxyMap");
    document.getElementById("game").append(galaxyMapDiv);
    this.#addCanvasToGalaxyMap(galaxyMapDiv);
    this.#galaxyMap = galaxyMapDiv
  }

  /**
   * @Name addCanvasToGalaxyMap
   * @param galaxyMapDiv
   */
  #addCanvasToGalaxyMap(galaxyMapDiv) {
    this.#canvas = document.createElement("canvas");
    this.#canvas.id = "galaxyMapCanvas";
    this.#canvas.width = e8.global.screenWidth;
    this.#canvas.height = e8.global.screenHeight;
    galaxyMapDiv.appendChild(this.#canvas);
    this.#ctx = this.#canvas.getContext("2d");
    this.#ctx.globalAlpha = 1;
  }

  /**
   * @name moueEvent
   * @param event
   */
  mouseClickEvent = (event) => {
    if (this.#galaxyMap.style.visibility === "hidden") return;

    if (event.type === "mousedown") {
      this.#isDragging = true;
      this.#startX = event.clientX;
    }

    if (event.type === "mouseup") {
      this.#isDragging = false;
    }
  }

  mouseMoveEvent = (event) => {
    //if (event.type === "mousemove") {
    if (this.#isDragging) {
      const deltaX = event.clientX - this.#startX;

      if (this.#currentOffsetX < -99) {
        this.#currentOffsetX += deltaX;
      } else {
        this.#currentOffsetX = -100;
      }
      this.#startX = event.clientX;
      const filteredPlanetMap = this.filterPlanetMap({coordinatesOffset: (this.#currentOffsetX * -1)});
      const filteredSunMap = this.filterSunMap({coordinatesOffset: (this.#currentOffsetX * -1)});
      this.drawPlanetMap(filteredPlanetMap, filteredSunMap);
    }
    //}
  }

  mouseWheelEvent = (event) => {

    console.log("event", event);

    //if (event.type === "wheel") {
      this.#range = Math.max(
        1000000000,
        this.#range + (event.deltaY < 0 ? 100000000 : -100000000)
      );
     const filteredPlanetMap = this.filterPlanetMap({coordinatesOffset: (this.#currentOffsetX *-1)});
      const filteredSunMap = this.filterSunMap({coordinatesOffset: (this.#currentOffsetX *-1)});
      this.drawPlanetMap(filteredPlanetMap, filteredSunMap);

    //}
  };

  /**
   *
   * @param eventDetails
   * @param options
   */
  keyEvent = (eventDetails, options) => {

    if (options.keyDown === true) {

      switch (eventDetails.code) {
        case "KeyM":

          const isHidden = this.#galaxyMap.style.visibility === "hidden";
          this.#galaxyMap.style.visibility = isHidden ? "visible" : "hidden";

          const inputEvents = [
            InputHandler.eventTypes.mouseClick,
            InputHandler.eventTypes.mouseMove,
            InputHandler.eventTypes.mouseWheel,
          ];

          if (isHidden) {

            e8.global.inputHandler.subscribe(this, inputEvents);

            this.#interval = setInterval(() => {
              const offset = this.#currentOffsetX * -1;
              this.drawPlanetMap(
                this.filterPlanetMap({coordinatesOffset: offset}),
                this.filterSunMap({coordinatesOffset: offset})
              );

            }, 1000);
          } else {
            e8.global.inputHandler.unsubscribe(this, inputEvents);
            clearInterval(this.#interval);

          }
          break;
        case "ArrowDown":

          if (this.#galaxyMap.style.visibility === "visible") {
            this.#range += 10000000;
            this.drawPlanetMap(this.filterPlanetMap(),this.filterSunMap(this.#range));
          }
          break;

        case "ArrowUp":
          if (this.#galaxyMap.style.visibility === "visible") {
            this.#range = Math.max(8000000, this.#range - 10000000);
            this.drawPlanetMap(this.filterPlanetMap(), this.filterSunMap(this.#range));
          }

          break;
      }
    }
  };

  /**
   * @name drawPlanetMap
   * @param planetMapKeys
   * @param scaleFactor
   * @param xOffset
   * @param sunMapKeys
   */
  drawPlanetMap = ([planetMapKeys, scaleFactor, xOffset], sunMapKeys) => {
    const { width, height } = this.#canvas;
    this.#ctx.clearRect(0, 0, width, height);
    this.#ctx.font = "14px courier, sans-serif";
    this.#ctx.lineWidth = 1;

    let previousX = scaleFactor + xOffset;
    let previousY = e8.global.screenHeight / 2;

    this.#ctx.beginPath();
    this.#ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    this.#ctx.fillStyle = "rgba(200, 200, 200, 1)";
    this.#ctx.fillRect(previousX - 15, previousY - 15, 30, 30); // Draw filled square
    this.#ctx.strokeRect(previousX - 15, previousY - 15, 30, 30); // Draw square border
    this.#ctx.fillStyle = "rgba(255, 200, 200, 1)";

    const formattedCoordinates = PlayerShip.coordinates.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '-');
    this.#ctx.fillText("" + formattedCoordinates, previousX - 29, previousY + 40);
    this.#ctx.closePath();

    // show suns
    sunMapKeys.forEach((key) => {
      const radius = 40
      const x = scaleFactor * key + xOffset;
      const y = (key % (e8.global.screenHeight*0.8)+e8.global.screenHeight*0.1);
      const color = `rgba(${255}, ${255}, ${220},`;

      // Create Inner Glow using Radial Gradient
      const gradient = this.#ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius);
      gradient.addColorStop(0, `${color} 1)`); // Center color (solid)
      gradient.addColorStop(0.7, `${color} 0.6)`); // Middle (semi-transparent)
      gradient.addColorStop(1, `rgba(0, 0, 0, 0)`); // Edge (transparent)

      // Sun with Inner Glow
      this.#ctx.beginPath();
      this.#ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.#ctx.fillStyle = gradient;
      this.#ctx.fill();
    })

    // show planets
    planetMapKeys.forEach((key) => {
      const planet = this.#planetMap[key];
      const radius = planet.radius / 15;
      const x = scaleFactor * key + xOffset;
      const y = (planet.coordinates % (e8.global.screenHeight * 0.8) + e8.global.screenHeight * 0.1);
      const color = `rgba(${planet.r * 3}, ${planet.g * 3}, ${planet.b * 3},`;

      // Create Inner Glow using Radial Gradient
      const gradient = this.#ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius);
      gradient.addColorStop(0, `${color} 1)`); // Center color (solid)
      gradient.addColorStop(0.7, `${color} 0.6)`); // Middle (semi-transparent)
      gradient.addColorStop(1, `rgba(0, 0, 0, 0)`); // Edge (transparent)

      // Planet with Inner Glow
      this.#ctx.beginPath();
      this.#ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.#ctx.fillStyle = gradient;
      this.#ctx.fill();

      // Planet Border (optional)
      this.#ctx.strokeStyle = `${color} 1)`;
      this.#ctx.stroke();

      // Text
      this.#ctx.fillStyle = `${color} 1)`; // Reset fill style for text
      const formattedCoordinates = planet.coordinates.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '-');
      this.#ctx.fillText(formattedCoordinates, x + 10, y - radius);

      // Connection Line
      this.#ctx.strokeStyle = `${color} 0.7)`;
      this.#ctx.moveTo(previousX, previousY);
      this.#ctx.lineTo(x, y);
      this.#ctx.stroke();

      [previousX, previousY] = [x, y];
    });
  };

  /**
   * @name filterSunMap
   * @param coordinatesOffset
   * @returns {*}
   */
  filterSunMap = ({coordinatesOffset}) =>{
    const width = e8.global.screenWidth;
    const coordinates = PlayerShip.coordinates + coordinatesOffset * this.#range / 5000 || coordinatesOffset * this.#range / 50000;

    const filteredKeys = this.#sunMap.filter(
      (key) => key >= coordinates && key <= coordinates + this.#range
    );

    if (filteredKeys.length === 0) return;

    const [firstKey, lastKey] = [filteredKeys[0], filteredKeys.at(-1)];
    const keyRange = lastKey - firstKey || 1; // Prevent division by zero
    const scaleFactor = width / keyRange;
    const xOffset = 200 - scaleFactor * firstKey;

    return filteredKeys
  }

  /**
   * @name filterPlanetMap
   * @param coordinatesOffset
   * @returns {[*,number,number]}
   */
  filterPlanetMap = ({coordinatesOffset}) => {
    const width = e8.global.screenWidth;
    const coordinates = PlayerShip.coordinates + coordinatesOffset * this.#range / 5000 || coordinatesOffset * this.#range / 50000;

    const filteredKeys = this.#planetMapKeys.filter(
      (key) => key >= coordinates && key <= coordinates + this.#range
    );

    if (filteredKeys.length === 0) return;

    const [firstKey, lastKey] = [filteredKeys[0], filteredKeys.at(-1)];
    const keyRange = lastKey - firstKey || 1; // Prevent division by zero
    const scaleFactor = width / keyRange;
    const xOffset = 200 - scaleFactor * firstKey;

    return [filteredKeys, scaleFactor, xOffset];
  };
}