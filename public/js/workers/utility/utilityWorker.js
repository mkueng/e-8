onmessage = (evt)=>{
  switch (evt.data.type) {
    case "cloneArray" : {
      const originalArray = evt.data.payload;
      const cloneArray = originalArray.map(item => {
        return {...item}
      });



      postMessage({
        cloneArray: cloneArray
      });

      break;
    }
  }
}