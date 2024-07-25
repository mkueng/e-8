
document.onreadystatechange = function() {
  if (document.readyState !== "complete") {
    console.log("app loading");
    document.querySelector("#game").style.display = "none";
    //document.querySelector("#loader").style.visibility = "visible";
  } else {
    console.log("app loaded");
    //document.querySelector("#loader").style.display = "none";
    console.log("app initializing");
    e8.global.app = new App();


    const startApp = async () => {
      await e8.global.app.init();
      console.log("app initialized");
      await e8.global.app.startGame();
    };

    startApp().then(() => {
      console.log("game started");
    });
  }
};

window.addEventListener("load", function() {

})

