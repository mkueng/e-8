UT = (function(){
  'use strict';
    
  let testClasses = {};
  let testsRunning = 0;
  let hasTestFailed = false;

  return {  
 
    checkTestsRunning : function(){
      if (testsRunning === 0) {
        var element = document.getElementById("spinner")
        element.style.display ="none";

        element = document.getElementById("testResultsBar")
        if (hasTestFailed) {
          
          element.style.backgroundColor = "red"} 
          else{
            element.style.backgroundColor = "green"
          }
      }
    },

    success: function(description){
      console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + description);
      document.getElementById("testResults").innerHTML+="<p class='results green'>"+description+"</p>"
      testsRunning --
      this.checkTestsRunning();

    },

    error: function(description, error){
      console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + description);
      console.error(error);
      document.getElementById("testResults").innerHTML+="<p class='results red'>"+description+"</p>"
      document.getElementById("testResults").innerHTML+="<p class='results error'>"+error.stack+"</p>"
      hasTestFailed = true;
      testsRunning --;
      this.checkTestsRunning();
 
    },

    it: function(description, fn, params, assertFn) {
      testsRunning ++;
      try {
        this.checkTestsRunning();
        assertFn(fn(params));
        this.success(description)
      } catch (error) {
        this.error(description, error)
      }
    },

    itAsync : async function(description, fn, params, assertFn){
      testsRunning ++;
      try {
        await fn(params).then((value) => {
          try {
            assertFn(value);
            this.success(description);
          } catch(error){
            this.error(description, error);
          }
        })
      } catch (error) {
        this.error(description, error);
      }
    },

    assertTrue: function(isTrue) {
      if (!isTrue) {
        throw new Error();
      }
    },

    assertFalse: function(isTrue) {
      if (isTrue) {
        throw new Error();
      }
    },

    assertEqual: function(evaluated, expected){
      if(evaluated !== expected) {
        throw new Error();
      }
    },

    assertNotEqual: function(evaluated, expected){
      if(evaluated == expected) {
        throw new Error();
      }
    },

    setup: function(className, args) {
      try {
        testClasses[className] = eval (`new ${className}(...args)`);
      } catch (error) {
        document.getElementById("testResults").innerHTML+="<p class='results error'>"+error.stack+"</p>"
      }
    }, 

    tc: function(className) {
      return testClasses[className]
    }
  }

})();