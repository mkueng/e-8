'use strict'
class Handler {

  heartBeat = {
    id: null,
    timeout: null,
    callback: null
  };

  constructor() {
  }

  startHeartBeat = () => {
    this.heartBeat.id = setInterval(this.heartBeat.callback, this.heartBeat.timeout);
  }

  stopHeartBeat = () => {
    clearInterval(this.heartBeat.id);
  }

}