'use strict'

/**
 * @Name GalaxyMap
 */
class GalaxyMap {
  #planetMap;
  #sunMap;
  #galaxyMap;
  #planetMapKeys;
  #playerShipCoordinates;
  #canvas;
  #ctx;
  #range = 40000000;
  #interval = null;

  /**
   * @Name constructor
   * @param planetMap
   * @param sunMap
   */
  constructor({ planetMap, sunMap }) {
    this.#planetMap = planetMap;
    this.#sunMap = sunMap;
    console.log("sunMap", sunMap);
    this.#planetMapKeys = Object.keys(planetMap);

    this.#initializeGalaxyMap();
    this.filterPlanetMap();
    this.filterSunMap(this.#range);

    e8.global.inputHandler.subscribe(this);
  }

  /**
   * @Name initializeGalaxyMap
   */
  #initializeGalaxyMap() {
    this.#addGalaxyMapCSS();
    const galaxyMapDiv = document.createElement("div");
    galaxyMapDiv.id = "galaxyMap";
    galaxyMapDiv.style.visibility = "hidden";
    galaxyMapDiv.classList.add("galaxyMap");
    document.getElementById("game").append(galaxyMapDiv);
    this.#addCanvasToGalaxyMap(galaxyMapDiv);
    this.#galaxyMap = document.getElementById("galaxyMap");
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
  mouseEvent = (event) => {

    if (event.type === "wheel") {
      this.#range = Math.max(
        8000000,
        this.#range + (event.deltaY < 0 ? 10000000 : -10000000)
      );
      const filteredPlanetMap = this.filterPlanetMap();
      const filteredSunMap = this.filterSunMap(this.#range);
      this.drawPlanetMap(filteredPlanetMap, filteredSunMap);

    }
  };

  /**
   * @name keyEvent
   * @param event
   * @param keyDown
   */
  keyEvent = (event, keyDown) => {

    let filteredSunMap;
    let filteredPlanetMap;

    if (keyDown) {
      switch (event) {
        case "KeyM":
          if (this.#galaxyMap.style.visibility === "hidden") {
            filteredPlanetMap = this.filterPlanetMap();
            filteredSunMap = this.filterSunMap(this.#range);
            this.drawPlanetMap(filteredPlanetMap, filteredSunMap);
            this.#galaxyMap.style.visibility = "visible";
            this.#interval = setInterval(() => {
              filteredPlanetMap = this.filterPlanetMap();
              filteredSunMap = this.filterSunMap(this.#range);
              this.drawPlanetMap(filteredPlanetMap, filteredSunMap);

            }, 500);
          } else {
            this.#galaxyMap.style.visibility = "hidden";
            clearInterval(this.#interval);
            e8.global.canvasHandler.unblurCanvases();
          }
          break;
        case "ArrowDown":
          this.#range += 10000000;
          filteredPlanetMap = this.filterPlanetMap();
          filteredSunMap = this.filterSunMap(this.#range);
          this.drawPlanetMap(filteredPlanetMap,filteredSunMap);

          break;

        case "ArrowUp":
          this.#range = Math.max(8000000, this.#range - 10000000);
          filteredPlanetMap = this.filterPlanetMap();
          filteredSunMap = this.filterSunMap(this.#range);
          this.drawPlanetMap(filteredPlanetMap,filteredSunMap);

          break;
      }
    }
  };

  /**
   * @name drawPlanetMap
   * @param planetMapKeys
   * @param scaleFactor
   * @param xOffset
   */
  drawPlanetMap = ([planetMapKeys, scaleFactor, xOffset], [sunMapKeys]) => {
    const { width, height } = this.#canvas;
    this.#ctx.clearRect(0, 0, width, height);
    this.#ctx.font = "18px courier, sans-serif";
    this.#ctx.lineWidth = 1;

    let previousX = 100;
    let previousY = e8.global.screenHeight / 2;

    this.#ctx.beginPath();
    this.#ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    this.#ctx.fillStyle = "rgba(200, 200, 200, 1)";
    this.#ctx.fillRect(previousX - 15, previousY - 15, 30, 30); // Draw filled square
    this.#ctx.strokeRect(previousX - 15, previousY - 15, 30, 30); // Draw square border
    this.#ctx.fillStyle = "rgba(255, 200, 200, 1)";
    this.#ctx.fillText("" + PlayerShip.coordinates, previousX - 29, previousY + 40);
    this.#ctx.closePath();

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

    planetMapKeys.forEach((key) => {
      const planet = this.#planetMap[key];
      const radius = planet.radius / 15;
      const x = scaleFactor * key + xOffset;
      const y = (planet.coordinates % (e8.global.screenHeight*0.8)+e8.global.screenHeight*0.1);
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
      this.#ctx.fillStyle = "white"; // Reset fill style for text
      this.#ctx.fillText(planet.coordinates, x + 10, y - radius);

      // Connection Line
      this.#ctx.strokeStyle = `${color} 0.7)`;
      this.#ctx.moveTo(previousX, previousY);
      this.#ctx.lineTo(x, y);
      this.#ctx.stroke();

      [previousX, previousY] = [x, y];
    });
  };


  filterSunMap = (range) =>{
    const { width } = this.#canvas;
    const playerShipCoordinates = PlayerShip.coordinates;
    const rangeEnd = playerShipCoordinates + range

    const filteredKeys = this.#sunMap.filter(
      (key) => key >= playerShipCoordinates && key <= rangeEnd
    );

    if (filteredKeys.length === 0) return;

    const [firstKey, lastKey] = [filteredKeys[0], filteredKeys.at(-1)];
    const keyRange = lastKey - firstKey || 1; // Prevent division by zero
    const scaleFactor = width / keyRange;
    const xOffset = 200 - scaleFactor * firstKey;

    return[filteredKeys];
  }

  /**
   * @name filterPlanetMap
   */
  filterPlanetMap = () => {
    const { width } = this.#canvas;
    const playerShipCoordinates = PlayerShip.coordinates;

    const filteredKeys = this.#planetMapKeys.filter(
      (key) => key >= playerShipCoordinates && key <= playerShipCoordinates + this.#range
    );

    if (filteredKeys.length === 0) return;

    const [firstKey, lastKey] = [filteredKeys[0], filteredKeys.at(-1)];
    const keyRange = lastKey - firstKey || 1; // Prevent division by zero
    const scaleFactor = width / keyRange;
    const xOffset = 200 - scaleFactor * firstKey;

    return [filteredKeys, scaleFactor, xOffset];


  };
}