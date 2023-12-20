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
    this.publishEvent('mouseEvent', event);
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
    console.log(this.subscribers);
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
        subscriber.keyEvent(event, isKeyDown);
      } else if (type === 'mouseEvent') {
        subscriber.mouseEvent(event);
      }
    }
  }

  constructor() {
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      this.publishMouseClick('rightClick');
    });

    document.addEventListener('mousedown', (event) => {
      event.preventDefault();
      this.publishMouseClick('leftClick');
    });

    document.addEventListener('keydown', (event) => {
      if (!event.repeat && typeof this.keyEvents[event.code] === 'undefined') {
        this.keyEvents[event.code] = true;
        this.publishKeyDown(event.code);
      }
    });

    document.addEventListener('keyup', (event) => {
      if (this.keyEvents[event.code] === true) {
        delete this.keyEvents[event.code];
        this.publishKeyUp(event.code);
      }
    });
  }
}
