'use strict';

class Console {

  static consoleElement = document.querySelector("#console");


  static log(message) {
    Console.consoleElement.innerText += message + "\n";
  }

  static clear() {
    Console.consoleElement.innerText = "";
  }
}