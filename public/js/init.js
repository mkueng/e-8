'use strict'
ns.init = (function(){

  let subscribers = [];
  let gameWrapper = null;

  return {
    start : ()=>{

      if (window.worker) ns.worker = true;

      window.addEventListener('resize', (evt) => {
        if (window.innerHeight === screen.height) {
          console.log('FULL SCREEN');
        } else {
          console.log('NORMAL SCREEN');
        }
      });

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          console.log("tab inactive");
          subscribers.forEach(
            (subscriber) =>{
              subscriber({
                message: "tab deactivated",
                content: ""
              })
            }
          )
        } else {
          console.log("tab active");
          subscribers.forEach(
            (subscriber) =>{
              subscriber({
                message: "tab active",
                content: ""
              })
            }
          )
        }
      });

      gameWrapper = document.querySelector("#wrapper");
      document.querySelector("#fullscreen").addEventListener("click", function () {
        gameWrapper.requestFullscreen()
          .then(function () {
            // element has entered fullscreen mode successfully
          })
          .catch(function (error) {
            // element could not enter fullscreen mode
            // error message
            console.log(error.message);
          });
      })

      if (window.global.screenWidth > 0 && window.global.screenHeight > 0) {
        new GameController();
      }
    },

    subscribeForGlobalEvents : (callback)=>{
      subscribers.push(callback);
    }
  }


})();








