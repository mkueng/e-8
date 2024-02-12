UnitTest.setup("ParticleGenerator", [])
imageData = {
  data : [0,45,123,0,182,256,0,234,182,212,237,0,27,32,100,0,45,123,0,182,256,0,234,182,212,237,0,27,32,100],
  width: 5,
  height: 5
}

testCreateParticles();

function testCreateParticles(){
  UnitTest.invokeTest('createParticles should return array of binary data',
    UnitTest.testClass("ParticleGenerator").createParticles, {
    imageData: imageData,stride:2, particleWidthRange:5, particleHeightRange: 5,
      velocityRangeX: 10, velocityRangeY: 10, colorRange:100, colorOffset:150
    }, function(returnValue) {
    console.log("returnValue: ", returnValue)
    }
    )
}