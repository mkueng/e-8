
let proceduralPlanet;

onmessage = (evt)=>{
  switch (evt.data.type) {

    case "init" : {
      //console.log(evt.data.payload);
      importScripts('proceduralPlanet.js');
      importScripts('sphereImageLib.js');
      importScripts('noise.js');


      proceduralPlanet = new ProceduralPlanet();
      break;
    }

    case "create" : {
      const planetData = evt.data.payload;
      proceduralPlanet.createPlanet({
        coordinates: planetData.coordinates,
        radius: planetData.radius,
        noiseRange : planetData.noiseRange,
        octavesRange : planetData.octavesRange,
        lacunarityRange : 0.5,
        persistenceOffset : 0,
        stripeFactor: planetData.stripeFactor,
        baseFrequencyOffset : planetData.baseFrequencyOffset,
        r : planetData.r,
        g: planetData.g,
        b : planetData.b,
        q : planetData.q
      }).then((planetImageBlob)=>{
        postMessage({
          imageBlob: planetImageBlob,
          planetData: planetData
        });
      })
      break;
    }
  }
}