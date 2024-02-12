const UnitTest = (function () {
  'use strict';

  let testsRunning = 0;
  let hasTestFailed = false;
  let testClasses = {};

  function checkTestsRunning() {
    if (testsRunning === 0) {
      const spinner = document.getElementById("spinner");
      spinner.style.display = "none";

      const testResultsBar = document.getElementById("testResultsBar");
      testResultsBar.style.backgroundColor = hasTestFailed ? "red" : "green";
    }
  }

  function logResult(description, isSuccess) {
    const colorCode = isSuccess ? '\x1b[32m' : '\x1b[31m';
    const symbol = isSuccess ? '\u2714' : '\u2718';

    console.log(`${colorCode}${symbol} ${description}`);
    const resultClass = isSuccess ? 'green' : 'red';
    document.getElementById("testResults").innerHTML += `<p class='results ${resultClass}'>${description}</p>`;
  }

  function handleError(description, error) {
    document.getElementById("testResults").innerHTML += `<p class='results error'>${description}</p>`;
    document.getElementById("testResults").innerHTML += `<p class='results error'>${error}</p>`;
    hasTestFailed = true;
  }

  return {
    invokeTest: function (description, fn, params, assertFn) {
      testsRunning++;
      try {
        checkTestsRunning();
        assertFn(fn(params));
        logResult(description, true);
      } catch (error) {
        handleError(description, error);
      } finally {
        testsRunning--;
        checkTestsRunning();
      }
    },

    invokeTestAsync: async function (description, fn, params, assertFn) {
      testsRunning++;
      try {
        const value = await fn(params);
        assertFn(value);
        logResult(description, true);
      } catch (error) {
        handleError(description, error);
      } finally {
        testsRunning--;
        checkTestsRunning();
      }
    },

    assertTrue: function (isTrue) {
      if (!isTrue) {
        throw new Error();
      }
    },

    assertFalse: function (isTrue) {
      if (isTrue) {
        throw new Error();
      }
    },

    assertEqual: function (evaluated, expected) {
      if (evaluated !== expected) {
       // document.getElementById("testResults").innerHTML += `<p class='results error'>expected: ${expected}</p>`;
        // document.getElementById("testResults").innerHTML += `<p class='results error'>evaluated: ${evaluated}</p>`;
        throw new Error(`expected: ${expected} | `+ `evaluated: ${evaluated}`);

      }
    },

    assertNotEqual: function (evaluated, expected) {
      if (evaluated === expected) {
        throw new Error();
      }
    },

    setup: function (className, args) {
      try {
        testClasses[className] = new (eval(`${className}`))(...args);
      } catch (error) {
        document.getElementById("testResults").innerHTML += `<p class='results error'>${error.stack}</p>`;
      }
    },

    testClass: function (className) {
      return testClasses[className];
    }
  };
})();
