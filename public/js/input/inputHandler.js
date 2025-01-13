class InputHandler {
  #keyEvents = {};

  static eventTypes = {
    keyEvent: 'keyEvent',
    mouseClick: 'mouseClickEvent',
    mouseMove: 'mouseMoveEvent',
    mouseWheel: 'mouseWheelEvent'
  }

  #keyEventSubscribers = [];
  #mouseClickSubscribers = [];
  #mouseMoveSubscribers = [];
  #mouseWheelSubscribers = [];

  constructor() {

    //prevent contextmenu
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    //mousedown
    document.addEventListener('mousedown', (event) => {
      this.#publishMouseClick(event)
    });

    //mouseup
    document.addEventListener('mouseup', (event) => {
      //event.preventDefault();
      this.#publishMouseClick(event)
    });

    //mousemove
    document.addEventListener('mousemove', (event) => {
      //event.preventDefault();
      this.#publishMouseMove(event)
    });

    //wheel
    document.addEventListener('wheel', (event) => {
      this.#publishMouseWheel(event);
    });

    //check for key down
    document.addEventListener('keydown', (event) => {
      if (!event.repeat && typeof this.#keyEvents[event.code] === 'undefined') {
        this.#keyEvents[event.code] = true;
        this.#publishKeyDown(event.code);
      }
    });

    //check fo key up
    document.addEventListener('keyup', (event) => {
      if (this.#keyEvents[event.code] === true) {
        delete this.#keyEvents[event.code];
        this.#publishKeyUp(event.code);
      }
    });
  }

  get #subscriberMap() {
    return {
      [InputHandler.eventTypes.keyEvent]: this.#keyEventSubscribers,
      [InputHandler.eventTypes.mouseClick]: this.#mouseClickSubscribers,
      [InputHandler.eventTypes.mouseMove]: this.#mouseMoveSubscribers,
    };
  }

  /**
   * @name subscribe
   * @param subscriber
   * @param events
   */
  subscribe(subscriber, events = []) {
    events.forEach(event => {
      const subscribers = this.#subscriberMap[event];
      if (subscribers) {
        subscribers.push(subscriber);
      }
    });
  }

  /**
   * @name unsubscribe
   * @param subscriber
   * @param events
   */
  unsubscribe(subscriber, events = []) {
    events.forEach(event => {
      const subscribers = this.#subscriberMap[event];
      if (subscribers) {
        const index = subscribers.indexOf(subscriber);
        if (index !== -1) {
          subscribers.splice(index, 1);
        }
      }
    });
  }

  /**
   * @name #publishKeyUpEvent
   * @param event
   */
  #publishKeyUp(event) {
    try {
      for (const subscriber of this.#keyEventSubscribers) {
        subscriber.keyEvent(event, false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @name #publishKeyDownEvent
   * @param event
   */
  #publishKeyDown(event) {
    try {
      for (const subscriber of this.#keyEventSubscribers) {
        subscriber.keyEvent(event, true);
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @name publishMouseeClickEvent
   * @param event
   */
  #publishMouseClick(event) {
    try {
      for (const subscriber of this.#mouseClickSubscribers) {
        subscriber.mouseClickEvent(event);
      }
    } catch(e) {
      console.error(e);
    }
  }

  /**
   * @name publishMouseMoveEvent
   * @param event
   */
  #publishMouseMove(event) {
    try {
      for (const subscriber of this.#mouseMoveSubscribers) {
        subscriber.mouseMoveEvent(event);
      }
    } catch(e) {
      console.error(e);
    }
  }

  /**
   * @name publishMouseWheelEvent
   * @param event
   */
  #publishMouseWheel(event) {
    try {
      for (const subscriber of this.#mouseMoveSubscribers) {
        subscriber.mouseWheelEvent(event);
      }
    } catch(e) {
      console.error(e);
    }
  }


}
