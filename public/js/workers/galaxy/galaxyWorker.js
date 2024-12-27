
let proceduralPlanetWorker;

onmessage = (evt)=>{
  switch (evt.data.type) {

    case "init" : {
      //console.log(evt.data.payload);
      importScripts('proceduralPlanetWorker.js');
      importScripts('sphereImageLib.js');
      importScripts('noise.js');


      proceduralPlanetWorker = new ProceduralPlanetWorker();
      break;
    }

    case "createPlanet" : {
      const planetData = evt.data.payload;
      proceduralPlanetWorker.createPlanet({
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