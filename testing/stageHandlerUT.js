
UT.setup("CanvasHandler", []);
UT.setup("SpriteHandler", [UT.tc("CanvasHandler")]);
UT.setup("StageHandler", [UT.tc("SpriteHandler")]);


testStageHandler().then(r => "");

async function testStageHandler(){
  await testStageInstantiation();
  testStageActivation();

}

//UT.setup("AsyncXHRRequest",[]);
//UT.setup("ArtefactsAdmin", []);

//testArtefactsAdminPagination();
async function testStageInstantiation() {
  await UT.itAsync("instantiateStages should return stages",
    UT.tc("StageHandler").instantiateStages,
    null,
    function (value) {
    console.log("value:", value);
      UT.assertNotEqual(Object.keys(value).length, 0);
    }
  )
}

function testStageActivation(){
  UT.it("activate Stage should return stage 02",
    UT.tc("StageHandler").activateStage,
    1,
    function(returnValue){
      console.log("returnValue:", returnValue);
      UT.assertTrue(returnValue instanceof Stage_01);
    }

  )
}
