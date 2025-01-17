class InputHandler {
  #keyEvents = new Set();

  static eventTypes = {
    keyEvent: 'keyEvent',
    mouseClick: 'mouseClickEvent',
    mouseMove: 'mouseMoveEvent',
    mouseWheel: 'mouseWheelEvent',
  };

  #subscribers = new Map();

  constructor() {
    // Initialize subscriber lists for each event type
    Object.values(InputHandler.eventTypes).forEach(eventType => {
      this.#subscribers.set(eventType, new Set());
    });

    this.#registerEvents();
  }

  /**
   * Subscribe a listener to one or more events
   * @param {Object} subscriber - Object implementing event handler methods
   * @param {Array<string>} events - Array of event types
   */
  subscribe = (subscriber, events = []) => {
    events.forEach(eventType => {
      const subscribers = this.#subscribers.get(eventType);
      if (subscribers) {
        subscribers.add(subscriber);
      }
    });
  };

  /**
   * Unsubscribe a listener from one or more events
   * @param {Object} subscriber - Object implementing event handler methods
   * @param {Array<string>} events - Array of event types
   */
  unsubscribe = (subscriber, events = []) => {
    events.forEach(eventType => {
      const subscribers = this.#subscribers.get(eventType);
      if (subscribers) {
        subscribers.delete(subscriber);
      }
    });
  };

  /**
   * Registers event listeners and maps them to notification methods
   */
  #registerEvents = () => {
    const eventMappings = [
      { event: 'keydown', handler: this.#handleKeyDown },
      { event: 'keyup', handler: this.#handleKeyUp },
      { event: 'contextmenu', handler: e => e.preventDefault() },
      { event: 'mousedown', handler: this.#createNotifyHandler(InputHandler.eventTypes.mouseClick) },
      { event: 'mouseup', handler: this.#createNotifyHandler(InputHandler.eventTypes.mouseClick) },
      { event: 'mousemove', handler: this.#createNotifyHandler(InputHandler.eventTypes.mouseMove) },
      { event: 'wheel', handler: this.#createNotifyHandler(InputHandler.eventTypes.mouseWheel) },
    ];

    eventMappings.forEach(({ event, handler }) => {
      document.addEventListener(event, handler);
    });
  };

  /**
   * Handles keydown events
   * @param event
   */
  #handleKeyDown = (event) => {
    if (!event.repeat && !this.#keyEvents.has(event.code)) {
      this.#keyEvents.add(event.code);
      this.#notifySubscribers(InputHandler.eventTypes.keyEvent, event, { keyDown: true });
    }
  };

  /**
   * Handles keyup events
   * @param event
   */
  #handleKeyUp = (event) => {
    if (this.#keyEvents.has(event.code)) {
      this.#keyEvents.delete(event.code);
      this.#notifySubscribers(InputHandler.eventTypes.keyEvent, event, { keyDown: false });
    }
  };

  /**
   * Creates a reusable event handler for notifying subscribers
   * @param {string} eventType
   */
  #createNotifyHandler = (eventType) => (event) => {
    this.#notifySubscribers(eventType, event);
  };

  /**
   * Notifies subscribers of an event
   * @param {string} eventType
   * @param {Event} eventDetails
   * @param {Object} options
   */
  #notifySubscribers = (eventType, eventDetails, options = {}) => {
    const subscribers = this.#subscribers.get(eventType);
    subscribers.forEach(subscriber => {
      try {
        subscriber[eventType](eventDetails, options);
      } catch (e) {
        console.error(e);
      }
    });
  };
}