'use strict'

/**
 * @Name GalaxyMap
 */
class GalaxyMap {
  #planetMap;
  #planetMapKeys;
  #playerShipCoordinates;
  #canvas;
  #ctx;
  #range = 8000000;

  /**
   * @Name constructor
   * @param planetMap
   */
  constructor({ planetMap }) {
    this.#planetMap = planetMap;
    this.#planetMapKeys = Object.keys(planetMap);

    this.#initializeGalaxyMap();
    this.filterPlanetMap();
    e8.global.inputHandler.subscribe(this);
  }

  /**
   * @Name initializeGalaxyMap
   */
  #initializeGalaxyMap() {
    this.#addGalaxyMapCSS();
    const galaxyMapDiv = document.createElement("div");
    galaxyMapDiv.id = "galaxyMap";
    galaxyMapDiv.classList.add("galaxyMap");
    document.getElementById("game").append(galaxyMapDiv);

    this.#addCanvasToGalaxyMap(galaxyMapDiv);
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
        background-color: black;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
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
   * @Name showGalaxyMap
   */
  showGalaxyMap = () => {
    document.getElementById("galaxyMap").style.visibility = "visible";
    this.#playerShipCoordinates = PlayerShip.coordinates;
  };

  // Handle Mouse Events
  mouseEvent = (event) => {
    if (event.type === "wheel") {
      this.#range = Math.max(
        8000000,
        this.#range + (event.deltaY < 0 ? 10000000 : -10000000)
      );
      this.filterPlanetMap();
    }
  };

  /**
   * @name keyEvent
   * @param event
   * @param keyDown
   */
  keyEvent = (event, keyDown) => {
    const galaxyMap = document.getElementById("galaxyMap");

    if (keyDown) {
      switch (event) {
        case "KeyM":
          galaxyMap.style.visibility =
            galaxyMap.style.visibility === "hidden" ? "visible" : "hidden";
          break;
        case "KeyP":
          this.#range += 10000000;
          this.filterPlanetMap();
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
  drawPlanetMap = (planetMapKeys, scaleFactor, xOffset) => {
    const { width, height } = this.#canvas;
    this.#ctx.clearRect(0, 0, width, height);
    this.#ctx.font = "18px courier, sans-serif";
    this.#ctx.lineWidth = 1;

    let [previousX, previousY] = [100, e8.global.screenHeight / 2];

    planetMapKeys.forEach((key) => {
      const planet = this.#planetMap[key];
      const x = scaleFactor * key + xOffset;
      const y = (planet.coordinates % e8.global.screenHeight) - planet.radius / 15;
      const radius = planet.radius / 15;
      const color = `rgba(${planet.r * 2}, ${planet.g * 2}, ${planet.b * 2},`;

      // Planet
      this.#ctx.beginPath();
      this.#ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.#ctx.fillStyle = `${color} 1)`;
      this.#ctx.fill();

      // Text
      this.#ctx.fillText(planet.coordinates, x + 10, y - radius);

      // Connection Line
      this.#ctx.strokeStyle = `${color} 0.7)`;
      this.#ctx.moveTo(previousX, previousY);
      this.#ctx.lineTo(x, y);
      this.#ctx.stroke();

      [previousX, previousY] = [x, y];
    });
  };

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
    const xOffset = 300 - scaleFactor * firstKey;

    this.drawPlanetMap(filteredKeys, scaleFactor, xOffset);
  };
}