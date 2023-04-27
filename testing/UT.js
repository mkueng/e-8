const tests = [

  "stageHandlerUT"

]


for (let test of tests) {

  let myScript = document.createElement("script");
  myScript.setAttribute("src", ""+test+".js");
  document.body.appendChild(myScript);    

}