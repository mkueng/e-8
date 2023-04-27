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
  new GameController();
})

