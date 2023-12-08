class InputHandler {

  static instance = new this();
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

  static publishMouseClick = function(event){
    for (let i=0; i< InputHandler.subscribers.length; i++){
      InputHandler.subscribers[i].mouseEvent(event);
    }
  }

  static subscribe = function(subscriber){
    InputHandler.subscribers.push(subscriber);
    console.log( InputHandler.subscribers);
  }


  static unsubscribe = function(subscriber){
    const index = InputHandler.subscribers.indexOf(subscriber);
    InputHandler.subscribers.splice(index, 1);
  }

  invoke = ()=>{

    this.keyEvents= {}


    document.addEventListener('contextmenu', ()=>{
      event.preventDefault();
      InputHandler.publishMouseClick('rightClick');
    });

    document.addEventListener('mousedown', ()=>{
      InputHandler.publishMouseClick('leftClick');
    })


    document.addEventListener("keydown", (event) =>{
      //console.log("event:", event);
      if (typeof this.keyEvents[event.code] === "undefined") {
        this.keyEvents[event.code] = true;
        InputHandler.publishKeyDown(event.code)
      }
    })

    document.addEventListener("keyup", (event) =>{
      if (this.keyEvents[event.code] === true){
        delete this.keyEvents[event.code]
        InputHandler.publishKeyUp(event.code)
      }
    })
  }
}