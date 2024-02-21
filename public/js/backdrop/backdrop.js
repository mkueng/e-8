'use strict'
class Backdrop {

  constructor(){
    let game = document.getElementById("game");
    game.style.width = e8.global.screenWidth + "px";
    game.style.height = e8.global.screenHeight + "px";
    e8.init.subscribeForGlobalEvents(this);
  }

  updateFromGlobalEvent = ({message, payload}) => {
    if (message === e8.globalEvents.screenResized) {
      let game = document.getElementById("game");
      game.style.width = payload.width + "px";
      game.style.height = payload.height + "px";
    }
  }
}