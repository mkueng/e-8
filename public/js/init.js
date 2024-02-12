'use strict'
e8.init = (function(){

  e8.globalEvents = {
    screenResized: "screenResized"
  }
  let subscribers = [];

  return {
    start : ()=>{

      e8.global.tabIsActive = true;
      e8.global.gameIsPaused = false;

      if (window.worker) e8.worker = true;

      window.addEventListener('resize', (evt) => {
        e8.global.screenWidth = window.innerWidth;
        e8.global.screenHeight = window.innerHeight;
        for (const subscriber of subscribers){
          subscriber.updateFromGlobalEvent({message:e8.globalEvents.screenResized, payload: {width:window.innerWidth, height:window.innerHeight}})
        }
        if (window.innerHeight === screen.height) {
          console.log('FULL SCREEN');
        } else {
          console.log('NORMAL SCREEN');
        }
      });

      if (e8.global.screenWidth > 0 && e8.global.screenHeight > 0) {
        new GameInit();
      }
    },

    subscribeForGlobalEvents : (callback)=>{
      subscribers.push(callback);
    }
  }


})();








