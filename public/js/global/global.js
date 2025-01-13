e8.global = {};
e8.global.events = {};
e8.global.subscribers = [];


// events
e8.global.events = {
  "resize": "resize",
  "visibilityChange": "visibilityChange"
}

e8.global.publishEvent = ({message, payload}) => {
  //console.log("publishing event", message, payload);
  e8.global.subscribers.forEach(subscriber => {
    subscriber.updateFromGlobalEvent(message, payload);
  })
}

e8.global.subscribeForGlobalEvents = (callback) => {
  e8.global.subscribers.push(callback);
}

// galaxy
e8.global.scaleOfGalaxy = 300000000000;

e8.global.sunDistribution = {
  seed: 333,
  amountOfClusters: 1000,
  range: e8.global.scaleOfGalaxy,
  rangeWithinCluster: 1000,
  minAmountWithinCluster: 1,
  maxAmountWithinCluster: 1
}

e8.global.planetDistribution = {
  seed: 333,
  amountOfClusters: 1000,
  range: e8.global.scaleOfGalaxy,
  rangeWithinCluster: 10000000,
  minAmountWithinCluster: 3,
  maxAmountWithinCluster: 5
}

// screenSize
e8.global.maxWidth = 3700;
e8.global.maxHeight = 1800;
e8.global.minWidth = 1100;
e8.global.minHeight = 420;
e8.global.currentWidth = window.innerWidth;
e8.global.currentHeight = window.innerHeight;
e8.global.tabIsActive = true;

e8.global.screenWidth = Math.max(e8.global.minWidth, Math.min(e8.global.currentWidth, e8.global.maxWidth));
e8.global.screenHeight = Math.max(e8.global.minHeight, Math.min(e8.global.currentHeight, e8.global.maxHeight));



// color palette
e8.global.colors = {
  richBlack: "#461D2D",
  midnightGreen: "#005F73",
  darkCyan: "#0A9396",
  tiffanyBlue: "#52BBB7",
  vanilla: "#dbb867",
  gamboge: "#F16764",
  alloyOrange: "#ca8548",
  rust: "#461D2D",
  rufous: "#AE2012",
  auburn: "#9B2226",
  info : "#aaaaff",
  neutral: "#aaaaaa",
  lightVanilla: "#e3d8bf"
}

e8.global.sunColors = {
  yellow: "#fff3c1",
  orange: "#ffeece",
  red: "#ffc8b6",
  white: "#ffffff",
  blue: "#ceeffb"
}