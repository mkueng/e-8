class InputHandler {
  static subscribers = [];

  static publishKeyUp = function(event){
    for (let i=0; i< InputHandler.subscribers.length; i++){
      InputHandler.subscribers[i].keyEvent(event, false);
    }
  }

  static publishKeyDown = function(event){
    for (let i=0; i< InputHandler.subscribers.length; i++){
      InputHandler.subscribers[i].keyEvent(event,true);
    }
  }

  static subscribe = function(subscriber){
    InputHandler.subscribers.push(subscriber);
  }
  constructor(){

    this.keyEvents= {}

    document.addEventListener("keydown", (event) =>{
      if (typeof this.keyEvents[event.key] === "undefined") {
        this.keyEvents[event.key] = true;
        InputHandler.publishKeyDown(event.key)
      }
    })

    document.addEventListener("keyup", (event) =>{
      if (this.keyEvents[event.key] === true){
        delete this.keyEvents[event.key]
        InputHandler.publishKeyUp(event.key)
      }
    })
  }
}