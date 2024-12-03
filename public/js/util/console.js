'use strict';

class Console {

  static consoleElement = document.querySelector("#console");
  static propertiesElement = document.querySelector("#properties");

  static log(message) {
    Console.consoleElement.innerText += message + "\n";
  }

  static clear() {
    Console.consoleElement.innerText = "";
  }

  static logProperty(message, value) {
    Console.propertiesElement.innerText += message + "\n";
  }

  static clearProperty() {
    Console.propertiesElement.innerText = "";
  }

}