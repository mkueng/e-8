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
        e8.global.currentWidth = window.innerWidth;
        e8.global.currentHeight = window.innerHeight;

        e8.global.screenWidth = Math.max(e8.global.minWidth, Math.min(e8.global.currentWidth, e8.global.maxWidth));
        e8.global.screenHeight = Math.max(e8.global.minHeight, Math.min(e8.global.currentHeight, e8.global.maxHeight));


        for (const subscriber of subscribers){
          subscriber.updateFromGlobalEvent({
            message:e8.globalEvents.screenResized,
            payload: {
              width:e8.global.screenWidth,
              height: e8.global.screenHeight
            }
          })
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








