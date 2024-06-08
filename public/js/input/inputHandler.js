class InputHandler {
  keyEvents = {};
  subscribers = [];

  publishKeyUp(event) {
    this.publishEvent('keyEvent', event, false);
  }

  publishKeyDown(event) {
    this.publishEvent('keyEvent', event, true);
  }

  publishMouseClick(event) {
    this.publishEvent('mouseEvent', event.button);
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    const index = this.subscribers.indexOf(subscriber);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  publishEvent(type, event, isKeyDown = false) {
    for (const subscriber of this.subscribers) {
      if (type === 'keyEvent') {
        try {
          subscriber.keyEvent(event, isKeyDown);
        } catch(e){}

      } else if (type === 'mouseEvent') {
        try {
          subscriber.mouseEvent(event);
        } catch(e){}
      }
    }
  }

  constructor() {

    const mouseClickTypes = {
      0: "left",
      1: "middle",
      2: "right"
    }


    //prevent contextmenu
    document.addEventListener('contextmenu', (event) => {

      event.preventDefault();
      //this.publishMouseClick(event)
    });

    //check for mouse down
    document.addEventListener('mousedown', (event) => {
      //event.preventDefault();
      this.publishMouseClick(event)
    });

    document.addEventListener('mouseup', (event) => {
      event.preventDefault();
      //this.publishMouseClick(event)
    });


    //check for key down
    document.addEventListener('keydown', (event) => {
      //event.preventDefault();
      //console.log("event code:", event.code);
      if (!event.repeat && typeof this.keyEvents[event.code] === 'undefined') {
        this.keyEvents[event.code] = true;
        this.publishKeyDown(event.code);
      }
    });

    //check fo key up
    document.addEventListener('keyup', (event) => {
      if (this.keyEvents[event.code] === true) {
        delete this.keyEvents[event.code];
        this.publishKeyUp(event.code);
      }
    });
  }
}
