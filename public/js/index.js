
document.onreadystatechange = function() {
  if (document.readyState !== "complete") {
    document.querySelector("#game").style.display = "none";
    //document.querySelector("#loader").style.visibility = "visible";
  } else {
    //document.querySelector("#loader").style.display = "none";
    e8.global.appController = new AppController();

    const startApp = async () => {
      await e8.global.appController.init();
      //await e8.global.app.startGame();
    };

    startApp().then(() => {
    });
  }
};

