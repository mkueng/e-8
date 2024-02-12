UnitTest.setup("StateHandler", [])

testInitializingStateMachine();
setGameStartedState();
setGameRestartedState();
triggerStateChangePaused();
triggerStateChangeStartGame();
triggerStateChangeWithInvalidTrigger();

function testInitializingStateMachine(){
  UnitTest.invokeTest('initializing state machine should return "AppStarted" state',
    UnitTest.testClass('StateHandler').getState,null,function(returnValue){
    UnitTest.assertEqual(returnValue.name, "AppStarted");
    })
}

function setGameStartedState(){
  UnitTest.invokeTest('set "GameStarted" state should return "GameStarted" state ',
    UnitTest.testClass('StateHandler').setState,'GameStarted',function(returnValue){
      UnitTest.assertEqual(returnValue.name, "GameStarted");
    })
}

function setGameRestartedState(){
  UnitTest.invokeTest('set "GameReStarted" state should return "GameStarted" state ',
    UnitTest.testClass('StateHandler').setState,'GameReStarted',function(returnValue){
      UnitTest.assertEqual(returnValue.name, "GameStarted");
    })
}
function triggerStateChangePaused(){
  UnitTest.invokeTest('trigger "pauseGame" state should return "GamePaused" state',
    UnitTest.testClass('StateHandler').trigger,'pauseGame',function(returnValue){
      UnitTest.assertEqual(returnValue.name, "GamePaused");
    })
}

function triggerStateChangeStartGame(){
  UnitTest.invokeTest('trigger "pauseGame" should return "GamePaused" state',
    UnitTest.testClass('StateHandler').trigger,'pauseGame',function(returnValue){
      UnitTest.assertEqual(returnValue.name, "GamePaused");
    })
}

function triggerStateChangeWithInvalidTrigger(){
  UnitTest.invokeTest('trigger "invokeGame" should return "GamePaused" state',
    UnitTest.testClass('StateHandler').trigger,'invokeGame',function(returnValue){
      UnitTest.assertEqual(returnValue.name, "GamePaused");
    })
}