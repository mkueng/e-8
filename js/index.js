window.addEventListener("load", function() {
  if (window.worker) window.global.worker = true;
  let element = document.querySelector("#wrapper");
  document.querySelector("#fullscreen").addEventListener("click", function () {
    element.requestFullscreen()
      .then(function () {
        // element has entered fullscreen mode successfully
      })
      .catch(function (error) {
        // element could not enter fullscreen mode
        // error message
        console.log(error.message);
      });
  })

  window.addEventListener('resize', (evt) => {
    if (window.innerHeight === screen.height) {
      console.log('FULL SCREEN');
    } else {
      console.log('NORMAL SCREEN');
    }
  });

  if (window.global.screenWidth > 0 && window.global.screenHeight > 0) {
    new GameController();
  } else {


  }

})

