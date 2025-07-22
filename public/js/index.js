
document.onreadystatechange = function() {
  if (document.readyState !== "complete") {
    document.querySelector("#game").style.display = "none";
    //document.querySelector("#loader").style.visibility = "visible";
  } else {
    //document.querySelector("#loader").style.display = "none";
    //e8.global.appController = new AppController();
    e8.global.appController = new AppController_ecs();

    const startApp = async () => {
      await e8.global.appController.init();
    };

    startApp().then(() => {
    });
  }
};

