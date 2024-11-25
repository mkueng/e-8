'use strict';



class GameTelemetry {
  #fpsDOMElement = null;
  #gameObjectsDOMElement = null;
  #fps = 0;
  #gameObjectsAmount = 0;
  #interval = null;
  #fpsFactor = 0;

  constructor() {
    this.#fpsDOMElement = document.getElementById("fps");
    this.#gameObjectsDOMElement = document.getElementById("gameObjects");
    this.#interval = 500;
    this.#fpsFactor = 1000 / this.#interval;

  }

  startTracking() {
    setInterval(() => {
      this.#fps = GameLoop.frameCount*this.#fpsFactor; // Frames counted in the last second
      this.#gameObjectsAmount = GameObjectsHandler.gameObjects.length;
      GameLoop.frameCount = 0; // Reset the frame count

      this.#fpsDOMElement .innerText = `FPS: ${this.#fps}`;
      this.#gameObjectsDOMElement.innerText = `Game Objects: ${this.#gameObjectsAmount}`;


    }, this.#interval); // Update FPS every second
  }
}