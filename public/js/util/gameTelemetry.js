'use strict';

class GameTelemetry {
  #fpsDOMElement = null;
  #gameObjectsDOMElement = null;
  #fps = 0;
  #gameObjectsAmount = 0;
  #interval = null;


  constructor() {
    this.#fpsDOMElement = document.querySelector("#fps");
    this.#gameObjectsDOMElement = document.querySelector("#gameObjects");
    this.#interval = 1000;


  }

  startTracking() {
    setInterval(() => {
      this.#fps = GameLoop.frameCount // Frames counted in the last second
      this.#gameObjectsAmount = GameObjectsHandler.gameObjects.length;
      GameLoop.frameCount = 0; // Reset the frame count

      this.#fpsDOMElement .innerText = `FPS: ${this.#fps}`;
      this.#gameObjectsDOMElement.innerText = `Game Objects: ${this.#gameObjectsAmount}`;


    }, this.#interval); // Update FPS every second
  }
}