
UnitTest.setup("CanvasHandler", []);
UnitTest.setup("SpriteHandler", [UnitTest.testClass("CanvasHandler")]);
UnitTest.setup("StageHandler", [UnitTest.testClass("SpriteHandler")]);


testStageHandler().then(r => "");

async function testStageHandler(){
  await testStageInstantiation();
  testStageActivation();

}

//UT.setup("AsyncXHRRequest",[]);
//UT.setup("ArtefactsAdmin", []);

//testArtefactsAdminPagination();
async function testStageInstantiation() {
  await UnitTest.invokeTestAsync("instantiateStages should return stages",
    UnitTest.testClass("StageHandler").instantiateStages,
    null,
    function (value) {
    console.log("value:", value);
      UnitTest.assertNotEqual(Object.keys(value).length, 0);
    }
  )
}

function testStageActivation(){
  UnitTest.invokeTest("activate Stage should return stage 02",
    UnitTest.testClass("StageHandler").activateStage,
    1,
    function(returnValue){
      console.log("returnValue:", returnValue);
      UnitTest.assertTrue(returnValue instanceof Stage_01);
    }

  )
}
