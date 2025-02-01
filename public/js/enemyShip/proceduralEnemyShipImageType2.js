'use strict'
class ProceduralEnemyShipImageType2 extends ProceduralShipImage {

  #tiles = new Map([
    ["back", 2],
    ["front", 2],
    ["gadget" ,3],
    ["middle", 3]
  ])

  #resourcePath =  "/procedural/enemyShips/shipType2/";
  #filePrefix = "";
  #tileSize = 100 ;
  #orientation = false;
  #tilesResourceObjects;

  constructor(){
    super({
    });
  }

  /**
   *
   * @returns {Promise<void>}
   */
  invoke = async () => {
    console.log("invoke ProceduralEnemyShipImageType2");
    this.#tilesResourceObjects = await this.fetchResources({
      tiles : this.#tiles,
      filePrefix : this.#filePrefix,
      resourcePath : this.#resourcePath
    })

    console.log("this.#tilesResourceObjects:", this.#tilesResourceObjects);
  }

  /**
   *
   * @param shipSize
   * @param scale
   * @returns {Promise<ImageData>}
   */
  create = async ({ shipSize, scale })=>{
    console.log("shipSize:", shipSize, "scale:", scale);
    if (typeof shipSize !== 'number' || typeof scale !== 'number' || shipSize <= 0 || scale <= 0) {
      throw new Error('Invalid parameters: shipSize and scale must be positive numbers.');
    }
    const offset = this.#tileSize*scale;
    this.setupCanvas({
      shipSize : shipSize,
      offset : offset
    })

    console.log("this.#tilesResourceObjects:", this.#tilesResourceObjects);

    this.createShape({
      resourceObjects : this.#tilesResourceObjects,
      offset : offset,
      filePrefix : this.#filePrefix,
      shipSize : shipSize,
      orientation : this.#orientation
    })


    this.addDecoration({
      resourceObjects : this.#tilesResourceObjects["gadget"],
      category : "gadget",
      startTile : 1,
      endTile : shipSize-1,
      offset : offset,
      filePrefix : this.#filePrefix,
      alpha : 1,
      globalCompositionType : "source-atop"
    })



    this.addColor({
      shipSize : shipSize,
      offset : offset,
      alpha : 0.5
    })

    this.addDecoration({
      resourceObjects : this.#tilesResourceObjects["gadget"],
      category : "gadget",
      startTile : 1,
      endTile : shipSize-1,
      offset : offset,
      filePrefix : this.#filePrefix,
      alpha : 0.9,
      globalCompositionType : "source-over"
    })


    this.addColor({
      shipSize : shipSize,
      offset : offset,
      alpha : 0.7
    })

    this.addGradient({
      shipSize : shipSize,
      offset : offset,
      alpha : 0.8
    })





    return this.getImageData()
  }
}