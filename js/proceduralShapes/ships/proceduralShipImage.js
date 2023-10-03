'use strict'
class ProceduralShipImage {

  constructor(){
    this.resourceLoader = new ResourceLoader();
    this.canvas = CanvasHandler.instance.createOffscreenCanvas({
      id: "spaceShip",
      width : 512,
      height : 512,
      container : "game"
    })

    this.maxShipSize = 6;
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
  loadResources = async({
                          tiles,
                          tilesResourcePath
  }) =>{
    let allPromisesResolved;
    let resourceObjects = {};

    tiles.forEach((value,key)=>{
      resourceObjects[key]= {};
    })

    tiles.forEach((amount, type)=>{
      this.promises = [];

      this.promises.push(this.resourceLoader.loadResourceBatch({
        category : type,
        filename : type,
        fileType : "png",
        filePath : tilesResourcePath,
        lowerLimit: 0,
        upperLimit : amount
      }));
      allPromisesResolved = Promise.all(this.promises).then((r)=>{
        //console.log("r:", r);
        r.map((resourceObject)=>{
          for (const object in resourceObject){
            resourceObjects[type][resourceObject[object].id]=resourceObject[object];
          }
        })
      })
    })
    await allPromisesResolved;
    return resourceObjects;
  }

  /**
   *
   * @param shipSize
   * @param offset
   * @param tileSize
   * @returns {ImageData}
   */
  getImageData =({shipSize, offset, tileSize})=>{
    return this.ctx.getImageData(0,0,(shipSize+2)*offset,tileSize);
  }

  /**
   *
   * @param resourceObjects
   * @param offset
   * @param shipSize
   * @param orientation
   */
  createShape =({
                   resourceObjects,
                   offset,
                   shipSize,
                   orientation
  })=>{
    shipSize > this.maxShipSize ? shipSize = this.maxShipSize : shipSize;
    const [first, second] = orientation ? ["back", "front"] : ["front", "back"];
    const getRandomImage = (category) =>{
      const amountOfTilesInCategory = Object.keys(resourceObjects[category]).length;
      return resourceObjects[category][category+Util.randomIntInRange(amountOfTilesInCategory)].image;
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
   * @param alpha
   * @param globalCompositionType
   */
  addDecoration = ({
                      resourceObjects,
                      category,
                      startTile,
                      endTile,
                      offset,
                      alpha,
                      globalCompositionType
  }) =>{
    this.ctx.globalAlpha = alpha;
    this.ctx.globalCompositeOperation = globalCompositionType;
    const amountOfTilesInCategory = Object.keys(resourceObjects).length;

    for (let i = startTile; i < endTile; i++){
      this.ctx.drawImage(resourceObjects[category+Util.randomIntInRange(amountOfTilesInCategory)].image,(i * offset),0,offset,offset);
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
    gradient.addColorStop(0.2, `rgba(5, 5, 5, 0.9)`);
    gradient.addColorStop(0.6, `rgba(${rgb.join()}, 0.5)`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
    this.ctx.fillRect(0,0,((shipSize+2)*offset),offset);
    this.ctx.closePath();

    this.ctx.globalAlpha = 1;
  }
}