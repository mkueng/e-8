
document.onreadystatechange = function() {
  if (document.readyState !== "complete") {
    console.log("loading");
    document.querySelector("#game").style.display = "none";
    //document.querySelector("#loader").style.visibility = "visible";
  } else {
    console.log("loaded");
    //document.querySelector("#loader").style.display = "none";
    console.log("initializing");
    new Init().initApp().then((r) => {
    })
  }
};



window.addEventListener("load", function() {

})

