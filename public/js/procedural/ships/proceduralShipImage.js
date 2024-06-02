'use strict'
class ProceduralShipImage {

  constructor(){
    this.maxShipSize = 6;
  }

  /**
   *
   * @param shipSize
   * @param offset
   */
  setupCanvas = ({
                   shipSize,
                   offset
  })=>{
    this.canvas = e8.global.canvasHandler.createOffscreenCanvas({
      id: "spaceShip",
      width : (shipSize+2)*offset,
      height : offset+2,
      container : "game"
    })
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
  }

  /**
   *
   * @param tiles
   * @param tilesResourcePath
   * @returns {Promise<*>}
   */
  fetchResources = async ({
                            tiles,
                            filePrefix,
                            resourcePath
  }) => {

    let allPromisesResolved;
    let resourceObjects = {};

    tiles.forEach((value,key)=>{
      resourceObjects[key]= {};
    })

    tiles.forEach((amount, type)=>{
      this.promises = [];

      this.promises.push(e8.global.resourceHandler.fetchResourceBatch({
        category : type,
        fileName : filePrefix +"_"+type,
        fileType : "png",
        filePath : resourcePath,
        lowerLimit: 0,
        upperLimit : amount
      }));

      allPromisesResolved = Promise.all(this.promises).then((fetchedResourceObjects)=>{
        fetchedResourceObjects.map((resourceObject)=>{
          for (const object in resourceObject){
            resourceObjects[type][resourceObject[object].filename]=resourceObject[object];
          }
        })
      })
    })

    await allPromisesResolved;
    return resourceObjects;
  }

  /**
   *
   * @returns {Promise<*>}
   */
  getImageData = async ()=>{
    const blob = await this.canvas.convertToBlob();
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    return ({blob, imageData});
  }


  /**
   *
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
  };


  /**
   *
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
   *
   * @param shipSize
   * @param offset
   * @param alpha
   */
  addColor = ({
                shipSize,
                offset,
                alpha
  })=>{
    const rgb = Util.createRandomRGB();
    const gradient = this.ctx.createLinearGradient(0,0,((shipSize+2)*offset),offset)
    this.ctx.globalAlpha = alpha;
    this.ctx.strokeStyle = "transparent";
    this.ctx.globalCompositeOperation = 'source-atop';
    this.ctx.fillStyle = gradient;

    this.ctx.beginPath();
    gradient.addColorStop(0.3, `rgba(1, 1, 1, 1)`);
    gradient.addColorStop(0.6, `rgba(${rgb.join()}, 0.3)`);
    gradient.addColorStop(1, 'rgba(100, 100, 100, 0.9)');
    this.ctx.fillRect(0,0,((shipSize+2)*offset),offset);
    this.ctx.closePath();
    this.ctx.globalAlpha = 1;
  }
}