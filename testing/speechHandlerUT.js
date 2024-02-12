UnitTest.setup("SoundHandler", [])
UnitTest.setup("SpeechHandler", [ "../public/js/speechModule/statements"]);

testFetchingResources().then(r =>"");

async function testFetchingResources(){
  console.log("fetching");
  await UnitTest.invokeTestAsync("invoke speechHandler and fetching resources",
    UnitTest.testClass("SpeechHandler").invoke,null,function(returnValue){

    })
}