'use strict'
class ProceduralShipImage {

  constructor({
                resourceHandler,
                canvasHandler
              }){
    this.maxShipSize = 6;
    this.resourceHandler = resourceHandler;
    this.canvasHandler = canvasHandler;
  }

  /**
   * @name setuoCanvas
   * @param shipSize
   * @param offset
   */
  setupCanvas = ({
                   shipSize,
                   offset
  })=>{
    this.canvas = this.canvasHandler.createOffscreenCanvas({
      id: "spaceShip",
      width : (shipSize + 2) * offset,
      height : offset + 2,
      container : "game"
    })
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
  }

  /**
   * @name fetchResources
   * @param tiles
   * @param tilesResourcePath
   * @returns {Promise<*>}
   */
  async fetchResources({ tiles, filePrefix, resourcePath }) {
    let resourceObjects = {};

    tiles.forEach((value, key) => {
      resourceObjects[key] = {};
    });

    for (const [type, amount] of tiles) {
      // Ensure fetchResourceBatch returns an array of promises
      const promises = await this.resourceHandler.fetchResourceBatch({
        category: type,
        fileName: `${filePrefix}_${type}`,
        fileType: "png",
        filePath: resourcePath,
        lowerLimit: 0,
        upperLimit: amount
      });

      // Check if promises is an array
      if (!Array.isArray(promises)) {
        throw new TypeError("fetchResourceBatch did not return an array of promises");
      }

      const fetchedResourceObjects = await Promise.all(promises);
      fetchedResourceObjects.forEach(resourceObject => {
          resourceObjects[type][resourceObject.fileName] = resourceObject;
      });
    }

    return resourceObjects;
  }

  /**
   * @name getImageData
   * @returns {Promise<{blob: Blob, imageData: (*|ImageData|Promise<{blob: *, imageData: *}>)}>}
   */
  getImageData = async ()=>{
    const blob = await this.canvas.convertToBlob();
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    return ({blob, imageData});
  }

  /**
   * @name createShape
   * @param resourceObjects
   * @param offset
   * @param filePrefix
   * @param shipSize
   * @param orientation
   */
  createShape = ({
                   resourceObjects,
                   offset,
                   filePrefix,
                   shipSize,
                   orientation
  })=>{
    shipSize > this.maxShipSize ? shipSize = this.maxShipSize : shipSize;
    const [first, second] = orientation ? ["back", "front"] : ["front", "back"];

    const getRandomImage = (category) =>{
      const amountOfTilesInCategory = Object.keys(resourceObjects[category]).length;
      return resourceObjects[category][filePrefix+"_"+category+"_"+Util.randomIntInRange(amountOfTilesInCategory)].image;
    }

    this.ctx.drawImage(getRandomImage(first), 0, 0, offset, offset);
    this.ctx.drawImage(getRandomImage(second),(shipSize+1)*offset,0,offset,offset);

    for (let i = 1; i <= shipSize; i++) {
      this.ctx.drawImage(getRandomImage("middle"),i*offset,0,offset,offset);
    }
  }

  /**
   * @name addDecoration
   * @param resourceObjects
   * @param category
   * @param startTile
   * @param endTile
   * @param offset
   * @param filePrefix
   * @param alpha
   * @param globalCompositionType
   */
  addDecoration = ({
                     resourceObjects,
                     category,
                     startTile,
                     endTile,
                     offset,
                     filePrefix,
                     alpha,
                     globalCompositionType
  }) =>{
    this.ctx.globalAlpha = alpha;
    this.ctx.globalCompositeOperation = globalCompositionType;
    const amountOfTilesInCategory = Object.keys(resourceObjects).length;
    for (let i = startTile; i < endTile; i++){
      this.ctx.drawImage(resourceObjects[filePrefix+"_"+category+"_"+Util.randomIntInRange(amountOfTilesInCategory)].image,(i * offset),0,offset,offset);
    }
    this.ctx.globalAlpha = 1
  }

  /**
   * @name addGradient
   * @param shipSize
   * @param offset
   * @param alpha
   */
  addGradient = ({
    shipSize,
    offset,
    alpha
  }) => {
    const gradient = this.ctx.createLinearGradient(0,0,((shipSize + 2) * offset),offset)
    this.ctx.globalAlpha = alpha;
    this.ctx.strokeStyle = "transparent";
    this.ctx.globalCompositeOperation = 'source-atop';
    this.ctx.fillStyle = gradient;

    this.ctx.beginPath();
    gradient.addColorStop(0.3, `rgba(1, 1, 1, 0.7)`);
    gradient.addColorStop(0.8, `rgba(175, 175, 175, 0.8)`);
    gradient.addColorStop(0.9, 'rgba(255, 255, 255, 1)');
    this.ctx.fillRect(0,0,((shipSize+2)*offset),offset);
    this.ctx.closePath();
    this.ctx.globalAlpha = 1;
  }

  /**
   * @name addColor
   * @param shipSize
   * @param offset
   * @param alpha
   */
  addColor = ({
                shipSize,
                offset,
                alpha
  })=>{
    const rgb = Util.createRandomRGB([], 150);
    const gradient = this.ctx.createLinearGradient(0,0,((shipSize + 2) * offset),offset)
    this.ctx.globalAlpha = alpha;
    this.ctx.strokeStyle = "transparent";
    this.ctx.globalCompositeOperation = 'source-atop';
    this.ctx.fillStyle = gradient;

    this.ctx.beginPath();
    gradient.addColorStop(0.0, `rgba(${rgb.join()}, 0.6)`);
    gradient.addColorStop(0.8, `rgba(${rgb.join()}, 0.6)`);
    gradient.addColorStop(1, `rgba(${rgb.join()}, 0.6)`);
    this.ctx.fillRect(0,0,((shipSize+2)*offset),offset);
    this.ctx.closePath();
    this.ctx.globalAlpha = 1;
  }
}