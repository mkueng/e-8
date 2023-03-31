window.addEventListener("load", function() {

  window.global = window.global || {};
  window.global.gameHeight = window.innerHeight;
  window.global.gameWidth = window.innerWidth;

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
/*
  const resourceUrls = ['/js/backgrounds.json', '/js/sprites.json'];
  const requests = resourceUrls.map(url => fetch(url));
  const imageData = {};

  Promise.all(requests)
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(resourceImageData => {
      for (const index in resourceImageData) {
        console.log(resourceImageData[index]);
        imageData[index] = resourceImageData[index];
      }
      new GameController(imageData);
    });
})

*/

