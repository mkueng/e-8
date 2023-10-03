'use strict';

UnitTest.setup("ResourceLoader",[]);
UnitTest.setup("ProceduralShip", []);

let features = new Map([
  ["feature", 1],["pattern", 1]
])


UnitTest.invokeTestAsync("load resources",
  UnitTest.testClass("ProceduralShip").loadResources,
  {features:features,resourcePath:"resources/procedural/enemyShips/"},function(response){
    UnitTest.assertTrue(typeof response["feature"][0].image !== undefined)
})
